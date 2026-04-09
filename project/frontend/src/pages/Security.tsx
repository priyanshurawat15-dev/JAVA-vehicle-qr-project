import { useState } from "react";
import {
  Lock, ChevronRight, RefreshCw, History,
  Fingerprint, ShieldAlert, Zap, Globe
} from "lucide-react";

interface SectionHeaderProps {
  title: string;
}

export default function CyberSecurityCenter() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const securityScore = is2FAEnabled ? 98 : 65;

  const SectionHeader = ({ title }: SectionHeaderProps) => (
    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-5 mb-4 flex items-center">
      <div className="w-1 h-3 bg-blue-500 rounded-full mr-2" />
      {title}
    </h2>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 pb-24 max-w-xl mx-auto font-sans selection:bg-blue-100">

      {/* 1. DYNAMIC SECURITY HEALTH GAUGE */}
      <header className="mt-8 mb-10 relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl shadow-blue-900/20">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 blur-[80px] rounded-full" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">System Integrity</p>
              <h1 className="text-3xl font-black tracking-tight leading-none">Security <br /> Vault</h1>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-black ${securityScore > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {securityScore}%
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Safety Score</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(59,130,246,0.5)] ${
                securityScore > 90 ? 'bg-emerald-500 w-[98%]' : 'bg-gradient-to-r from-amber-500 to-blue-500 w-[65%]'
              }`}
            />
          </div>
          
          <div className="mt-4 flex items-center space-x-2">
            <Zap size={12} className={securityScore > 90 ? 'text-emerald-400' : 'text-amber-400'} fill="currentColor" />
            <p className="text-[10px] font-medium text-slate-300">
              {is2FAEnabled ? "Maximum encryption active" : "Enable 2FA to reach 98% integrity"}
            </p>
          </div>
        </div>
      </header>

      {/* 2. BIOMETRIC & ACCESS CONTROL */}
      <section className="mb-10 space-y-4">
        <SectionHeader title="Authentication" />

        {/* Fancy 2FA Card with Neon Glow when active */}
        <div className={`group p-[2px] rounded-[2.5rem] transition-all duration-500 ${
          is2FAEnabled ? 'bg-gradient-to-r from-emerald-400 to-blue-500 shadow-lg shadow-emerald-500/10' : 'bg-slate-200'
        }`}>
          <div className="bg-white p-6 rounded-[2.4rem] flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-2xl transition-colors duration-500 ${
                is2FAEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
              }`}>
                <Fingerprint size={24} />
              </div>
              <div>
                <p className="font-black text-sm text-slate-800">Identity Shield</p>
                <p className={`text-[10px] font-bold uppercase ${is2FAEnabled ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {is2FAEnabled ? '2FA Protection Enabled' : 'Level 1: Standard'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIs2FAEnabled(!is2FAEnabled)}
              className={`w-14 h-8 rounded-full relative transition-all duration-300 shadow-inner ${
                is2FAEnabled ? "bg-emerald-500" : "bg-slate-200"
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-500 shadow-md ${
                is2FAEnabled ? "left-7" : "left-1"
              }`} />
            </button>
          </div>
        </div>

        <button className="w-full bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
              <Lock size={20} />
            </div>
            <div className="text-left">
              <p className="font-black text-sm text-slate-800">Master Password</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Updated 42 days ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-blue-600">
            <span className="text-[10px] font-black uppercase">Change</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
          </div>
        </button>
      </section>

      {/* 3. REAL-TIME THREAT MONITORING */}
      <section className="mb-10">
        <SectionHeader title="Active Sessions" />
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
          <div className="p-6 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-white border border-slate-200 text-slate-900 rounded-2xl">
                  <Globe size={20} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <p className="font-black text-sm text-slate-800 tracking-tight">Windows 11 • Chrome</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Dehradun, India • <span className="text-emerald-500">Online</span></p>
              </div>
            </div>
            <div className="bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter shadow-lg shadow-slate-900/20">Current</div>
          </div>
          
          <button className="w-full p-5 text-rose-500 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-rose-50 transition-colors flex items-center justify-center space-x-2">
            <ShieldAlert size={14} />
            <span>Kill all remote sessions</span>
          </button>
        </div>
      </section>

      {/* 4. ADVANCED CRYPTO-ACTIONS */}
      <section className="mb-12">
        <SectionHeader title="Crypto Utilities" />
        <div className="grid grid-cols-2 gap-4">
          <button className="group relative bg-slate-900 text-white p-8 rounded-[2.5rem] overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/20 active:scale-95">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <RefreshCw size={60} />
            </div>
            <RefreshCw size={24} className="mb-6 text-blue-400 group-hover:rotate-180 transition-transform duration-700" />
            <p className="font-black text-sm leading-tight">Rotate <br /> QR Token</p>
            <p className="mt-2 text-[8px] text-slate-500 font-bold uppercase tracking-widest">Instant Sync</p>
          </button>

          <button className="bg-white border-2 border-slate-100 p-8 rounded-[2.5rem] text-left hover:border-blue-200 transition-all active:scale-95">
            <History size={24} className="mb-6 text-slate-400" />
            <p className="font-black text-sm text-slate-800 leading-tight">Security <br /> History</p>
            <p className="mt-2 text-[8px] text-slate-500 font-bold uppercase tracking-widest">32 Events</p>
          </button>
        </div>
      </section>

      <footer className="flex flex-col items-center space-y-4">
        <div className="bg-slate-100 px-4 py-2 rounded-full flex items-center space-x-2">
          <Lock size={12} className="text-slate-400" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AES-256 Bit Encryption</span>
        </div>
        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.3em]">GEHU CSE SECURITY PROTOCOL</p>
      </footer>
    </div>
  );
}
