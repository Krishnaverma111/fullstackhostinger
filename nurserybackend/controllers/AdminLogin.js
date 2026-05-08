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
        message: "Email and Password are required"
      });
    }

    // ================= CLEAN DATA =================
    const userEmail = email.trim().toLowerCase();
    const userPassword = password.trim();

    // ================= ENV DATA =================
    const adminEmail = process.env.ADMIN_EMAIL.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD.trim();

    // ================= CHECK EMAIL =================
    if (userEmail !== adminEmail) {

      return res.status(401).json({
        success: false,
        message: "Email is incorrect"
      });
    }

    // ================= CHECK PASSWORD =================
    if (userPassword !== adminPassword) {

      return res.status(401).json({
        success: false,
        message: "Password is incorrect"
      });
    }

    // ================= GENERATE TOKEN =================
    const token = jwt.sign(
      {
        role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // ================= SUCCESS RESPONSE =================
    return res.status(200).json({
      success: true,
      token,
      message: "Admin Login Success"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

module.exports = adminLogin;