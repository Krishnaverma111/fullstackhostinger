import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Location = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-45 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-green-800 tracking-tight"
        >
          Visit Our Nursery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-neutral-600 max-w-2xl mx-auto"
        >
          Come and explore our wide variety of plants, from exotic indoor beauties to robust outdoor greenery. Our experts are always here to help you cultivate your perfect garden.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden shadow-green-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Map Section */}
            <div className="h-96 lg:h-auto min-h-[400px] lg:min-h-[600px] w-full relative">
              <iframe
                src="https://maps.google.com/maps?q=Karnal+Haveli,+Jhanjhari,+Dadupur,+Haryana+132116&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location On Google Maps"
              ></iframe>
            </div>

            {/* Address & Info Section */}
            <div className="p-10 lg:p-14 flex flex-col justify-center space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Location</h2>
                <div className="space-y-6">

                  {/* Address Item */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900">Address</h3>
                      <p className="text-neutral-600 mt-1 leading-relaxed">
                        Karnal Haveli, Jhanjhari,<br />
                        Dadupur, Haryana 132116,<br />
                        India
                      </p>
                    </div>
                  </div>

                  {/* Phone Item */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900">Phone</h3>
                      <p className="text-neutral-600 mt-1">
                        +91 70179 09119 <br />
                        +91 72066 32084
                      </p>
                    </div>
                  </div>

                  {/* Email Item */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900">Email</h3>
                      <p className="text-neutral-600 mt-1">
                        mamtanursery07@gmail.com <br />
                      singhbrijveer92@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Hours Item */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900">Working Hours</h3>
                      <p className="text-neutral-600 mt-1">
                        Open Every Day <br />
                        Closes at 8:00 PM
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href="https://maps.app.goo.gl/cwwd3ZAfGTTJSERr9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-green-700 hover:bg-green-800 rounded-full shadow-lg shadow-green-700/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Directions
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
