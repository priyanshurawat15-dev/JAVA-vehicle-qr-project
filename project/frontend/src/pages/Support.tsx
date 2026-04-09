import { useState } from "react";
import {
  Search, HelpCircle,
  ShieldCheck, Smartphone, BookOpen,
  ChevronRight, ChevronDown, ChevronUp, Lightbulb, PlayCircle
} from "lucide-react";

export default function SupportFinal() {
  const [openTip, setOpenTip] = useState<number | null>(null);

  const tips = [
    {
      q: "QR Code not scanning?",
      a: "Ensure proper lighting and clean sticker. Keep 10-15cm distance."
    },
    {
      q: "Notifications not arriving?",
      a: "Check background permissions & disable DND mode."
    }
  ];

  const email = "priyanshurawat087@gmail.com";

  return (
    <div className="min-h-screen bg-gray-50 pb-12">

      {/* STATUS BAR */}
      <div className="bg-emerald-50 border-b px-6 py-2 flex justify-between items-center">
        <span className="text-[11px] font-semibold text-emerald-700">
          ● All Systems Operational
        </span>
        <span className="text-[11px] text-emerald-600">
          Secure & Active
        </span>
      </div>

      <div className="max-w-lg mx-auto p-5">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
          <p className="text-gray-500 text-sm mt-1">
            How can we help you today?
          </p>

          {/* SEARCH */}
          <div className="relative mt-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              placeholder="Search help..."
              className="w-full bg-white rounded-xl py-3 pl-11 pr-4 shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-emerald-500 text-white p-4 rounded-xl shadow">
            <PlayCircle size={24} />
            <h3 className="font-semibold mt-2">Getting Started</h3>
            <p className="text-xs text-emerald-100">Quick guide</p>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <BookOpen size={24} className="text-emerald-600" />
            <h3 className="font-semibold mt-2">User Manual</h3>
            <p className="text-xs text-gray-500">Documentation</p>
          </div>
        </div>

        {/* RESOURCES */}
        <div className="space-y-3 mb-8">
          <h2 className="text-xs text-gray-400 font-semibold uppercase">
            Resources
          </h2>

          {/* FAQ */}
          <button className="w-full flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-emerald-600" />
              <div className="text-left">
                <p className="font-medium">FAQs</p>
                <p className="text-xs text-gray-500">Common questions</p>
              </div>
            </div>
            <ChevronRight />
          </button>

          {/* Privacy */}
          <button className="w-full flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-600" />
              <div>
                <p className="font-medium">Privacy</p>
                <p className="text-xs text-gray-500">Data safety</p>
              </div>
            </div>
            <ChevronRight />
          </button>

          {/* Updates */}
          <button className="w-full flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Smartphone className="text-orange-600" />
              <div>
                <p className="font-medium">App Updates</p>
                <p className="text-xs text-gray-500">Latest changes</p>
              </div>
            </div>
            <ChevronRight />
          </button>
        </div>

        {/* TROUBLESHOOT */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-yellow-500" size={16} />
            <h2 className="text-sm font-semibold">Quick Fixes</h2>
          </div>

          {tips.map((tip, i) => (
            <div key={i} className="bg-white rounded-lg border mb-2">
              <button
                onClick={() => setOpenTip(openTip === i ? null : i)}
                className="w-full flex justify-between p-3 text-left"
              >
                <span className="text-sm font-medium">{tip.q}</span>
                {openTip === i ? <ChevronUp /> : <ChevronDown />}
              </button>

              {openTip === i && (
                <div className="px-3 pb-3 text-xs text-gray-500">
                  {tip.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CONTACT */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h3 className="font-semibold mb-1">Contact - mail at 
          </h3>
          <p
            onClick={() => window.location.href = `mailto:${email}`}
            className="text-emerald-600 text-sm cursor-pointer"
          >
            {email}
          </p>
        </div>

        {/* CTA */}
        <div className="bg-emerald-500 text-white p-5 rounded-xl shadow">
          <h3 className="font-semibold text-lg">Still need help?</h3>
          <p className="text-sm text-emerald-100 mb-3">
            We reply as soon as possible .
          </p>

          <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium">
            Chat Support
          </button>

          <button className="mt-2 w-full bg-red-500 py-2 rounded-lg font-medium">
            Report Issue
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Java Vehicle QR System
        </p>

      </div>
    </div>
  );
}
