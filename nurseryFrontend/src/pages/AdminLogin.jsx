// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = ({ setAuth }) => {
//   const [pass, setPass] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Password check logic
//     if (pass === "admin123") { 
//       // 1. LocalStorage update karein (taaki refresh pe logout na ho)
//       localStorage.setItem('isAdminLoggedIn', 'true');

//       // 2. State update karein (App.js ko batane ke liye)
//       if (typeof setAuth === 'function') {
//         setAuth(true);
//       }

//       // 3. Dashboard pe bhejein
//       navigate('/admin');
//     } else {
//       alert("❌ Galat Password! Dubara koshish karein.");
//       setPass(""); // Password field clear karein
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
//       <form 
//         onSubmit={handleSubmit} 
//         className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-sm w-full border border-gray-100"
//       >
//         <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//           </svg>
//         </div>

//         <h2 className="text-3xl font-black mb-2 uppercase italic tracking-tighter text-gray-900">
//           Admin <span className="text-green-600">Vault</span>
//         </h2>
//         <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-10">
//           Authorized Personnel Only
//         </p>

//         <div className="space-y-4">
//           <input 
//             type="password" 
//             value={pass}
//             placeholder="••••••••" 
//             autoFocus
//             className="w-full p-5 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-green-500/20 focus:bg-white transition-all font-bold text-center tracking-widest"
//             onChange={(e) => setPass(e.target.value)}
//           />

//           <button 
//             type="submit"
//             className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-green-600 shadow-xl shadow-gray-200 transition-all active:scale-95"
//           >
//             Open Dashboard
//           </button>
//         </div>

//         <p className="mt-8 text-[9px] font-bold text-gray-300 uppercase">
//           Protected by NurseryHQ Security
//         </p>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;

// src/pages/AdminLogin.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = ({ setAuth }) => {

  // ================= STATES =================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  const API = import.meta.env.VITE_API_URL;
  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // CLEAR ERRORS

    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    // ================= VALIDATION =================

    let isValid = true;

    if (!email.trim()) {

      setEmailError("Email is required");
      isValid = false;
    }

    if (!password.trim()) {

      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    try {

      setLoading(true);

      // ================= API CALL =================

      const response = await axios.post(
        `${API}/api/admin/login`,
        {
          email,
          password
        }
      );

      // ================= SUCCESS =================

      if (response.data.success) {

        // SAVE TOKEN

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "isAdminLoggedIn",
          "true"
        );

        // UPDATE AUTH

        if (typeof setAuth === "function") {

          setAuth(true);
        }

        // SUCCESS MESSAGE

        alert("✅ Admin Login Success");

        // REDIRECT

        navigate("/admin");
      }

    } catch (error) {

      console.log(error);

      const message =
        error.response?.data?.message ||
        "Login Failed";

      // ================= ERROR HANDLING =================

      if (
        message.toLowerCase().includes("email")
      ) {

        setEmailError(message);

      } else if (
        message.toLowerCase().includes("password")
      ) {

        setPasswordError(message);

      } else {

        setGeneralError(message);
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-gray-100 p-5">

      {/* ================= LOGIN CARD ================= */}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-10 rounded-[35px] shadow-2xl border border-gray-100"
      >

        {/* ================= ICON ================= */}

        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 15v2m6-6V7a6 6 0 10-12 0v4m-2 0h16v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8z"
              />

            </svg>

          </div>

        </div>

        {/* ================= TITLE ================= */}

        <h1 className="text-4xl font-black text-center text-gray-900">

          Admin
          <span className="text-green-600">
            {" "}Login
          </span>

        </h1>

        <p className="text-center text-gray-400 text-xs uppercase tracking-[4px] mt-2 mb-8 font-bold">

          Authorized Personnel Only

        </p>

        {/* ================= GENERAL ERROR ================= */}

        {generalError && (

          <div className="mb-5 bg-red-100 border border-red-300 text-red-600 p-4 rounded-2xl text-sm font-semibold">

            {generalError}

          </div>
        )}

        {/* ================= EMAIL ================= */}

        <div className="mb-5">

          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => {

              setEmail(e.target.value);
              setEmailError("");
            }}
            className={`w-full p-5 rounded-2xl bg-gray-50 border-2 outline-none transition-all duration-300 font-semibold

            ${emailError
                ? "border-red-500"
                : "border-transparent focus:border-green-500 focus:bg-white"
              }`}
          />

          {emailError && (

            <p className="text-red-500 text-sm mt-2 font-semibold">

              {emailError}

            </p>
          )}

        </div>

        {/* ================= PASSWORD ================= */}

        <div className="mb-6 relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {

              setPassword(e.target.value);
              setPasswordError("");
            }}
            className={`w-full p-5 rounded-2xl bg-gray-50 border-2 outline-none transition-all duration-300 font-semibold

            ${passwordError
                ? "border-red-500"
                : "border-transparent focus:border-green-500 focus:bg-white"
              }`}
          />

          {/* ================= SHOW HIDE ================= */}

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500 hover:text-green-600"
          >

            {showPassword ? "Hide" : "Show"}

          </button>

          {passwordError && (

            <p className="text-red-500 text-sm mt-2 font-semibold">

              {passwordError}

            </p>
          )}

        </div>

        {/* ================= BUTTON ================= */}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-5 rounded-2xl font-black uppercase tracking-[3px] text-sm text-white transition-all duration-300 shadow-xl

          ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-900 hover:bg-green-600 active:scale-95"
            }`}
        >

          {loading ? (

            <div className="flex items-center justify-center gap-2">

              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

              Loading...

            </div>

          ) : (

            "Open Dashboard"

          )}

        </button>

        {/* ================= FOOTER ================= */}

        <p className="text-center mt-8 text-[10px] uppercase tracking-[3px] text-gray-300 font-bold">

          Protected By Admin Security

        </p>

      </form>

    </div>
  );
};

export default AdminLogin;