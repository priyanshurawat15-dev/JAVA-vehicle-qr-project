import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
Car, QrCode, Shield, AlertTriangle,
ChevronRight, Bell, Search,
ShieldCheck, Info, MessageSquare, Navigation
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, accentColor }: any) => (

  <div className="flex gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition">
    <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${accentColor} shrink-0 shadow-sm hover:scale-105 transition-all duration-300`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h4 className="font-semibold text-slate-800 text-sm mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function Home() {
const navigate = useNavigate();

return (

<div className="min-h-screen bg-[#F9FAFB] pb-24 font-sans text-slate-900">

{/* HEADER */}

  <nav className="px-6 py-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
        <QrCode className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-slate-900 text-lg">QR Safe</span>
    </div>

<button className="p-2 text-slate-400 hover:text-emerald-600 relative">
  <Bell size={22} />
  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
</button>


  </nav>

  <div className="max-w-xl mx-auto px-5 pt-10">


{/* HERO */}
<header className="mb-10">
  <h1 className="text-4xl font-bold leading-tight">
    Vehicle Safety <br />
    <span className="text-emerald-600">Simplified.</span>
  </h1>

  <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-[320px]">
    Scan QR codes to report issues, contact vehicle owners, or send alerts —
    all without sharing your personal information.
  </p>
</header>

{/* ACTIONS */}
<div className="grid gap-4 mb-10">

  {/* SCAN */}
  <button 
    onClick={() => navigate("/scanner")}
    className="group flex items-center justify-between p-5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white/20 rounded-lg">
        <Search className="w-6 h-6" />
      </div>
      <div className="text-left">
        <p className="text-xs opacity-80">Quick Action</p>
        <h3 className="text-lg font-semibold">Scan Vehicle QR</h3>
        <p className="text-xs opacity-80 mt-1">
          Scan any vehicle QR to report issues, alert the owner, or get help instantly.
        </p>
      </div>
    </div>
    <ChevronRight />
  </button>

  {/* REGISTER */}
  <button 
    onClick={() => navigate("/register")}
    className="group flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-200 transition"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-emerald-50 rounded-lg">
        <Car className="w-6 h-6 text-emerald-600" />
      </div>
      <div className="text-left">
        <p className="text-xs text-slate-400">For Owners</p>
        <h3 className="text-lg font-semibold">Register Vehicle</h3>
        <p className="text-xs text-slate-400 mt-1">
          Generate a QR for your vehicle so others can contact you safely when needed.
        </p>
      </div>
    </div>
    <ChevronRight className="text-slate-400" />
  </button>
</div>

{/* WORKFLOW */}


<section className="mb-10 bg-white border border-slate-200 rounded-2xl p-6">
  
  <h3 className="text-sm font-semibold text-slate-600 mb-8">
    How it works
  </h3>

  <div className="relative flex justify-between items-start text-center">

    {/* CONNECTING LINE */}
    <div className="absolute top-5 left-0 right-0 h-[2px] bg-slate-200 z-0"></div>

    {/* STEP 1 */}
    <div className="relative z-10 flex flex-col items-center w-1/3">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 border-2 border-white shadow">
        <QrCode className="w-5 h-5 text-emerald-600" />
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-800">
        Scan QR
      </p>

      <p className="text-xs text-slate-500 mt-1 px-2">
        Scan vehicle QR code
      </p>
    </div>

    {/* STEP 2 */}
    <div className="relative z-10 flex flex-col items-center w-1/3">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 border-2 border-white shadow">
        <Navigation className="w-5 h-5 text-emerald-600" />
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-800">
        Choose Action
      </p>

      <p className="text-xs text-slate-500 mt-1 px-2">
        Report, contact or get help
      </p>
    </div>

    {/* STEP 3 */}
    <div className="relative z-10 flex flex-col items-center w-1/3">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 border-2 border-white shadow">
        <MessageSquare className="w-5 h-5 text-purple-600" />
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-800">
        Owner Notified
      </p>

      <p className="text-xs text-slate-500 mt-1 px-2">
        Instant alert sent securely
      </p>
    </div>

  </div>

  {/* BOTTOM TEXT */}
  <p className="text-xs text-slate-400 mt-8 text-center">
    Simple • Fast • Private
  </p>

</section>



{/* FEATURES */}
<section className="grid gap-4 mb-10">
  <FeatureCard 
    icon={AlertTriangle} 
    title="Parking Alerts" 
    desc="If your vehicle is blocking someone or parked incorrectly, others can alert you instantly through the QR." 
    accentColor="bg-amber-100 text-amber-600"
  />
  <FeatureCard 
    icon={Shield} 
    title="Emergency Help" 
    desc="In emergencies, people can notify your saved contacts with your location directly through the QR." 
    accentColor="bg-red-100 text-red-600"
  />
</section>

{/* PRIVACY */}
<section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
  <div className="flex gap-4 items-start">
    <div className="bg-emerald-100 p-3 rounded-lg">
      <ShieldCheck className="w-6 h-6 text-emerald-600" />
    </div>

    <div>
      <h4 className="font-semibold text-slate-800 text-lg">
        Your Privacy Matters
      </h4>
      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
        Your phone number stays private. People can contact you only through the app when needed — no direct details are shared.
      </p>
    </div>
  </div>
</section>

{/* FOOTER */}
<footer className="mt-16 text-center pb-10 border-t border-slate-200 pt-6">

  <p className="text-xs text-slate-400 mb-2">
    © 2026 All Rights Reserved
  </p>

  <p className="text-xs text-slate-500">
     <span className="font-medium text-slate-700">Designed by Priyanshu Rawat | March 2026</span> 
  </p>

  <p className="text-[10px] text-slate-400 mt-2">
    GEHU • CSE 2026
  </p>

</footer>

  </div>
</div>
);
}
