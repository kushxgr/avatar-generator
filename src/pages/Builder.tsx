import { useState } from "react";
import Avatar from "../components/Avatar/Avatar";

export default function Builder() {
  const [eyeType, setEyeType] = useState("dot");
  const [mouthType, setMouthType] = useState("smile");
  const [color, setColor] = useState("#f5cfa0");

  return (
   <div className="h-screen w-full flex flex-row bg-slate-950 text-white">
      <div className="w-1/3 flex items-center justify-center border-r border-slate-800">
        <div className="w-64 h-64 bg-black rounded-2xl flex items-center justify-center">
          <Avatar eyeType={eyeType} mouthType={mouthType} color={color} />
        </div>
      </div>

      <div className="w-2/3 p-8 overflow-y-auto space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Customize</h2>
          <p className="mt-1 text-sm text-slate-400">
            Change the avatar parts below.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">
            Eyes
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setEyeType("dot")}
              className={`px-4 py-2 rounded-lg border transition ${
                eyeType === "dot"
                  ? "bg-lime-400 text-black border-lime-400"
                  : "bg-slate-800 border-slate-700 hover:bg-slate-700"
              }`}
            >
              Dot
            </button>

            <button
              onClick={() => setEyeType("line")}
              className={`px-4 py-2 rounded-lg border transition ${
                eyeType === "line"
                  ? "bg-lime-400 text-black border-lime-400"
                  : "bg-slate-800 border-slate-700 hover:bg-slate-700"
              }`}
            >
              Line
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">
            Mouth
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setMouthType("smile")}
              className={`px-4 py-2 rounded-lg border transition ${
                mouthType === "smile"
                  ? "bg-lime-400 text-black border-lime-400"
                  : "bg-slate-800 border-slate-700 hover:bg-slate-700"
              }`}
            >
              Smile
            </button>

            <button
              onClick={() => setMouthType("sad")}
              className={`px-4 py-2 rounded-lg border transition ${
                mouthType === "sad"
                  ? "bg-lime-400 text-black border-lime-400"
                  : "bg-slate-800 border-slate-700 hover:bg-slate-700"
              }`}
            >
              Sad
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">
            Color
          </p>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 rounded-full border-2 border-slate-700 cursor-pointer bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}