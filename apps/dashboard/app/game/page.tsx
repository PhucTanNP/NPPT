"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Dices, Gift, Volume2, VolumeX, Share2, Check, ArrowLeft } from "lucide-react";
import { TaylorSwiftPlayer } from "@/components/taylor-swift-player";

interface Book {
  id: number;
  title: string;
  author: string;
  desc: string;
  cover: string;
  tag: string;
}

const booksList: Book[] = [
  {
    id: 1,
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    desc: "A timeless literary masterpiece exploring freedom, faith, morality, and profound familial love.",
    cover: "https://lh3.googleusercontent.com/d/1ztRjZI_Ik68DPFBupMJVkzpKwDkWHuks",
    tag: "Classic Literature",
  },
  {
    id: 2,
    title: "My Grandmother Asked Me to Tell You She's Sorry",
    author: "Fredrik Backman",
    desc: "A heartwarming, touching story of grandmothers, acceptance, and wondrous empathy dedicated to Khanh Doan.",
    cover: "https://lh3.googleusercontent.com/d/1vwrFEmE_YHu9aXS8hcdNkv624zsXmyJY",
    tag: "Healing & Love",
  },
  {
    id: 3,
    title: "Beartown",
    author: "Fredrik Backman",
    desc: "A powerful journey of facing hardships, trust, and resilience in a small community.",
    cover: "https://lh3.googleusercontent.com/d/1zMVQs8OS3gYlRQv_kDFGhObWUx1lN2NU",
    tag: "Inspiration & Courage",
  },
  {
    id: 4,
    title: "Us Against You (Beartown 2)",
    author: "Fredrik Backman",
    desc: "A thrilling sequel about friendship, forgiveness, and rising above wounds.",
    cover: "https://lh3.googleusercontent.com/d/18Squij2TpUtVwUi02WXuCmkOsGVhABr-",
    tag: "Friendship & Hope",
  },
  {
    id: 5,
    title: "The Greatest Secret",
    author: "Rhonda Byrne",
    desc: "Discover the power of the law of attraction, positive mindset, and manifesting your brightest dreams.",
    cover: "https://lh3.googleusercontent.com/d/15JUEX7Ybc70L4t_HkuXzS4O07GRDXxv2",
    tag: "Mindset & Aspiration",
  },
  {
    id: 6,
    title: "The Greatest Secret (Special Edition)",
    author: "Rhonda Byrne",
    desc: "Invaluable wisdom for inner peace and radiating positive energy every single day.",
    cover: "https://lh3.googleusercontent.com/d/1H4h9NwmXLJODmw_r6GhC8IGQM8zwl87L",
    tag: "Wisdom & Soul",
  },
  {
    id: 7,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    desc: "A Nobel Prize-winning masterpiece about resilience, family, and humanity's eternal hope.",
    cover: "https://lh3.googleusercontent.com/d/1w44Hxr4NHh1cgF_4nVDTyVZVUQFNF5fB",
    tag: "World Masterpiece",
  },
  {
    id: 8,
    title: "Under Yellow Skin",
    author: "Contemporary Literature",
    desc: "Profound and humanistic perspectives on human identity, culture, and deep mutual understanding.",
    cover: "https://lh3.googleusercontent.com/d/1893BlV5eGkx-fbcO0Ur_NLwj_iU1B-Ot",
    tag: "Literature & Philosophy",
  },
  {
    id: 9,
    title: "Demons",
    author: "Fyodor Dostoevsky",
    desc: "A timeless psychological epic exploring human nature, truth, and noble ideals.",
    cover: "https://lh3.googleusercontent.com/d/12nP9mU2NIQ2lf8K63LeZIGxVaGiFlrcx",
    tag: "Classic Literature",
  },
  {
    id: 10,
    title: "Anxious People",
    author: "Fredrik Backman",
    desc: "A hilarious yet deeply touching story bringing strangers' hearts closer together.",
    cover: "https://lh3.googleusercontent.com/d/1R67pWDj8f9OLuMMHAG4zE3mAu2lNzGXd",
    tag: "Humor & Romance",
  },
  {
    id: 11,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    desc: "A journey of conscience awakening, redemption, and gentle love saving the human soul.",
    cover: "https://lh3.googleusercontent.com/d/1d_zLKaHnsOulPrn3nXbQmbQ7mKzwlQoZ",
    tag: "Immortal Masterpiece",
  },
];

const luckyGifts = [
  "🌸 Gift Card 1: A cozy cafe & photo session date fully covered by Tan!",
  "🍰 Gift Card 2: A delicious dinner + surprise birthday cake sponsored by Tan!",
  "📚 Gift Card 3: Tan will buy and gift Khanh Doan the exact book won on the wheel today!",
  "🎬 Gift Card 4: A sweet movie night at the cinema with premium seats!",
  "🎁 Gift Card 5: Any small wish from Khanh Doan will be granted by Tan this week!",
  "🧸 Gift Card 6: A lovely souvenir that Khanh Doan loves the most!",
];

