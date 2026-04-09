import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");

  //useEffect(() => {
    //const checkSession = async () => {
    //  try {
    //    await apiRequest("/api/user/profile");
    //    navigate("/profile", { replace: true });
    //  } catch {
    //    // No active session.
    //  }
    //};

    //checkSession();
  //}, [navigate]);
const handleLogin = async () => {
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  setLoading(true);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login success");
    navigate("/profile", { replace: true });

  } catch (error: any) {
    console.error(error);
    alert("Login failed");
  } finally {
    setLoading(false);
  }
};




const handleSignup = async () => {
  if (!email || !password || !name || !username) {
    alert("Please fill all required fields");
    return;
  }

  setLoading(true);

  const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      name,
      username,
    },
  },
});

  if (error) {
    alert(error.message);
    setLoading(false);
    return;
  }

  alert("Check your email to verify account");

  setLoading(false);
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-[350px]">
        <div className="flex justify-center mb-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" className="w-12 h-12" />
        </div>

        <h2 className="text-center text-lg font-semibold mb-4">
          {isSignup ? "Create Account" : "Login to Vehicle QR System"}
        </h2>

        <input type="email" placeholder="Enter your email" className="border p-3 w-full mb-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter your password" className="border p-3 w-full mb-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setPassword(e.target.value)} />

        {isSignup && (
          <>
            <input placeholder="Full Name" className="border p-3 w-full mb-3 rounded-lg bg-gray-50" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Username" className="border p-3 w-full mb-3 rounded-lg bg-gray-50" onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Phone (optional)" className="border p-3 w-full mb-3 rounded-lg bg-gray-50" onChange={(e) => setPhone(e.target.value)} />
            <input placeholder="Birthday (optional)" className="border p-3 w-full mb-3 rounded-lg bg-gray-50" onChange={(e) => setBirthday(e.target.value)} />
          </>
        )}

        <button onClick={isSignup ? handleSignup : handleLogin} disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white p-3 w-full rounded-full mb-3 font-semibold disabled:opacity-50">
          {loading ? "Please wait..." : isSignup ? "Create Account" : "Log in"}
        </button>

        <p onClick={() => setIsSignup(!isSignup)} className="text-center text-sm mb-4 cursor-pointer text-blue-500 hover:underline">
          {isSignup ? "Already have an account? Login" : "Create new account"}
        </p>

        <div className="flex items-center mb-4">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="px-2 text-gray-400 text-sm"></span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-2">
          <b>{isSignup ? "SIGNUP PAGE" : "LOGIN PAGE"}</b>
        </p>
      </div>
    </div>
  );
}
