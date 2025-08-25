import React, { useState } from 'react';
const API = import.meta.env.VITE_API || 'http://localhost:4000';

export default function Login({onLogin}){
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function sendOtp(){
    setLoading(true);
    const res = await fetch(API + '/api/auth/send-otp', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({phone})
    });
    const d = await res.json();
    setLoading(false);
    if(d.ok){ alert('OTP sent (demo)'); setStep(2); }
    else alert(d.error||'error');
  }

  async function verify(){
    setLoading(true);
    const res = await fetch(API + '/api/auth/verify-otp', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({phone, otp})
    });
    const d = await res.json();
    setLoading(false);
    if(d.ok){ onLogin(d.token, d.vendor); }
    else alert(d.error||'invalid');
  }

  return (
    <div style={{fontFamily:'ui-sans-serif', maxWidth:420, margin:'40px auto', padding:20, border:'1px solid #eee', borderRadius:8}}>
      <h2>Vendor Login</h2>
      {step===1 && (
        <div style={{display:'grid', gap:8}}>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Mobile number" />
          <button onClick={sendOtp} disabled={loading}>Send OTP</button>
        </div>
      )}
      {step===2 && (
        <div style={{display:'grid', gap:8}}>
          <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter OTP (123456)" />
          <button onClick={verify} disabled={loading}>Verify & Login</button>
        </div>
      )}
    </div>
  );
}