export default function StandaloneWishlistGamePage() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [giftResult, setGiftResult] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toast, setToast] = useState<{ title: string; message: string; icon: string } | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const rouletteTrackRef = useRef<HTMLDivElement>(null);
  const rouletteContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const showToastMsg = (title: string, message: string, icon = "🎉") => {
    setToast({ title, message, icon });
    setTimeout(() => setToast(null), 3500);
  };

  const fireConfetti = () => {
    if (typeof window !== "undefined" && (window as any).confetti) {
      (window as any).confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const playMelody = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const notes = [
        { note: 261.63, duration: 0.3 },
        { note: 261.63, duration: 0.3 },
        { note: 293.66, duration: 0.5 },
        { note: 261.63, duration: 0.5 },
        { note: 349.23, duration: 0.5 },
        { note: 329.63, duration: 0.8 },
      ];

      let delay = 0;
      notes.forEach(({ note, duration }) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(note, ctx.currentTime);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + duration);
        }, delay * 1000);
        delay += duration;
      });
    } catch (e) {
      console.log("Audio error", e);
    }
  };

  const toggleMusic = () => {
    setIsPlayingMusic(!isPlayingMusic);
    if (!isPlayingMusic) {
      playMelody();
      showToastMsg("Music Activated", "Playing romantic melody!", "🎵");
    } else {
      showToastMsg("Music Muted", "Background music paused.", "🔇");
    }
  };

  // Spin Casino CS:GO Style Horizontal Roulette
  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedBook(null);

    const randomIndex = Math.floor(Math.random() * booksList.length);
    const winningBook = booksList[randomIndex];
    const targetIndex = booksList.length * 4 + randomIndex;

    if (rouletteTrackRef.current) {
      const containerWidth = rouletteContainerRef.current?.offsetWidth || 800;
      const cardStep = 160;
      const cardCenterOffset = 72;
      const targetX = targetIndex * cardStep + cardCenterOffset - containerWidth / 2;

      rouletteTrackRef.current.style.transition = "none";
      rouletteTrackRef.current.style.transform = "translateX(0px)";
      void rouletteTrackRef.current.offsetHeight;

      requestAnimationFrame(() => {
        if (rouletteTrackRef.current) {
          rouletteTrackRef.current.style.transition = "transform 5.2s cubic-bezier(0.08, 0.94, 0.12, 1)";
          rouletteTrackRef.current.style.transform = `translateX(-${targetX}px)`;
        }
      });
    }

    const sendResultToBackend = async (book: Book) => {
      try {
        const rawUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");
        const endpoint = rawUrl.endsWith("/api/v1")
          ? `${rawUrl}/game/result`
          : `${rawUrl}/api/v1/game/result`;

        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            book_id: book.id,
            book_title: book.title,
            author: book.author,
            desc: book.desc,
            tag: book.tag,
            player_name: "Khánh Đoan",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn("Backend result sync error:", err);
      }
    };

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedBook(winningBook);
      setIsBookModalOpen(true);
      fireConfetti();
      showToastMsg("Roulette Winner", `Tan will gift Khanh Doan: ${winningBook.title}!`, "📚");
      sendResultToBackend(winningBook);
    }, 5400);
  };

  const drawLuckyGift = () => {
    const randomGift = luckyGifts[Math.floor(Math.random() * luckyGifts.length)];
    setGiftResult(randomGift);
    fireConfetti();
    showToastMsg("Surprise Gift Box", "Doan picked a lucky gift card from Tan!", "🎁");
  };

  const copyShareLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/game`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      showToastMsg("Link Copied", "Private share link copied to clipboard!", "🔗");
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Floating Sparkles Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.8 + 0.2),
      opacity: Math.random() * 0.7 + 0.3,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y < 0) p.y = height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 113, 133, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#FFF0F5] via-[#FFE5EC] to-[#FFCCD5] text-stone-800 font-sans min-h-screen overflow-x-hidden relative selection:bg-rose-500 selection:text-white p-4 sm:p-8 flex flex-col items-center">
      {/* Sparkles Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-white/95 backdrop-blur-md border border-rose-200 shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-in slide-in-from-top duration-300 max-w-sm">
          <span className="text-2xl p-2 bg-rose-100 rounded-xl">{toast.icon}</span>
          <div>
            <h4 className="font-bold text-xs text-stone-900">{toast.title}</h4>
            <p className="text-xs text-stone-600 mt-0.5">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Top Navbar Header */}
      <header className="w-full max-w-5xl z-20 flex items-center justify-between py-3 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMusic}
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-rose-600 border border-rose-200 shadow-sm transition-all cursor-pointer"
            title={isPlayingMusic ? "Mute Sound Effect" : "Play Sound Effect"}
          >
            {isPlayingMusic ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={copyShareLink}
            className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? "Link Copied!" : "Share Game"}</span>
          </button>
        </div>
      </header>

      {/* Hero Title Section */}
      <div className="text-center z-10 max-w-3xl mb-8">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <Dices className="w-4 h-4 text-rose-600" /> Exclusive Mini Game • Sept 25
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 leading-tight">
          Lucky Book Roulette <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600"></span>
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed max-w-xl mx-auto">
          Specially dedicated to <strong>Đặng Nguyễn Khánh Đoan</strong>! Spin the book conveyor belt to discover which literary gift Tan will deliver directly to your hands!
        </p>
      </div>

      {/* Taylor Swift Background Music Component */}
      <TaylorSwiftPlayer />

      {/* ROULETTE WHEEL SECTION */}
      <section className="w-full max-w-5xl z-10 mb-12">
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-rose-200/80 relative overflow-hidden">
          
          {/* Horizontal Roulette Container */}
          <div ref={rouletteContainerRef} className="relative w-full rounded-2xl bg-slate-950 p-4 sm:p-6 shadow-2xl border-2 border-rose-300/60 overflow-hidden">
            
            {/* Center Winning Marker Indicator */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center justify-between">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.8)]"></div>
              <div className="w-1 h-full bg-gradient-to-b from-amber-400 via-rose-500 to-amber-400 shadow-[0_0_15px_#fb7185]"></div>
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-amber-400 filter drop-shadow-[0_-2px_8px_rgba(251,191,36,0.8)]"></div>
            </div>

            {/* Reel Window */}
            <div className="w-full overflow-hidden py-4">
              <div
                ref={rouletteTrackRef}
                className="flex gap-4 items-center will-change-transform"
                style={{ transform: "translateX(0px)" }}
              >
                {Array(6).fill(booksList).flat().map((book, idx) => {
                  const isWinnerCard = !isSpinning && selectedBook?.id === book.id && idx >= booksList.length * 4 && idx < booksList.length * 5;
                  return (
                    <div
                      key={`${book.id}-${idx}`}
                      className={`w-36 h-52 bg-slate-900 rounded-xl border p-2 shrink-0 flex flex-col justify-between shadow-lg relative group transition-all duration-300 ${
                        isWinnerCard
                          ? "border-amber-400 shadow-[0_0_25px_#fbbf24] scale-105"
                          : "border-slate-800 opacity-90"
                      }`}
                    >
                      <div className="relative w-full h-36 rounded-lg overflow-hidden border border-slate-800">
                        <Image src={book.cover} alt={book.title} fill unoptimized className="object-cover" />
                      </div>
                      <div className="text-center pt-1">
                        <h4 className="text-[11px] font-bold text-white truncate">{book.title}</h4>
                        <p className="text-[9px] text-slate-400 truncate">{book.author}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={spinRoulette}
              disabled={isSpinning}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-bold text-sm sm:text-base shadow-2xl hover:shadow-rose-400/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50 cursor-pointer"
            >
              <span className="text-2xl">🎰</span>
              <span>{isSpinning ? "SPINNING BOOK REEL..." : "SPIN THE LUCKY REEL NOW"}</span>
            </button>
          </div>

          {/* Result Display */}
          {selectedBook && (
            <div className="mt-8 p-5 rounded-2xl bg-white border border-rose-200 shadow-md max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-5 animate-in fade-in duration-500">
              <div className="relative w-28 h-40 rounded-xl shadow-lg overflow-hidden border border-rose-200 shrink-0">
                <Image src={selectedBook.cover} alt={selectedBook.title} fill unoptimized className="object-cover" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full inline-block mb-1">
                  🎉 Tan Will Gift This Book To Doan!
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900">{selectedBook.title}</h3>
                <p className="text-xs text-rose-600 font-medium">{selectedBook.author}</p>
                <p className="text-xs text-stone-600 mt-2 italic leading-relaxed">{selectedBook.desc}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-stone-500 text-xs space-y-1 font-mono z-10 mt-auto pb-4">
        <p>Wishlist Mini Game specially created for <strong>Khanh Doan Dang Nguyen</strong> 🎂</p>
        <p className="text-rose-600 font-medium">Phuc Tan Nguyen • Sept 25</p>
      </footer>

      {/* BOOK WINNER MODAL */}
      {isBookModalOpen && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 text-center">
            <button
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>

            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase mb-3 inline-block font-mono">
              🎉 Special Birthday Book Gift!
            </span>

            <div className="relative w-36 h-48 mx-auto rounded-xl shadow-xl overflow-hidden mb-4 border-2 border-white">
              <Image src={selectedBook.cover} alt={selectedBook.title} fill unoptimized className="object-cover" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
              {selectedBook.title}
            </h3>
            <p className="text-rose-600 font-medium text-xs sm:text-sm mt-1">{selectedBook.author}</p>
            <div className="w-12 h-1 bg-rose-300 rounded-full my-3 mx-auto"></div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5">{selectedBook.desc}</p>

            <div className="p-3 bg-rose-50 rounded-2xl w-full border border-rose-100 text-left flex items-start gap-2 mb-5">
              <span className="text-xl">💌</span>
              <p className="text-xs text-rose-800 font-medium">
                <strong>Note from Tan:</strong> &quot;Get a spot ready on your bookshelf, Doan! This book will soon be delivered to your hands!&quot;
              </p>
            </div>

            <button
              onClick={() => setIsBookModalOpen(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              Awesome! I Love This Gift 🥰
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
