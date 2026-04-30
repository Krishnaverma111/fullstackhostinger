import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  const sections = {
    gardeningKnowledge: [
      { name: "Plant Talk Blogs", link: "/gardening" }, // Link working karne ke liye existing route use kiya
      { name: "Kitchen Gardening", link: "/gardening" },
      { name: "Top 10 Plants", link: "/plants" },
      { name: "Sustainable Living", link: "/gardening" },
      { name: "Nurserylive Blog", link: "https://blog.nurserylive.com", isExternal: true },
    ],
    usefulLinks: [
      { name: "Track Order", link: "/orders" }, // App.jsx ke matching routes
      { name: "My Orders", link: "/cart" },
      { name: "FAQ's", link: "/help" },
      { name: "Offers", link: "/offers" },
      { name: "Rewards", link: "/rewards" },
    ],
    about: [
      { name: "About Us", link: "/about-us" },
      { name: "Location", link: "/location" },
      { name: "Contact Us", link: "/help" },
      { name: "Privacy Policy", link: "/privacy-policy" },
      { name: "Refund Policy", link: "/privacy-policy" }, // Abhi ke liye same page, baad mein /refund-policy kar sakte hain
      { name: "Terms of Service", link: "/privacy-policy" },
    ]
  };

  const socialLinks = [
    { icon: <Facebook size={18} />, link: "https://www.facebook.com/share/1Fqd8R9743/" },
    { icon: <Twitter size={18} />, link: "#" },
    { icon: <Instagram size={18} />, link: "https://www.instagram.com/mamta_nursery_karnal" },
    { icon: <Youtube size={18} />, link: "#" },
    { icon: <Linkedin size={18} />, link: "#" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 px-6 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <FooterColumn title="Gardening Knowledge" links={sections.gardeningKnowledge} />
          <FooterColumn title="Useful Links" links={sections.usefulLinks} />
          <FooterColumn title="About Company" links={sections.about} />

          <div className="flex flex-col gap-6">
            <h2 className="text-white font-bold text-lg tracking-tight">Stay Green!</h2>
            <p className="text-sm leading-relaxed">Join 6 Lakh+ plant parents for exclusive tips and weekly offers.</p>
            <div className="relative group">
              <input type="email" placeholder="Your email address" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-white" />
              <button className="absolute right-2 top-2 p-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors">
                <Send size={16} />
              </button>
            </div>
            <div className="mt-2">
              <h3 className="text-white font-semibold text-sm mb-4">Connect with us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a key={i} href={social.link} target={social.link !== "#" ? "_blank" : undefined} rel={social.link !== "#" ? "noopener noreferrer" : undefined} className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 border border-slate-800">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-900 text-center md:text-left">
          <p className="text-xs font-medium uppercase tracking-tighter">
            © 2026 Mamta Nursery. All Rights Reserved. <br className="md:hidden" /> <a href="https://dikota-all.vercel.app/">Developed by Dikota</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col gap-5">
    <h2 className="text-white font-bold text-md border-l-2 border-green-600 pl-3 uppercase tracking-wider">{title}</h2>
    <ul className="flex flex-col gap-3">
      {links.map((link, idx) => (
        <li key={idx}>
          {link.isExternal ? (
            <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-green-500 hover:translate-x-1 transition-all duration-200 inline-block">
              {link.name}
            </a>
          ) : (
            <Link to={link.link} className="text-sm hover:text-green-500 hover:translate-x-1 transition-all duration-200 inline-block">
              {link.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;