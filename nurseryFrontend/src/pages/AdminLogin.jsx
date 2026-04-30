import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setAuth }) => {
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password check logic
    if (pass === "admin123") { 
      // 1. LocalStorage update karein (taaki refresh pe logout na ho)
      localStorage.setItem('isAdminLoggedIn', 'true');
      
      // 2. State update karein (App.js ko batane ke liye)
      if (typeof setAuth === 'function') {
        setAuth(true);
      }
      
      // 3. Dashboard pe bhejein
      navigate('/admin');
    } else {
      alert("❌ Galat Password! Dubara koshish karein.");
      setPass(""); // Password field clear karein
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-sm w-full border border-gray-100"
      >
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-black mb-2 uppercase italic tracking-tighter text-gray-900">
          Admin <span className="text-green-600">Vault</span>
        </h2>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-10">
          Authorized Personnel Only
        </p>

        <div className="space-y-4">
          <input 
            type="password" 
            value={pass}
            placeholder="••••••••" 
            autoFocus
            className="w-full p-5 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-green-500/20 focus:bg-white transition-all font-bold text-center tracking-widest"
            onChange={(e) => setPass(e.target.value)}
          />
          
          <button 
            type="submit"
            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-green-600 shadow-xl shadow-gray-200 transition-all active:scale-95"
          >
            Open Dashboard
          </button>
        </div>

        <p className="mt-8 text-[9px] font-bold text-gray-300 uppercase">
          Protected by NurseryHQ Security
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;