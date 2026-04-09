import { useState } from "react";
import { 
  Bell, AlertCircle, Car, 
  ChevronLeft, ShieldCheck
} from "lucide-react";

export default function NotificationUpgrade() {
  const [prefs, setPrefs] = useState({
    emergency: true,
    parking: true,
    updates: false
  });

  const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`w-12 h-7 rounded-full relative transition-all duration-300 ${
        active ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-slate-200'
      }`}
    >
      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-sm ${
        active ? 'left-6' : 'left-1'
      }`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FBFDFF] p-6 pb-24 max-w-xl mx-auto font-sans">
      
      {/* HEADER */}
      <header className="mt-8 mb-10 flex items-center space-x-4">
        <button className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-slate-600 active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notifications</h1>
      </header>

      {/* SYSTEM STATUS CARD */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 mb-10 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 p-6 opacity-10"><Bell size={80} /></div>
        <div className="relative z-10">
          <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Push Protocol</p>
          <h2 className="text-2xl font-black leading-tight uppercase">Monitoring <br /> Active</h2>
          <div className="mt-5 flex items-center space-x-2 bg-white/5 border border-white/10 w-fit px-3 py-1.5 rounded-xl">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Signals Encrypted</span>
          </div>
        </div>
      </div>

      {/* TOGGLE OPTIONS */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 mb-2">Alert Channels</h3>
        
        {/* Emergency Alert */}
        <div className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-transform">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-all">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="font-black text-sm text-slate-800 uppercase tracking-tight">Emergency Alerts</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Accidents & Critical Events</p>
            </div>
          </div>
          <Toggle active={prefs.emergency} onToggle={() => setPrefs({...prefs, emergency: !prefs.emergency})} />
        </div>

        {/* Parking Alert */}
        <div className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-transform">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Car size={20} />
            </div>
            <div>
              <p className="font-black text-sm text-slate-800 uppercase tracking-tight">Parking Requests</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">QR Scans & Message Alerts</p>
            </div>
          </div>
          <Toggle active={prefs.parking} onToggle={() => setPrefs({...prefs, parking: !prefs.parking})} />
        </div>
      </div>

      <footer className="mt-20 text-center flex flex-col items-center space-y-2 opacity-30">
        <ShieldCheck size={16} />
        <p className="text-[8px] font-black uppercase tracking-[0.4em]">GEHU CSE ALERT CORE</p>
      </footer>
    </div>
  );
}
