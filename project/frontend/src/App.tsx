import ScanPage from "./pages/ScanPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Scan from './pages/Scan';
import ParkingAlert from './pages/ParkingAlert';
import Emergency from './pages/Emergency';
import Incident from './pages/Incident';

import Scanner from "./pages/Scanner";

import BottomNav from "./components/BottomNav";

import Profile from "./pages/Profile";
import Auth from "./pages/Auth";


import QRPage from "./pages/QRPage";
import Documents from "./pages/Documents";

import Notifications from "./pages/Notifications";


import EmergencyInfo from "./pages/EmergencyInfo";
import ChangePassword from "./pages/ChangePassword";
import Settings from "./pages/Settings";
import Security from "./pages/Security";
import Feedback from "./pages/Feedback";
import Support from "./pages/Support";

function App() {
  return (
    <BrowserRouter>

      {/* BACKGROUND */}
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">

        {/* MOBILE APP CONTAINER */}
        <div className="w-full max-w-sm bg-white min-h-screen shadow-xl rounded-3xl overflow-hidden">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/scan/:qrCode" element={<Scan />} />
            <Route path="/alert/:vehicleId" element={<ParkingAlert />} />
            <Route path="/emergency/:vehicleId" element={<Emergency />} />
            <Route path="/incident/:vehicleId" element={<Incident />} />
            
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />


            <Route path="/scan/:id" element={<ScanPage />} />


            <Route path="/qr" element={<QRPage />} />
            <Route path="/documents" element={<Documents />} />

      
            <Route path="/notifications" element={<Notifications />} />

            
            <Route path="/emergencyinfo" element={<EmergencyInfo />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/security" element={<Security />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/support" element={<Support />} />
          </Routes>
      
        <BottomNav />
      </div>
  </div>
    </BrowserRouter>
  );
}

export default App;
