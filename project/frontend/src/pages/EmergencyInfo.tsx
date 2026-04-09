import { useState } from "react";
import { 
  Heart, Phone, Activity, Save, 
  AlertTriangle, ShieldPlus, ChevronLeft, Lock 
} from "lucide-react";

export default function EmergencyUpgrade() {
  const [data, setData] = useState({ contact: "", blood: "", medical: "" });

  const CustomInput = ({ icon: Icon, placeholder, value, onChange, isArea = false }: any) => (
    <div className="relative group">
      <div className="absolute left-6 top-6 text-slate-300 group-focus-within:text-rose-500 transition-colors">
        <Icon size={18} />
      </div>
      {isArea ? (
        <textarea 
          placeholder={placeholder}
          className="w-full bg-white border border-slate-100 rounded-[2.5rem] p-6 pl-16 text-sm font-bold focus:ring-8 focus:ring-rose-500/5 focus:border-rose-200 transition-all outline-none min-h-[140px] shadow-sm"
          value={value}
          onChange={onChange}
        />
      ) : (
        <input 
          type="text"
          placeholder={placeholder}
          className="w-full bg-white border border-slate-100 rounded-[2.5rem] p-6 pl-16 text-sm font-bold focus:ring-8 focus:ring-rose-500/5 focus:border-rose-200 transition-all outline-none shadow-sm"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBFDFF] p-6 pb-24 max-w-xl mx-auto font-sans">
      
      {/* HEADER */}
      <header className="mt-8 mb-10 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-slate-600 active:scale-90 transition-transform">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">Emergency <br /> Protocol</h1>
        </div>
        <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl shadow-inner animate-pulse">
          <ShieldPlus size={24} />
        </div>
      </header>

      {/* PRIVACY WARNING */}
      <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2.5rem] mb-10 flex items-start space-x-4 shadow-sm shadow-rose-100/50">
        <div className="p-2.5 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-200">
          <AlertTriangle size={18} />
        </div>
        <div>
          <p className="text-rose-900 font-black text-[10px] uppercase tracking-[0.1em]">Verified Access Only</p>
          <p className="text-rose-700 text-[10px] font-bold leading-relaxed mt-1 uppercase tracking-tight opacity-80">
            This information is only visible to medical responders who scan your vehicle QR in critical situations.
          </p>
        </div>
      </div>

      {/* INPUT FIELDS */}
      <div className="space-y-6">
        <CustomInput 
          icon={Phone} 
          placeholder="Emergency Contact (ICE)" 
          value={data.contact}
          onChange={(e: any) => setData({...data, contact: e.target.value})}
        />
        <CustomInput 
          icon={Activity} 
          placeholder="Blood Group (e.g., AB+)" 
          value={data.blood}
          onChange={(e: any) => setData({...data, blood: e.target.value})}
        />
        <CustomInput 
          icon={Heart} 
          isArea 
          placeholder="Critical Medical Info (Allergies, Medical History...)" 
          value={data.medical}
          onChange={(e: any) => setData({...data, medical: e.target.value})}
        />

        {/* SAVE BUTTON */}
        <button className="w-full bg-slate-900 text-white p-7 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-slate-900/30 active:scale-[0.97] transition-all flex items-center justify-center space-x-3 group mt-4">
          <Save size={18} className="group-hover:translate-y-[-2px] transition-transform text-rose-400" />
          <span>Synchronize Data</span>
        </button>
      </div>

      <footer className="mt-16 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
          <Lock size={12} className="text-slate-400" />
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">End-to-End Encryption</span>
        </div>
      </footer>
    </div>
  );
}
