import { useState } from "react";
import { Send, Heart, Star, Sparkles, CheckCircle } from "lucide-react";

export default function Feedback() {

  // ---------------- STATE ----------------
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("Suggestion");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = ["Bug", "UI/UX", "Suggestion", "loved ", "Other" ,];

  // ---------------- HANDLER ----------------
  const handleSubmit = () => {
    if (!feedbackText.trim()) {
      alert("Please enter feedback");
      return;
    }

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFeedbackText("");
      setRating(0);
    }, 3000);
  };

  // ---------------- SUCCESS SCREEN ----------------
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-emerald-600" size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Thank You!</h2>
          <p className="text-slate-500 mt-2">
            Your feedback helps us improve the app.
          </p>
        </div>
      </div>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <div className="min-h-screen bg-[#FBFDFF] p-6 pb-20 max-w-lg mx-auto">

      {/* HEADER */}
      <header className="mt-8 mb-10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
            <Heart size={16} fill="currentColor" />
          </div>
          <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">
            Share Your Thoughts
          </span>
        </div>

        <h1 className="text-4xl font-black text-slate-900 leading-tight">
          We value your <br /> experience.
        </h1>
      </header>

      {/* ⭐ RATING */}
      <section className="mb-8 bg-white p-6 rounded-[2rem] border shadow-xl text-center">
        <p className="text-sm font-bold text-slate-400 uppercase mb-6">
          How was your experience?
        </p>

        <div className="flex justify-between px-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`p-3 rounded-2xl transition ${
                rating >= star
                  ? "bg-amber-50 text-amber-500 scale-110"
                  : "bg-slate-50 text-slate-300"
              }`}
            >
              <Star
                size={28}
                fill={rating >= star ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>
      </section>

      {/* 🏷 CATEGORY */}
      <section className="mb-8">
        <p className="text-xs font-bold text-slate-400 uppercase mb-4">
          Feedback Category
        </p>

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2 rounded-full text-xs font-bold border transition ${
                category === item
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* ✍ TEXTAREA */}
      <section className="mb-10">
        <p className="text-xs font-bold text-slate-400 uppercase mb-4">
          Detailed Feedback
        </p>

        <div className="relative">
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="What can we improve? (e.g., scan speed, notification clarity...)"
            className="w-full bg-white border-2 rounded-[2rem] p-6 min-h-[160px] focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />

          <div className="absolute right-6 bottom-4 text-xs text-slate-300">
            {feedbackText.length} chars
          </div>
        </div>
      </section>

      {/* 🚀 SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={!feedbackText || rating === 0}
        className={`w-full py-4 rounded-[2rem] font-bold flex items-center justify-center gap-2 transition ${
          !feedbackText || rating === 0
            ? "bg-gray-200 text-gray-400"
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        }`}
      >
        <Send size={18} />
        Send Feedback
      </button>

      {/* FOOTER */}
      <div className="mt-6 flex justify-center gap-2 text-slate-300 text-xs">
        <Sparkles size={12} />
        Privacy-first feedback system
      </div>

    </div>
  );
}
