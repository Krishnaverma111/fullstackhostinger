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


  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
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