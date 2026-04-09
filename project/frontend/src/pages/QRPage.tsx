import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const qrData = "https://your-app.com/vehicle/123"; // dynamic banayenge baad me

  return (
    <div className="p-4 text-center space-y-4">
      
      <h1 className="text-xl font-bold">My QR Code</h1>

      <div className="bg-white p-4 rounded-xl shadow inline-block">
        <QRCodeCanvas value={qrData} size={200} />
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-xl">
        Download QR
      </button>

    </div>
  );
}
