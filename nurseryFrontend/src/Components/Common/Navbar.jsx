import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, User, LayoutGrid, ChevronDown, ArrowRight, Star, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Asset Import
import logoImg from '../../assets/logo.png';

const Navbar = ({ cartItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [adminCreds, setAdminCreds] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle Scroll effect for professional feel
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== "") {
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminCreds.email && adminCreds.password) {
      setShowAdminModal(false);
      setAdminCreds({ email: "", password: "" });
      navigate("/admin");
    } else {
      alert("Please fill all fields");
    }
  };

  const navLinks = [
    { name: "Plants", path: "/plants" },
    { name: "Gardening", path: "/gardening" },
    { name: "Seeds", path: "/seeds" },
    { name: "Bulbs", path: "/bulbs" },
    { name: "Planters", path: "/planters" },
    { name: "Pots", path: "/pots" }, 
    { name: "Soil & Fertilizer", path: "/soil-fertilizer" },
    { name: "Pebbles", path: "/pebbles" },
    { name: "Accessories", path: "/accessories" },
    { name: "Gifts", path: "/gifts" },
    { name: "Location", path: "/location" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1, type: "spring", stiffness: 100 }
    },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <header className="fixed w-full z-50 top-0 mt-8 lg:mt-0 ">
        {/* Top Professional Brand Bar */}
        <div className="bg-green-900 text-white py-2 px-4  hidden md:block">
          <div className="max-w-[1920px] mx-auto flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400"/> Rated #1 Nursery in India</span>
            </div>
            <div className="flex items-center gap-6">
              <span>Free Delivery Above ₹999</span>
              <span className="text-green-300">Contact: +91 98XXX XXXXX</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className={`w-full transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl py-2 shadow-lg' : 'bg-white py-4'}`}>
          <div className="max-w-[1920px] mx-auto px-4 lg:px-12 flex justify-between items-center gap-4">
            
            {/* Logo & Brand Highlight */}
            <div className="flex items-center gap-8 shrink-0">
              <div onClick={() => navigate("/")} className="flex items-center group cursor-pointer relative">
                {/* Logo Glow Effect */}
                <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="h-16 md:h-24 transition-all duration-500 relative z-10">
                  <img 
                    src={logoImg} 
                    alt="Mamta Nursery" 
                    className="h-full w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                
                {/* Brand Text for Identity */}
                <div className="hidden xl:flex flex-col ml-4 border-l border-gray-100 pl-4">
                  <span className="text-sm font-black text-gray-800 uppercase tracking-tighter italic">Mamta Nursery</span>
                  <span className="text-[9px] font-bold text-green-600 uppercase tracking-[0.2em]">Premium Greenery</span>
                </div>
              </div>

              {/* Shop Dropdown */}
              <div 
                className="hidden xl:block relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button className="flex items-center space-x-2 py-4 text-[10px] font-black uppercase tracking-widest text-gray-700 hover:text-green-600 transition-colors">
                  <LayoutGrid size={16} />
                  <span>Shop</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden" animate="visible" exit="exit"
                      className="absolute top-full left-0 w-[500px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-[2.5rem] border border-green-50 p-8 mt-1 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 relative z-10">
                        {navLinks.map((link) => (
                          <motion.div key={link.name} variants={itemVariants}>
                            <Link 
                              to={link.path} 
                              className="group flex items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500 hover:bg-green-600 hover:text-white rounded-2xl transition-all"
                            >
                              <span>{link.name}</span>
                              <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-xl relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <input 
                  type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleSearch}
                  placeholder="Search for plants, pots, seeds..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-full py-3.5 pl-12 pr-4 text-sm focus:bg-white focus:ring-4 focus:ring-green-500/5 transition-all outline-none" 
                />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 md:space-x-6">
              <button onClick={() => setShowAdminModal(true)} className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all">
                  <User size={22} />
              </button>

              <Link to="/cart">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 bg-gray-900 hover:bg-green-600 text-white px-5 md:px-7 py-3 md:py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-gray-200"
                >
                  <ShoppingCart size={18} />
                  <span className="bg-green-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-[10px]">
                    {cartItems.length}
                  </span>
                </motion.div>
              </Link>

              <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden p-3 text-gray-900 bg-gray-100 rounded-2xl">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] xl:hidden" />
            <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring', damping:25}} className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl xl:hidden flex flex-col">
              <div className="p-8 border-b flex justify-between items-center">
                 <img src={logoImg} alt="Logo" className="h-10 w-auto" />
                 <button onClick={() => setIsOpen(false)} className="p-3 bg-gray-100 rounded-2xl"><X size={20}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                 {navLinks.map((link) => (
                   <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 hover:bg-green-600 group transition-all">
                      <span className="font-bold text-gray-700 group-hover:text-white uppercase text-xs tracking-widest">{link.name}</span>
                      <ArrowRight size={16} className="text-gray-300 group-hover:text-white" />
                   </Link>
                 ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Admin Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setShowAdminModal(false)}></div>
            <motion.form 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onSubmit={handleLogin} 
              className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="bg-green-600 p-10 text-center text-white relative">
                <button type="button" onClick={() => setShowAdminModal(false)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><X size={20} /></button>
                <div className="inline-block p-4 bg-white/20 rounded-full mb-4"><User size={32}/></div>
                <h2 className="text-2xl font-black uppercase tracking-widest">Admin Portal</h2>
              </div>
              <div className="p-10 space-y-4">
                <input required type="email" value={adminCreds.email} onChange={(e) => setAdminCreds({...adminCreds, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-4 focus:ring-green-500/5 transition-all" placeholder="Admin Email" />
                <input required type="password" value={adminCreds.password} onChange={(e) => setAdminCreds({...adminCreds, password: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-4 focus:ring-green-500/5 transition-all" placeholder="Security Password" />
                <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all shadow-xl shadow-gray-200">Authenticate</button>
              </div>
            </motion.form>
          </div>  
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;