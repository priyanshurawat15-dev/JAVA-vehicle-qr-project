import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ScanPage = () => {
  const { qrCode } = useParams();
  const [vehicle, setVehicle] = useState<any>(null);

  useEffect(() => {
    if (!qrCode) return;

    fetch(`https://java-vehicle-qr-project.onrender.com/api/vehicle/${qrCode}`)
      .then(res => res.json())
      .then(data => {
        console.log("API DATA:", data);
        setVehicle(data);
      })
      .catch(err => console.error(err));
  }, [qrCode]);

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vehicle Found</h2>

      <h3>{vehicle.vehicle_number}</h3>
      <p>Model: {vehicle.model}</p>
      <p>Color: {vehicle.color}</p>
    </div>
  );
};

export default ScanPage;