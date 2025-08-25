import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [vendor, setVendor] = useState(JSON.parse(localStorage.getItem('vendor')||'null'));

  function onLogin(tkn, vend){
    setToken(tkn); setVendor(vend);
    localStorage.setItem('token', tkn); localStorage.setItem('vendor', JSON.stringify(vend));
  }
  function onLogout(){
    setToken(''); setVendor(null); localStorage.removeItem('token'); localStorage.removeItem('vendor');
  }

  if(!token) return <Login onLogin={onLogin} />;
  return <Dashboard token={token} vendor={vendor} onLogout={onLogout} />;
}
