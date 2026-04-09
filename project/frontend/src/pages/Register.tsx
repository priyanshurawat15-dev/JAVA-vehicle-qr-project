import { useState } from 'react';
import { getQRCodeUrl } from '../utils/qrcode';
import { Download, Plus, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/api';

interface EmergencyContactForm {
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  relationship: string;
  priority: number;
}

export default function Register() {
  const navigate = useNavigate();
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContactForm[]>([
    { contact_name: '', contact_phone: '', contact_email: '', relationship: '', priority: 1 },
  ]);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const addEmergencyContact = () => {
    setEmergencyContacts([
      ...emergencyContacts,
      { contact_name: '', contact_phone: '', contact_email: '', relationship: '', priority: emergencyContacts.length + 1 },
    ]);
  };

  const removeEmergencyContact = (index: number) => {
    if (emergencyContacts.length > 1) {
      setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
    }
  };

  const updateEmergencyContact = (index: number, field: keyof EmergencyContactForm, value: string | number) => {
    const updated = [...emergencyContacts];
    updated[index] = { ...updated[index], [field]: value };
    setEmergencyContacts(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicleNumber.trim()) {
      alert('Please enter vehicle number');
      return;
    }

    const validContacts = emergencyContacts.filter((contact) => contact.contact_name.trim() && contact.contact_phone.trim());
    if (validContacts.length === 0) {
      alert('Please add at least one emergency contact');
      return;
    }

    setLoading(true);

    try {
      const response = await apiRequest<{ qrCode: string }>('/api/vehicle/register', {
        method: 'POST',
        body: {
          vehicleNumber: vehicleNumber.trim(),
          ownerName: ownerName.trim() || null,
          ownerEmail: ownerEmail.trim() || null,
          emergencyContacts: validContacts.map((contact) => ({
            contactName: contact.contact_name.trim(),
            contactPhone: contact.contact_phone.trim(),
            contactEmail: contact.contact_email.trim() || null,
            relationship: contact.relationship.trim(),
            priority: contact.priority,
          })),
        },
      });

      setQrCode(response.qrCode);
    } catch (error: any) {
      console.error('Error registering vehicle:', error);
      if (error.message?.toLowerCase().includes('authorization') || error.message?.toLowerCase().includes('session')) {
        alert('Please login first');
        navigate('/auth');
      } else {
        alert('Failed to register vehicle: ' + (error.message || error));
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = getQRCodeUrl(qrCode);
    link.download = `qr-code-${vehicleNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setVehicleNumber('');
    setOwnerName('');
    setOwnerEmail('');
    setEmergencyContacts([{ contact_name: '', contact_phone: '', contact_email: '', relationship: '', priority: 1 }]);
    setQrCode(null);
  };

  if (qrCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-9 h-9 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">Registration Successful!</h2>
            <p className="text-slate-600">Your vehicle has been registered successfully.</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <div className="flex justify-center mb-4">
              <img src={getQRCodeUrl(qrCode)} alt="Vehicle QR Code" className="w-64 h-64 rounded-lg shadow-md" />
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-1">QR Code ID</p>
              <p className="text-lg font-mono font-semibold text-slate-800 break-all">{qrCode}</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-emerald-800"><strong>Important :</strong> This is your QR code. Print it & paste this in your vehicle windshield or dashboard for easy scanning.</p>
          </div>

          <div className="space-y-3">
            <button onClick={downloadQRCode} className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors font-medium">
              <Download className="w-5 h-5" /> Download QR
            </button>
            <button onClick={resetForm} className="w-full text-slate-800 border border-slate-300 py-3 px-4 rounded-lg hover:bg-slate-100 transition-colors font-medium">
              Register another vehicle
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Register Vehicle</h1>
              <p className="text-sm text-slate-600">Add your vehicle and emergency contacts to the system.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Number <span className="text-red-500">*</span></label>
              <input value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} type="text" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} type="text" placeholder="Owner Name" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none" />
              <input value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} type="email" placeholder="Owner Email" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">Emergency Contacts</label>
                <button type="button" onClick={addEmergencyContact} className="text-emerald-600 text-sm">+ Add contact</button>
              </div>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="border p-3 rounded-lg">
                    <div className="grid gap-2 md:grid-cols-2 mb-2">
                      <input value={contact.contact_name} onChange={(e) => updateEmergencyContact(index, 'contact_name', e.target.value)} placeholder="Name" className="px-3 py-2 border rounded-lg w-full" />
                      <input value={contact.contact_phone} onChange={(e) => updateEmergencyContact(index, 'contact_phone', e.target.value)} placeholder="Phone" className="px-3 py-2 border rounded-lg w-full" />
                    </div>
                    <div className="grid gap-2 md:grid-cols-2 mb-2">
                      <input value={contact.contact_email} onChange={(e) => updateEmergencyContact(index, 'contact_email', e.target.value)} placeholder="Email" className="px-3 py-2 border rounded-lg w-full" />
                      <input value={contact.relationship} onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)} placeholder="Relationship" className="px-3 py-2 border rounded-lg w-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <small className="text-slate-500">Priority: {contact.priority}</small>
                      <button type="button" onClick={() => removeEmergencyContact(index)} className="text-red-500 text-sm">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition font-medium">
              {loading ? 'Submitting...' : 'Register Vehicle'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
