"use client";

import { NewThree, updateWordList } from "@/hooks/NewMain";
import { Activity, Eye, Sparkles, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

// interface InputData {
//   category?: string;
//   text?: string;
//   file?: File;
// }

interface ChildProps {
  data: string[] | null;
}

export function NewDisplayPanel({ data }: ChildProps) {
  const [isThreeJSInitialized, setIsThreeJSInitialized] = useState(false);
  const [currentWord, setCurrentWord] = useState<string>("READY");
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("Data reached in DisplayPanel: " + data);

  useEffect(() => {
    const initializeThreeJS = () => {
      try {
        console.log("Initializing Three.js...");
        NewThree("label", "container");
        setIsThreeJSInitialized(true);
        console.log("Three.js initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Three.js:", error);
      }
    };

    // Only initialize once when component mounts
    initializeThreeJS();

    return () => {
      // cleanup();
      setIsThreeJSInitialized(false);
    };
  }, []);

  useEffect(() => {
    const SendingWord = () => {
      if (data && data.length > 0) {
        updateWordList(data);
        setIsPlaying(true);
        setCurrentWord(data[0] || "PROCESSING");
      }
    };
    const timer = setTimeout(SendingWord, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  return (
    <div className="h-full bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50 rounded-3xl" />

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm p-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              {isThreeJSInitialized && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                3D Sign Language Viewer
                {isPlaying && (
                  <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                )}
              </h2>
              <div className="hidden">{currentWord}</div>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isThreeJSInitialized ? "bg-green-400" : "bg-yellow-400"
                  } animate-pulse`}
                />
                <span className="text-sm text-white/70">
                  {isThreeJSInitialized
                    ? "Ready for visualization"
                    : "Initializing..."}
                </span>
              </div>
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/80">
                {data ? `${data.length} words` : "Waiting..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Current word display - wrapping the original label */}
      <div className="relative z-10 bg-midnight backdrop-blur-sm p-2">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Volume2 className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-white/60 uppercase tracking-wider">
              Currently Displaying
            </span>
          </div>
          {/* ORIGINAL LABEL DIV - UNTOUCHED */}
          <h1
            id="label"
            className="text-3xl md:text-2xl font-bold text-white tracking-wider"
          >
            {isThreeJSInitialized ? "READY" : "Loading..."}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mx-auto mt-3 animate-pulse" />
        </div>
      </div>

      {/* 3D Visualization Container - ORIGINAL CONTAINER DIV PRESERVED */}
      <div className="relative z-10 flex-1 bg-midnight backdrop-blur-sm">
        <div
          id="container"
          className="w-full h-120 relative overflow-hidden bg-midnight"
          style={{ minHeight: "400px" }}
        >
          {/* Loading state overlay - only shows when not initialized */}
          {!isThreeJSInitialized && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-spin">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <p className="text-white/70 text-lg">
                  Initializing 3D Environment...
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-3 animate-pulse" />
              </div>
            </div>
          )}

          {/* Ready state overlay - only shows when initialized but no data */}
          {isThreeJSInitialized && !data && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready to Visualize
                </h3>
                <p className="text-white/60 text-lg">
                  Enter text or upload a file to see sign language animation
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-200" />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Control panel overlay */}
      {/* {data && (
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                </button>
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <RotateCcw className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <span>Progress:</span>
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40 delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-50 delay-500" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-60 delay-700" />
      </div>
    </div>
  );
}
