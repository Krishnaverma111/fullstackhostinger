const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminLogin = async (req, res) => {
  try {

    // ================= GET DATA =================
    const { email, password } = req.body;

    // ================= CHECK EMPTY FIELDS =================
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // ================= CLEAN DATA =================
    const userEmail = email.trim().toLowerCase();
    const userPassword = password.trim();

    // ================= ENV DATA =================
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD?.trim();

    // ================= CHECK ENV =================
    if (!adminEmail || !adminPassword || !process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Environment variables are missing",
      });
    }

    // ================= CHECK EMAIL =================
    if (userEmail !== adminEmail) {
      return res.status(401).json({
        success: false,
        message: "Email is incorrect",
      });
    }

    // ================= CHECK PASSWORD =================
    if (userPassword !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // ================= GENERATE TOKEN =================
    const token = jwt.sign(
      {
        role: "admin",
        email: adminEmail,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // ================= SET COOKIE =================
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true, // localhost testing ke liye false kar sakte ho
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ================= SUCCESS RESPONSE =================
    return res.status(200).json({
      success: true,
      token,
      message: "Admin Login Success",
    });

  } catch (error) {

    console.log("🔥 Admin Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = adminLogin;