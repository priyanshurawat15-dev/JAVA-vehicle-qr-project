import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Vehicle } from "../types";
import { useNavigate } from "react-router-dom";
import {
  User, Camera, QrCode,
  FileText, Bell, ShieldAlert, Lock,
  Settings, MessageSquare, HelpCircle,
  ChevronRight, Car
} from "lucide-react";

interface ProfileUser {
  id: string;
  email: string;
  name: string;
  username: string;
  phone: string;
  birthday?: string;
  vehicles: Vehicle[];
}

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  color: string;
}

export default function UltimateProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<ProfileUser | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/auth");
        return;
      }

      setUser({
  id: data.user.id,
  email: data.user.email || "",
  name: data.user.user_metadata?.name || "User",
  username: data.user.user_metadata?.username || "",
  phone: "",
  vehicles: [], 
});

      setImage(`https://ui-avatars.com/api/?name=${encodeURIComponent(
        data.user.user_metadata?.name || data.user.email || "User"
      )}`);

    } catch (err) {
      console.error(err);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [navigate]);

  const MenuItem = ({ icon: Icon, label, path, color }: MenuItemProps) => (
    <button
      onClick={() => navigate(path)}
      className="w-full flex items-center justify-between p-4 bg-white rounded-2xl mb-2 border border-slate-50 hover:bg-slate-50 transition"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-xl ${color}`}>
          <Icon size={18} />
        </div>
        <span className="text-sm font-bold text-slate-700">{label}</span>
      </div>
      <ChevronRight size={16} className="text-slate-300" />
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        Loading...
      </div>
    );
  }

const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate("/auth");
};

  return (
    <div className="min-h-screen bg-[#FBFDFF] pb-24">
      <div className="bg-gradient-to-b from-emerald-50 to-transparent pt-12 pb-8 px-6 text-center">
        <div className="relative inline-block">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow overflow-hidden bg-gray-200">
            {image ? (
              <img src={image} className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="mx-auto mt-8 text-gray-400" />
            )}
          </div>

          <label
            htmlFor="upload"
            className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full text-white cursor-pointer"
          >
            <Camera size={16} />
          </label>

          <input
            id="upload"
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) {
                return;
              }
              const previewUrl = URL.createObjectURL(file);
              setImage(previewUrl);
              alert("Profile image preview updated locally. Backend image upload is not configured yet.");
            }}
          />
        </div>

        <h1 className="text-xl font-bold mt-3">
          {user?.name || "User"}
        </h1>

        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <div className="max-w-md mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-xs text-gray-400 font-bold mb-3">VEHICLES</h2>

          {vehicles.map((v) => (
            <div key={v.id} className="bg-white p-4 rounded-xl mb-2 flex items-center gap-3">
              <Car />
              <div>
                <p className="font-semibold">{v.vehicle_number}</p>
                <p className="text-xs text-gray-500">{v.model}</p>
              </div>
            </div>
          ))}
        </div>

        <MenuItem icon={QrCode} label="QR Code" path="/qr" color="bg-emerald-50 text-emerald-600" />
        <MenuItem icon={FileText} label="Documents" path="/documents" color="bg-indigo-50 text-indigo-600" />
        <MenuItem icon={Bell} label="Notifications" path="/notifications" color="bg-rose-50 text-rose-600" />
        <MenuItem icon={ShieldAlert} label="Emergency Info" path="/emergencyinfo" color="bg-green-50 text-green-600" />
        <MenuItem icon={Lock} label="Security" path="/security" color="bg-gray-100 text-gray-600" />
        <MenuItem icon={Settings} label="Settings" path="/settings" color="bg-gray-100 text-gray-600" />
        <MenuItem icon={MessageSquare} label="Feedback" path="/feedback" color="bg-yellow-50 text-yellow-600" />
        <MenuItem icon={HelpCircle} label="Support" path="/support" color="bg-emerald-50 text-emerald-600" />

        <button onClick={handleLogout} className="w-full mt-6 p-4 bg-red-50 text-red-600 rounded-xl font-bold">
          Logout
        </button>
      </div>
    </div>
  );
}
