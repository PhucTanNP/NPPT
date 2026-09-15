"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Disc } from "lucide-react";

export function TaylorSwiftPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioUrl =
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-112211.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6;

    // Direct auto-play attempt
    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked by browser policy until user interaction
        setIsPlaying(false);
      }
    };

    tryPlay();

    // Comprehensive user interaction handler for instant autoplay fallback
    const handleUserActive = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            removeListeners();
          })
          .catch(() => {});
      }
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleUserActive);
      window.removeEventListener("touchstart", handleUserActive);
      window.removeEventListener("touchend", handleUserActive);
      window.removeEventListener("pointerdown", handleUserActive);
      window.removeEventListener("mousemove", handleUserActive);
      window.removeEventListener("scroll", handleUserActive);
      window.removeEventListener("keydown", handleUserActive);
    };

    window.addEventListener("click", handleUserActive, { passive: true });
    window.addEventListener("touchstart", handleUserActive, { passive: true });
    window.addEventListener("touchend", handleUserActive, { passive: true });
    window.addEventListener("pointerdown", handleUserActive, { passive: true });
    window.addEventListener("mousemove", handleUserActive, { passive: true });
    window.addEventListener("scroll", handleUserActive, { passive: true });
    window.addEventListener("keydown", handleUserActive, { passive: true });

    return () => {
      removeListeners();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Background Audio Source with autoPlay */}
      <audio
        ref={audioRef}
        src={audioUrl}
        autoPlay
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Subtle Floating Bottom-Right Audio Pill */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-950/90 backdrop-blur-xl text-white border shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer ${
            isPlaying
              ? "border-rose-500/30 hover:border-rose-400"
              : "border-amber-400/80 animate-pulse hover:border-amber-300"
          }`}
          title={isPlaying ? "Pause Music" : "Click anywhere to Auto Play Music"}
        >
          <div className="relative flex items-center justify-center">
            <Disc className={`w-4 h-4 ${isPlaying ? "text-rose-400 animate-spin" : "text-amber-400"}`} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-rose-300 font-serif leading-none">
              Taylor Swift
            </span>
            <span className="text-[9px] font-mono text-slate-400 leading-tight">
              {isPlaying ? "Enchanted (Taylor's Version) 🎵" : "Click to Play Music 🎵"}
            </span>
          </div>

          <span
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="ml-1 text-slate-400 hover:text-white transition-colors p-1"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </span>
        </button>
      </div>
    </>
  );
}
