"use client";
 
import { useEffect, useState } from "react";
 
const MESSAGES = ["initializing", "loading modules", "preparing ui", "almost there"];
const CYCLE_MS = 2400;

const Loader = () => {
    const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);
 
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 200);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);
 
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAF7F2] overflow-hidden">
 
      {/* Scrolling grid background */}
      <div
        className="absolute inset-0 animate-[gridScroll_8s_linear_infinite]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(181,137,74,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(181,137,74,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
 
      {/* Glow orb */}
      <div
        className="absolute w-[420px] h-[420px] rounded-full pointer-events-none animate-[orbPulse_3s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle, rgba(181,137,74,0.12) 0%, transparent 70%)" }}
      />
 
      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-20 pointer-events-none animate-[scanDown_4s_linear_infinite]"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(181,137,74,0.06) 50%, transparent 100%)" }}
      />
 
      {/* Core content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
 
        {/* Rings */}
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-[1.5px] border-transparent animate-[spinCW_1.4s_linear_infinite]"
            style={{ borderTopColor: "#B5894A", borderRightColor: "rgba(181,137,74,0.3)" }}
          />
          {/* Mid ring */}
          <div
            className="absolute inset-3 rounded-full border-[1.5px] border-transparent animate-[spinCCW_1s_linear_infinite]"
            style={{ borderTopColor: "rgba(181,137,74,0.7)", borderLeftColor: "rgba(181,137,74,0.25)" }}
          />
          {/* Inner ring */}
          <div
            className="absolute inset-[26px] rounded-full border-[1.5px] border-transparent animate-[spinCW_0.7s_linear_infinite]"
            style={{ borderTopColor: "rgba(181,137,74,0.9)" }}
          />
          {/* Center dot */}
          <div className="absolute inset-[36px] flex items-center justify-center">
            <div
              className="w-1.5 h-1.5 rounded-full animate-[dotPulse_1.4s_ease-in-out_infinite]"
              style={{ background: "#B5894A", boxShadow: "0 0 8px rgba(181,137,74,0.5)" }}
            />
          </div>
        </div>
 
        {/* Text + progress */}
        <div className="flex flex-col items-center gap-2.5">
          <p
            className="font-mono text-[13px] font-medium tracking-[0.2em] uppercase transition-opacity duration-200"
            style={{ color: "#B5894A", opacity: visible ? 1 : 0 }}
          >
            {MESSAGES[msgIndex]}
          </p>
          <div
            className="w-40 h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(181,137,74,0.15)" }}
          >
            <div
              className="h-full rounded-full animate-[progressFill_2.4s_cubic-bezier(0.4,0,0.2,1)_infinite]"
              style={{ background: "linear-gradient(90deg, rgba(181,137,74,0.6), #B5894A)" }}
            />
          </div>
        </div>
      </div>
 
      <style>{`
        @keyframes gridScroll  { to { transform: translateY(40px); } }
        @keyframes orbPulse    { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.1); opacity: 1; } }
        @keyframes scanDown    { 0% { top: -80px; } 100% { top: 100%; } }
        @keyframes spinCW      { to { transform: rotate(360deg);  } }
        @keyframes spinCCW     { to { transform: rotate(-360deg); } }
        @keyframes dotPulse    { 0%, 100% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        @keyframes progressFill {
          0%   { width: 0%;   opacity: 0.6; }
          60%  { width: 90%;  opacity: 1;   }
          80%  { width: 92%;               }
          100% { width: 100%; opacity: 0;   }
        }
      `}</style>
    </div>
  );
};

export default Loader;