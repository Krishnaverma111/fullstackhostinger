import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const TopBar = () => {
  const navLinks = [
    { name: "Rewards", path: "/rewards" },
    { name: "Help", path: "/help" },
    { name: "Offers", path: "/offers" }
  ];

  return (
    <div className="w-full bg-[#f0f9f4]/90 border-b border-green-100 fixed top-0 left-0 z-[60] backdrop-blur-md shadow-sm">
      {/* Container: px-4 for mobile, px-6 for desktop */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3 flex justify-between items-center">

        {/* Left Links: Space-x-3 on mobile, space-x-6 on desktop */}
        <nav className="flex items-center space-x-3 md:space-x-6">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] transition-all duration-300 
                ${item.name === "Offers"
                  ? "text-green-600 animate-pulse bg-green-100 px-1.5 py-0.5 md:px-2 md:py-1 rounded-sm border border-green-200"
                  : "text-gray-500 hover:text-green-700"
                }`}
            >
              {item.name === "Offers" ? `🔥 ${item.name}` : item.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4 md:space-x-8">

          {/* Social Icons: Mobile par hide kar sakte hain ya kam dikha sakte hain */}
          {/* hidden sm:flex means mobile par gayab, 640px+ par dikhega */}
          <div className="hidden sm:flex space-x-4 md:space-x-5">
            <SocialIcon Icon={FaFacebookF} url="https://www.facebook.com/share/1Fqd8R9743/" />
            <SocialIcon Icon={FaTwitter} url="https://twitter.com" />
            <SocialIcon Icon={FaInstagram} url="https://www.instagram.com/mamta_nursery_karnal" />
            <SocialIcon Icon={FaYoutube} url="https://youtube.com" />
            <SocialIcon Icon={FaLinkedinIn} url="https://linkedin.com" />
          </div>

          {/* Vertical Divider: Hidden on small mobile */}
          <div className="hidden xs:block h-3 w-[1px] bg-green-200"></div>

          {/* Live Support: Hamesha visible rahega but font scale hoga */}
          <Link to="/help" className="flex items-center space-x-1.5 md:space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-green-600"></span>
            </span>
            <p className="text-[9px] md:text-[10px] text-green-700 font-black uppercase tracking-widest whitespace-nowrap">
              {/* Mobile par sirf 'Live' dikha sakte hain space bachane ke liye */}
              <span className="inline sm:hidden">Live</span>
              <span className="hidden sm:inline">Live Support</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({ Icon, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-green-600 transition-all duration-300 transform hover:-translate-y-1"
  >
    <Icon size={12} className="md:w-[13px] md:h-[13px]" />
  </a>
);

export default TopBar;