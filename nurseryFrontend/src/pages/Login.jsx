import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Leaf, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const OrderLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault(); // Page refresh rokne ke liye
    setLoading(true);
    
    console.log("Login process started...");

    setTimeout(() => {
      setLoading(false);
      console.log("Redirecting now...");
      // Sabse important line
      navigate("/admin"); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center py-20 px-4">
      <div className="flex w-full max-w-[1000px] bg-white rounded-[2.5rem] shadow-2xl border border-green-50 overflow-hidden">
        
        <div className="w-full lg:w-1/2 p-10 md:p-14">
          <h1 className="text-3xl font-black text-gray-900 uppercase mb-8">
            Admin <span className="text-green-600">Access</span>
          </h1>

          {/* ON SUBMIT LAGANA ZAROORI HAI */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-400">Email Address</label>
              <input type="email" required className="w-full bg-gray-50 p-4 rounded-xl outline-none focus:ring-2 ring-green-500/20" placeholder="admin@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-400">Password / Order ID</label>
              <input type="password" required className="w-full bg-gray-50 p-4 rounded-xl outline-none focus:ring-2 ring-green-500/20" placeholder="••••••••" />
            </div>

            <button 
              type="submit" // <--- YE SABSE IMPORTANT HAI
              disabled={loading} 
              className="w-full bg-gray-900 hover:bg-green-600 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Login to Dashboard"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>

        <div className="hidden lg:block w-1/2 bg-green-900 relative">
          <img src="https://images.unsplash.com/photo-1470058869958-2a77a67d1211?auto=format&fit=crop&w=1000" className="w-full h-full object-cover opacity-40" alt="bg" />
        </div>
      </div>
    </div>
  );
};

export default OrderLogin;