import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

// Components
import Navbar from "./Components/Common/Navbar";
import TopBar from "./Components/Common/Topbar";
import Footer from "./pages/Footer";

// Pages
import About from "./pages/About";
import Home from "./pages/Home";
import Reward from "./pages/Reward";
import Support from "./pages/Sport";
import Login from "./pages/Login";
import Offers from "./pages/Offers";
import Cart from "./pages/Cart";
import Gardining from "./pages/Gardining";
import Plant from "./pages/Plant";
import Seed from "./pages/Seed";
import Planter from "./pages/Planters";
import Soil from "./pages/Soil";
import Gifting from "./pages/Gift";
import AdminDashboard from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Bulb from "./pages/Bulb";
import Pebbles from "./pages/Pebbles";
import Asso from "./pages/Asso";
import PrivacyPolicy from "./pages/Privacy";
import Location from "./pages/Location";

const Pots = Planter;

// ✅ SAFE ENV (fallback added)
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = ({
  inventory,
  setInventory,
  addToCart,
  cartItems,
  setCartItems,
  isAdminAuthenticated,
  setIsAdminAuthenticated
}) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home inventory={inventory} addToCart={addToCart} /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart} inventory={inventory} /></PageTransition>} />
        <Route path="/offers" element={<PageTransition><Offers inventory={inventory} addToCart={addToCart} /></PageTransition>} />
        <Route path="/plants" element={<PageTransition><Plant inventory={inventory} addToCart={addToCart} /></PageTransition>} />
        <Route path="/gardening" element={<PageTransition><Gardining inventory={inventory} addToCart={addToCart} /></PageTransition>} />
        <Route path="/seeds" element={<PageTransition><Seed inventory={inventory} addToCart={addToCart} /></PageTransition>} />
        <Route path="/planters" element={<PageTransition><Planter inventory={inventory} addToCart={addToCart} /></PageTransition>} />
        <Route path="/soil-fertilizer" element={<PageTransition><Soil inventory={inventory} addToCart={addToCart} /></PageTransition>} />
        <Route path="/pots" element={<PageTransition><Pots inventory={inventory} addToCart={addToCart} /></PageTransition>} />
        <Route path="/bulbs" element={<PageTransition><Bulb inventory={inventory} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} /></PageTransition>} />
        <Route path="/pebbles" element={<PageTransition><Pebbles inventory={inventory} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} /></PageTransition>} />
        <Route path="/accessories" element={<PageTransition><Asso inventory={inventory} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} /></PageTransition>} />
        <Route path="/rewards" element={<PageTransition><Reward addToCart={addToCart} /></PageTransition>} />
        <Route path="/help" element={<PageTransition><Support /></PageTransition>} />
        <Route path="/orders" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/gifts" element={<PageTransition><Gifting addToCart={addToCart} /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/about-us" element={<PageTransition><About /></PageTransition>} />
        <Route path="/location" element={<PageTransition><Location /></PageTransition>} />

        <Route path="/admin-login" element={<AdminLogin setAuth={setIsAdminAuthenticated} />} />

        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? (
              <PageTransition>
                <AdminDashboard inventory={inventory} setInventory={setInventory} setAuth={setIsAdminAuthenticated} />
              </PageTransition>
            ) : (
              <Navigate to="/admin-login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const LayoutWrapper = ({ children, cartItems }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin") || location.pathname === "/admin-login";

  return (
    <>
      {!isAdminPage && <TopBar />}
      {!isAdminPage && <Navbar cartItems={cartItems} />}
      <div className="main-content">{children}</div>
      {!isAdminPage && <Footer />}
    </>
  );
};

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("nurseryCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    () => localStorage.getItem("isAdminLoggedIn") === "true"
  );

  const [inventory, setInventory] = useState([]);

  // ✅ SAFE FETCH
  const fetchProducts = async () => {
    try {
      console.log("API:", API);
      const res = await axios.get(`${API}/api/products`);
      setInventory(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setInventory([]); // prevent crash
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("nurseryCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const prodId = product._id || product.id;
      const existingItem = prev.find(item => (item._id || item.id) === prodId);
      if (existingItem) {
        return prev.map(item =>
          (item._id || item.id) === prodId
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <Router>
      <ScrollToTop />
      <LayoutWrapper cartItems={cartItems}>
        <AnimatedRoutes
          inventory={inventory}
          setInventory={setInventory}
          addToCart={addToCart}
          cartItems={cartItems}
          setCartItems={setCartItems}
          isAdminAuthenticated={isAdminAuthenticated}
          setIsAdminAuthenticated={setIsAdminAuthenticated}
        />
      </LayoutWrapper>
    </Router>
  );
}

export default App;