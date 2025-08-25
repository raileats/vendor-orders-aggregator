import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const API = import.meta.env.VITE_API || 'http://localhost:4000';

function App(){
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState('');

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if(q) params.set('q', q);
    if(vendor) params.set('vendor', vendor);
    const res = await fetch(`${API}/api/orders?` + params.toString());
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  };

  const loadVendors = async () => {
    const res = await fetch(`${API}/api/vendors`);
    const data = await res.json();
    setVendors(data.vendors || []);
  };

  useEffect(()=>{ load(); loadVendors(); }, []);

  return (
    <div style={{fontFamily:'ui-sans-serif', padding: 20, maxWidth: 1100, margin: '0 auto'}}>
      <h1>📦 Vendor Orders Dashboard</h1>
      <div style={{display:'flex', gap:8, marginTop:10, marginBottom:14}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search order/customer..." style={{flex:1, padding:8}} />
        <select value={vendor} onChange={e=>setVendor(e.target.value)} style={{padding:8}}>
          <option value="">All Vendors</option>
          {vendors.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <button onClick={load} style={{padding:'8px 14px'}}>Filter</button>
        <button onClick={()=>{ setQ(''); setVendor(''); load(); }} style={{padding:'8px 14px'}}>Clear</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <table border="1" cellPadding="8" style={{borderCollapse:'collapse', width:'100%'}}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Vendor</th>
              <th>Platform</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(orders || []).map((o) => (
              <tr key={o.id}>
                <td>{new Date(o.created_at).toLocaleString()}</td>
                <td>{o.vendor}</td>
                <td>{o.platform}</td>
                <td>{o.order_id}</td>
                <td>{o.customer_name}</td>
                <td>{o.customer_phone}</td>
                <td>{o.total_amount}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{marginTop:14, opacity:.7}}>Set <code>VITE_API</code> env on Vercel to your backend URL.</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
