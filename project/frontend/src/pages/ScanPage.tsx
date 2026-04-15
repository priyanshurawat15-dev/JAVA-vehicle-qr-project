import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ScanPage = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log("Scanned QR ID:", id);
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vehicle Scan Result</h2>
      <p>QR ID: {id}</p>
    </div>
  );
};

export default ScanPage;