import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  // Page load hote hi top par scroll karne ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 text-slate-700">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-700 to-green-800 p-10 text-white text-center">
          <h1 className="text-4xl font-extrabold uppercase tracking-wider">Mamta Nursery</h1>
          <p className="mt-2 text-green-100 text-lg">Policies, Terms & Conditions</p>
          <div className="mt-4 inline-block bg-white/20 px-4 py-1 rounded-full text-sm backdrop-blur-md border border-white/30">
            Last Updated: April 1, 2026
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          
          {/* 1. Return & Replacement Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 text-green-700 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm italic">1</div>
              <h2 className="text-2xl font-bold text-slate-800">Return & Replacement Policy</h2>
            </div>
            <div className="ml-14 space-y-3">
              <p className="bg-orange-50 border-l-4 border-orange-400 p-3 text-orange-800 font-medium rounded-r-lg">
                Note: Plants are living products and therefore non-returnable once sold.
              </p>
              <ul className="list-disc space-y-2 text-slate-600">
                <li>Issues like damaged plants or incorrect items must be reported within <strong>24 hours</strong>.</li>
                <li>Valid proof (Photo/Video) is required for verification.</li>
                <li>Replacement or partial refund is at the sole discretion of the nursery.</li>
              </ul>
            </div>
          </section>

          {/* 2. Refund Policy Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 text-green-700 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm italic">2</div>
              <h2 className="text-2xl font-bold text-slate-800">Refund Policy</h2>
            </div>
            <div className="ml-14">
              <p className="mb-3">Refunds are generally not applicable, except for:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800 mb-1">Incorrect Product</p>
                  <p className="text-sm italic">If the item delivered doesn't match your order.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800 mb-1">Severe Damage</p>
                  <p className="text-sm italic">If the product is received in unusable condition.</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">* Approved refunds take 3–7 working days to your original payment method.</p>
            </div>
          </section>

          {/* 3. Delivery Section */}
          <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
               Delivery & Shipping
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Local delivery is subject to additional charges.</li>
              <li>Once delivered, plant care becomes the <strong>customer’s responsibility</strong>.</li>
              <li>Timelines may vary due to weather or logistics constraints.</li>
            </ul>
          </section>

          {/* 4. Privacy Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 text-green-700 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm italic">3</div>
              <h2 className="text-2xl font-bold text-slate-800">Privacy Policy</h2>
            </div>
            <div className="ml-14 space-y-4">
              <p>We collect basic info (Name, Phone, Address) only for order processing and delivery.</p>
              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-600 text-green-800 font-medium">
                "We do not sell or misuse customer data."
              </div>
            </div>
          </section>

          {/* 5. Terms & Conditions Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 text-green-700 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm italic">4</div>
              <h2 className="text-2xl font-bold text-slate-800">Terms & Conditions</h2>
            </div>
            <ul className="ml-14 list-disc space-y-2 italic text-slate-600">
              <li>Natural variations in size, shape, and color are normal.</li>
              <li>We do not guarantee plant survival/growth as it depends on your care.</li>
              <li>Policies can be modified any time without prior notice.</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="text-center bg-slate-900 text-white p-10 rounded-3xl space-y-4">
            <h2 className="text-2xl font-bold">Need Help? Contact Us</h2>
            <p className="text-slate-400">Mamta Nursery - Near Karnal Haveli, Dadupur, Haryana</p>
            <div className="pt-4">
              <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-green-900/20">
                Contact Support
              </button>
            </div>
          </section>

        </div>
        
        <div className="bg-slate-50 p-6 text-center text-xs text-slate-400 font-bold uppercase tracking-widest border-t border-slate-100">
          © 2026 Mamta Nursery. Built for a Greener World.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;