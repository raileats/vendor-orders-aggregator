import React, { useEffect, useState } from 'react';
const API = import.meta.env.VITE_API || 'http://localhost:4000';

export default function Dashboard({token, vendor, onLogout}){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load(){
    setLoading(true);
    const res = await fetch(API + '/api/orders', { headers:{ Authorization: 'Bearer ' + token } });
    const d = await res.json();
    setLoading(false);
    if(d.ok) setOrders(d.orders);
    else alert(d.error||'Error loading orders');
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div style={{fontFamily:'ui-sans-serif', padding:20, maxWidth:1000, margin:'0 auto'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>{vendor?.name || 'Vendor'} - Orders</h1>
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      <p>Phone: {vendor?.phone}</p>

      {loading ? <p>Loading...</p> : (
        <table border="1" cellPadding="8" style={{width:'100%', borderCollapse:'collapse'}}>
          <thead><tr><th>Time</th><th>Platform</th><th>Order ID</th><th>Customer</th><th>Phone</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{new Date(o.created_at).toLocaleString()}</td>
                <td>{o.platform}</td>
                <td>{o.orderId}</td>
                <td>{o.customer}</td>
                <td>{o.phone}</td>
                <td>{o.amount}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
