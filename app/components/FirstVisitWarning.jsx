"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FirstVisitWarning() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("seenWarning");
      if (!seen) setOpen(true);
    } catch {}
  }, []);

  const acknowledge = () => {
    try { localStorage.setItem("seenWarning", "1"); } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white text-black shadow-2xl">
        <div className="p-6 sm:p-7">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Before You Submit</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
            <li>Only one student in a team needs to register.</li>
            <li>View all submitted projects before submitting to ensure yours is different.</li>
            <li className="font-medium">Duplicate projects saved later won’t be counted.</li>
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Link
              href="/Projects"
              onClick={acknowledge}
              className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 bg-black text-white hover:bg-zinc-900 transition-colors"
            >
              View Projects
            </Link>
            <button
              type="button"
              onClick={acknowledge}
              className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 bg-zinc-200 hover:bg-zinc-300 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
