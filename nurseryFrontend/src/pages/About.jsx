import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Truck, ShieldCheck, MessageCircle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  // Page load hote hi top par scroll karne ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const howWeWork = [
    {
      title: "Plants, Simplified",
      desc: "Order plants ready to be placed in your home, office or garden. Just Unpack, Relax and Enjoy your green buddies.",
      icon: <Leaf className="text-green-600" size={32} />
    },
    {
      title: "Secure Shipping",
      desc: "Our unique packaging will hold the plants in place and let the plant breathe so that it reaches you fresh without any mess.",
      icon: <ShieldCheck className="text-green-600" size={32} />
    },
    {
      title: "Detailed Guidance",
      desc: "Get care instructions from the website and real-time guidance from our Garden Experts on Whatsapp.",
      icon: <MessageCircle className="text-green-600" size={32} />
    }
  ];

  const cities = [
    "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Ambattur", "Amravati", "Amritsar", "Asansol",
    "Aurangabad", "Bangalore", "Bareilly", "Belgaum", "Bhavnagar", "Bhilai Nagar", "Bhiwandi",
    "Bhopal", "Bhubaneswar", "Bikaner", "Chandigarh", "Chennai", "Coimbatore", "Firozabad",
    "Cuttack", "Dehradun", "Delhi", "Dhanbad", "Durgapur", "Faridabad", "Gaya", "Ghaziabad",
    "Gorakhpur", "Gulbarga", "Guntur", "Gurgaon", "Guwahati", "Gwalior", "Haora", "Hyderabad",
    "Indore", "Jabalpur", "Jaipur", "Jalandhar", "Jalgaon", "Jammu", "Jamnagar", "Jamshedpur",
    "Jhansi", "Jodhpur", "Kanpur", "Karnataka", "Kochi", "Kolkata", "Kota", "Lucknow",
    "Ludhiana", "Madurai", "Mangalore", "Meerut", "Mumbai", "Nagpur", "Nashik", "Navi Mumbai",
    "Noida", "Patna", "Pune", "Raipur", "Rajkot", "Ranchi", "Surat", "Thane", "Udaipur",
    "Varanasi", "Vijayawada", "Visakhapatnam"
  ];

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 font-sans">

      {/* Hero Header */}
      <section className="relative bg-green-900 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 italic tracking-tight"
          >
            About Mamta Nursery
          </motion.h1>
          <p className="text-green-100 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
            Nurserylive germinated in 2014 from a promise to make ‘green and healthy’ a click away for all Indians.
            We are here to shape the future of gardening!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">

        {/* Mission Section */}
        <section className="py-20 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 border-l-8 border-green-600 pl-4">
              Green is Good
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Having plants in our homes or offices doesn’t just look good, it also boosts our mood,
              makes us more productive, and cleans the air around us by absorbing toxins.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed font-semibold">
              Ordering a pizza is easy but ever heard of ordering a plant to your doorstep?
              This is where we come in.
            </p>
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <p className="italic text-green-800">
                "A one-stop-shop for all gardening requirements, with more than 6000 products
                available online saving you numerous messy trips to various nurseries."
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-[400px] bg-slate-100 rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white">
              {/* Updated: Real Image added here */}
              <img
                src="data:image/jpeg;base64,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"
                alt="Beautiful Garden"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* How We Work - Steps */}
        <section className="py-20 bg-slate-50 rounded-[3rem] px-8 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">How We Work</h2>
            <p className="text-slate-500 uppercase tracking-widest font-bold">3 Simple Steps to become a Plant Parent</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {howWeWork.map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Community & Experts */}
        <section className="py-24 grid md:grid-cols-2 gap-12 text-slate-700">
          <div className="space-y-6 bg-white p-8">
            <h3 className="text-2xl font-bold text-slate-900">For Every Plant Parent</h3>
            <p>
              If you’re new to being a plant parent, we’re here to make it easier. Our garden experts can provide
              you with guidance for detailed care every step of the way.
            </p>
            <p className="font-bold text-green-700 text-xl">
              1 Million+ Happy Plant Parents served!
            </p>
          </div>
          <div className="space-y-6 bg-white p-8 border-l border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p>
              We believe that every space can be made more beautiful with plants!
              Come, join us in our vision to make all spaces green and healthy!
            </p>
          </div>
        </section>

        {/* Delivery Network */}
        <section className="py-20 border-t border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-slate-900 rounded-full text-white">
              <Truck size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">PAN India Delivery</h2>
              <p className="text-slate-500">Delivering 6000+ products across the nation</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] md:text-xs font-bold uppercase tracking-tight text-slate-400">
            {cities.map((city, index) => (
              <span key={index} className="px-3 py-1 bg-slate-50 rounded-md border border-slate-100 hover:text-green-600 transition-colors">
                {city}
              </span>
            ))}
            <span className="px-3 py-1 bg-green-600 text-white rounded-md">And All Over India</span>
          </div>
        </section>

        {/* Contact Strip */}
        <section className="mt-10 bg-green-600 p-12 rounded-[2rem] text-center text-white">
          <h2 className="text-3xl font-bold mb-4 italic">Ready to grow your own home-grown veggies?</h2>
          <p className="mb-8 opacity-90">Mamta Nursery: Karnal Haveli, Jhanjhari, Dadupur, Haryana 132116</p>
          <button 
            onClick={() => navigate('/plants')}
            className="bg-white text-green-700 px-10 py-4 rounded-full font-black uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-2xl"
          >
            Start Shopping Now
          </button>
        </section>

      </div>
    </div>
  );
};

export default About;