import { useState } from "react";
import { apiRequest } from "../lib/api";

export default function ChangePassword() {
  const [password, setPassword] = useState("");

  const handleChange = async () => {
    try {
      await apiRequest("/api/auth/change-password", {
        method: "POST",
        body: { password },
      });
      alert("Password updated successfully!");
      setPassword("");
    } catch (error: any) {
      alert("Error: " + (error.message || "Unable to update password"));
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Change Password</h1>

      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-xl"
      />

      <button
        onClick={handleChange}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl"
      >
        Update Password
      </button>
    </div>
  );
}
