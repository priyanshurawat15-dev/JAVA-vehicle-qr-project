import { useState } from "react";

export default function Documents() {
const [file, setFile] = useState<File | null>(null);

const handleUpload = () => {
  if (!file) {
    alert("No file selected");
    return;
  }

  console.log(file); // ab file use ho rahi hai ✅
  alert("File uploaded!");
};

  return (
    <div className="p-4 space-y-4">

      <h1 className="text-xl font-bold">Documents</h1>

      <input 
        type="file" 
        onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
        }
    }}
      />

      <button 
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

    </div>
  );
}