import { useState } from 'react';
import { 
  Moon, Sun, Globe, Shield , 
  Bell, Smartphone, Trash2, ChevronRight,
  Info, Sparkles, UserCircle
} from 'lucide-react';

export default function UltimateSettings() {
  const userEmail = localStorage.getItem("email") || "user@gmail.com";
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-[#FBFDFF] text-slate-900'}`}>
      
      <div className="max-w-xl mx-auto p-6 pb-24">
        
        {/* 1. Premium Header */}
        <header className="mt-8 mb-10">
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Sparkles size={16} />
            </div>
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Preferences</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight leading-tight">Settings</h1>
        </header>

        {/* 2. Account Snapshot (Adds a 'Pro' feel) */}
        <div className={`mb-8 p-6 rounded-[2.5rem] border flex items-center justify-between ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              <UserCircle size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Registered User</p>
              <p className="font-bold">{userEmail}</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-300" />
        </div>

        {/* 3. General Settings Group */}
        <section className="space-y-4 mb-10">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Appearance & Interaction</h2>
          
          {/* Dark Mode Toggle */}
          <div className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center space-x-4">
              <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-100 text-slate-600'}`}>
                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <span className="font-bold text-sm">Dark Mode</span>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-8 rounded-full transition-all relative ${darkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${darkMode ? 'left-7 shadow-lg' : 'left-1'}`} />
            </button>
          </div>

          {/* Language Selection */}
          <div className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Globe size={20} />
              </div>
              <span className="font-bold text-sm">Language</span>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`bg-transparent font-bold text-sm focus:outline-none ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
          </div>

          {/* Notifications */}
          <div className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                <Bell size={20} />
              </div>
              <span className="font-bold text-sm">Push Notifications</span>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 rounded-full transition-all relative ${notifications ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${notifications ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </section>

        {/* 4. Privacy & Security Group */}
        <section className="space-y-4 mb-10">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Privacy & Security</h2>
          
          <button className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all hover:scale-[1.01] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Shield size={20} />
              </div>
              <div className="text-left">
                <span className="font-bold text-sm block">Data Visibility</span>
                <span className="text-[10px] text-slate-500 font-medium">Manage how others see your info</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>

          <button className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all hover:scale-[1.01] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Smartphone size={20} />
              </div>
              <div className="text-left">
                <span className="font-bold text-sm block">Device Permissions</span>
                <span className="text-[10px] text-slate-500 font-medium">Camera, Location, Storage</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>
        </section>

        {/* 5. Danger Zone */}
        <section className="mt-12">
          <button className="w-full flex items-center justify-center space-x-2 p-5 rounded-3xl border-2 border-dashed border-rose-500/20 text-rose-500 font-black text-sm hover:bg-rose-500/5 transition-all">
            <Trash2 size={18} />
            <span>Delete Account & QR Data</span>
          </button>
          <p className="text-center text-[10px] text-slate-400 mt-4 font-medium px-8">
            Deleting your account will permanently disable all generated QR codes for your vehicles.
          </p>
        </section>

        {/* Footer Info */}
        <footer className="mt-16 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-1.5 rounded-full">
            <Info size={12} className="text-slate-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Version 2.4.0 (Stable)</span>
          </div>
          <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.3em]">
            &copy; 2026 Java Vehicle WLE
          </p>
        </footer>

      </div>
    </div>
  );
}
