"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { TaylorSwiftPlayer } from "@/components/taylor-swift-player";

interface Book {
  id: number;
  title: string;
  author: string;
  desc: string;
  cover: string;
  tag: string;
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: "Anh Em Nhà Karamazov",
    author: "Fyodor Dostoevsky",
    desc: "Kiệt tác văn học kinh điển vĩ đại về tự do, đức tin, đạo đức và tình yêu thương gia đình sâu sắc.",
    cover: "https://lh3.googleusercontent.com/d/1ztRjZI_Ik68DPFBupMJVkzpKwDkWHuks",
    tag: "Văn học kinh điển",
  },
  {
    id: 2,
    title: "Bà Ngoại Tôi Gửi Lời Xin Lỗi",
    author: "Fredrik Backman",
    desc: "Câu chuyện ấm áp, xúc động về tình bà cháu, sự chấp nhận và lòng trắc ẩn kỳ diệu dành cho Khánh Đoan.",
    cover: "https://lh3.googleusercontent.com/d/1vwrFEmE_YHu9aXS8hcdNkv624zsXmyJY",
    tag: "Chữa lành & Tình cảm",
  },
  {
    id: 3,
    title: "Beartown (Thị Trấn Beartown)",
    author: "Fredrik Backman",
    desc: "Hành trình đối mặt với thử thách, niềm tin và sự đoàn kết mạnh mẽ của những con người ở thị trấn nhỏ.",
    cover: "https://lh3.googleusercontent.com/d/1zMVQs8OS3gYlRQv_kDFGhObWUx1lN2NU",
    tag: "Cảm hứng & Nghị lực",
  },
  {
    id: 4,
    title: "Us Against You (Beartown 2)",
    author: "Fredrik Backman",
    desc: "Phần tiếp theo đầy kịch tính về tình bạn, sự bao dung và hành trình đứng dậy sau những tổn thương.",
    cover: "https://lh3.googleusercontent.com/d/18Squij2TpUtVwUi02WXuCmkOsGVhABr-",
    tag: "Tình bạn & Hy vọng",
  },
  {
    id: 5,
    title: "Bí Mật Tối Thượng",
    author: "Rhonda Byrne",
    desc: "Khám phá sức mạnh của luật hấp dẫn, tư duy tích cực và hiện thực hóa những ước mơ rực rỡ nhất.",
    cover: "https://lh3.googleusercontent.com/d/15JUEX7Ybc70L4t_HkuXzS4O07GRDXxv2",
    tag: "Tư duy & Khát vọng",
  },
  {
    id: 6,
    title: "Bí Mật Tối Thượng (Bản Đặc Biệt)",
    author: "Rhonda Byrne",
    desc: "Những bài học giá trị giúp duy trì sự bình an nội tâm và tỏa sáng năng lượng tích cực mỗi ngày.",
    cover: "https://lh3.googleusercontent.com/d/1H4h9NwmXLJODmw_r6GhC8IGQM8zwl87L",
    tag: "Trí tuệ & Tâm hồn",
  },
  {
    id: 7,
    title: "Chùm Nho Thịnh Nộ",
    author: "John Steinbeck",
    desc: "Tác phẩm đoạt giải Nobel về lòng kiên cường, tình thân và khát vọng sống bất diệt của con người.",
    cover: "https://lh3.googleusercontent.com/d/1w44Hxr4NHh1cgF_4nVDTyVZVUQFNF5fB",
    tag: "Kiệt tác thế giới",
  },
  {
    id: 8,
    title: "Đội Lốt Da Vàng",
    author: "Văn Học Đương Đại",
    desc: "Những góc nhìn sâu sắc, nhân văn về bản sắc con người, văn hóa và sự thấu hiểu sâu sắc.",
    cover: "https://lh3.googleusercontent.com/d/1893BlV5eGkx-fbcO0Ur_NLwj_iU1B-Ot",
    tag: "Văn học & Triết lý",
  },
  {
    id: 9,
    title: "Lũ Người Quỷ Ám",
    author: "Fyodor Dostoevsky",
    desc: "Tác phẩm mang chiều sâu tâm lý vượt thời gian về con người và lý tưởng sống chân thiện mỹ.",
    cover: "https://lh3.googleusercontent.com/d/12nP9mU2NIQ2lf8K63LeZIGxVaGiFlrcx",
    tag: "Văn học kinh điển",
  },
  {
    id: 10,
    title: "Những Kẻ Âu Lo",
    author: "Fredrik Backman",
    desc: "Câu chuyện hài hước nhưng vô cùng ngọt ngào, gắn kết những trái tim xa lạ lại gần nhau hơn.",
    cover: "https://lh3.googleusercontent.com/d/1R67pWDj8f9OLuMMHAG4zE3mAu2lNzGXd",
    tag: "Hài hước & Ngọt ngào",
  },
  {
    id: 11,
    title: "Tội Ác Và Hình Phạt",
    author: "Fyodor Dostoevsky",
    desc: "Hành trình thức tỉnh lương tâm, sự chuộc lỗi và tình yêu thương dịu dàng giúp cứu rỗi tâm hồn.",
    cover: "https://lh3.googleusercontent.com/d/1d_zLKaHnsOulPrn3nXbQmbQ7mKzwlQoZ",
    tag: "Kiệt tác bất tử",
  },
];

const luckyGifts = [
  "🌸 Thẻ Quà 1: Một chuyến đi cafe & chụp ảnh sống ảo cháy máy cùng Tân!",
  "🍰 Thẻ Quà 2: Một bữa ăn ngon lành + bánh sinh nhật bất ngờ do Tân bao trọn gói!",
  "📚 Thẻ Quà 3: Tân sẽ mua tặng Đoan đúng cuốn sách em quay trúng hôm nay!",
  "🎬 Thẻ Quà 4: Một buổi xem phim rạp ngọt ngào với hàng ghế đẹp nhất!",
  "🎁 Thẻ Quà 5: Mọi ước nguyện nhỏ của Khánh Đoan sẽ được Tân thực hiện trong tuần này!",
  "🧸 Thẻ Quà 6: Một món quà lưu niệm xinh xắn mà Đoan yêu thích nhất!",
];

// Google Drive URL Converter Helper
function convertDriveUrlToDirectLink(url: string): string {
  if (!url) return url;
  const trimmed = url.trim();
  const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return trimmed;
}

export default function BirthdayPage() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [countdown, setCountdown] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [toast, setToast] = useState<{ title: string; message: string; icon: string } | null>(null);
  
  // Photos for Album
  const [photoSlots, setPhotoSlots] = useState<string[]>([
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
  ]);

  // Google Drive Links Modal State
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [driveLinksInput, setDriveLinksInput] = useState<string>("");
  const [isSyncingDrive, setIsSyncingDrive] = useState(false);

  // Auto fetch Google Drive photos when returning from OAuth callback
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("google_auth") === "success") {
        showToastMsg("Đăng Nhập Thành Công", "Đã kết nối Google Drive! Đang nạp ảnh từ Min_Birthday_2026...", "🎉");
        fetchDrivePhotosFromBackend();
      }
    }
  }, []);

  const fetchDrivePhotosFromBackend = async () => {
    setIsSyncingDrive(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/drive/birthday-photos");
      const data = await res.json();

      if (res.status === 401 || data.status === "unauthenticated") {
        if (data.auth_url) {
          showToastMsg("Cần Đăng Nhập Google", "Chuyển hướng đến trang cấp quyền Google Drive...", "🔑");
          window.location.href = data.auth_url;
        } else {
          const loginRes = await fetch("http://localhost:8000/auth/google/login");
          const loginData = await loginRes.json();
          if (loginData.auth_url) {
            window.location.href = loginData.auth_url;
          }
        }
        return;
      }

      if (data.photos && data.photos.length > 0) {
        const directUrls = data.photos.map((p: any) => p.direct_url);
        const updated = [...photoSlots];
        directUrls.forEach((url: string, i: number) => {
          if (i < 6) updated[i] = url;
        });
        savePhotos(updated);

        setBooks((prev) =>
          prev.map((b, i) => (data.photos[i] ? { ...b, cover: data.photos[i].direct_url } : b))
        );

        fireConfetti();
        showToastMsg("Đồng Bộ Google Drive", `Đã tải ${data.photos.length} ảnh từ folder Min_Birthday_2026!`, "✨");
      } else {
        showToastMsg("Google Drive", "Chưa tìm thấy ảnh nào trong folder Min_Birthday_2026", "📁");
      }
    } catch (err) {
      console.error("Drive sync error", err);
      showToastMsg("Thủ Công / Tự Động", "Mở modal dán link Drive hoặc bấm kết nối Google Drive Backend", "💡");
    } finally {
      setIsSyncingDrive(false);
    }
  };

  // Book Roulette State
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [giftResult, setGiftResult] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const rouletteTrackRef = useRef<HTMLDivElement>(null);
  const rouletteContainerRef = useRef<HTMLDivElement>(null);
  const activePhotoIndexForUpload = useRef<number | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Sparkles Background Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load photos from localStorage if available
  useEffect(() => {
    try {
      const savedPhotos = localStorage.getItem("khanhdoan_album_photos");
      if (savedPhotos) {
        const parsed = JSON.parse(savedPhotos);
        if (Array.isArray(parsed) && parsed.length === 6) {
          setPhotoSlots(parsed);
        }
      }
    } catch (e) {
      console.log("Error loading saved photos", e);
    }
  }, []);

  // Save photos to localStorage whenever updated
  const savePhotos = (updatedPhotos: string[]) => {
    setPhotoSlots(updatedPhotos);
    try {
      localStorage.setItem("khanhdoan_album_photos", JSON.stringify(updatedPhotos));
    } catch (e) {
      console.log("Error saving photos", e);
    }
  };

  // Toast Trigger Helper
  const showToastMsg = (title: string, message: string, icon = "🎉") => {
    setToast({ title, message, icon });
    setTimeout(() => setToast(null), 3500);
  };

  // Launch Confetti Fireworks
  const fireConfetti = () => {
    if (typeof window !== "undefined" && (window as any).confetti) {
      (window as any).confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      return;
    }
    const colors = ["#FB6F92", "#FF85A1", "#FFB3C6", "#F3C68F", "#FFDF00"];
    for (let i = 0; i < 50; i++) {
      const el = document.createElement("div");
      el.style.position = "fixed";
      el.style.zIndex = "9999";
      el.style.width = `${Math.random() * 8 + 6}px`;
      el.style.height = `${Math.random() * 8 + 6}px`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.left = `${Math.random() * 80 + 10}vw`;
      el.style.top = "60vh";
      el.style.borderRadius = "50%";
      el.style.pointerEvents = "none";
      el.style.transition = "all 1.5s cubic-bezier(0.25, 1, 0.5, 1)";
      document.body.appendChild(el);

      setTimeout(() => {
        el.style.transform = `translate(${Math.random() * 300 - 150}px, -${Math.random() * 400 + 100}px) rotate(${Math.random() * 720}deg)`;
        el.style.opacity = "0";
      }, 20);

      setTimeout(() => {
        if (document.body.contains(el)) {
          document.body.removeChild(el);
        }
      }, 1600);
    }
  };

  // Audio Playback Melody
  const playBirthdayAudioMelody = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const notes = [
        { note: 261.63, duration: 0.3 }, // C4
        { note: 261.63, duration: 0.3 }, // C4
        { note: 293.66, duration: 0.5 }, // D4
        { note: 261.63, duration: 0.5 }, // C4
        { note: 349.23, duration: 0.5 }, // F4
        { note: 329.63, duration: 0.8 }, // E4

        { note: 261.63, duration: 0.3 }, // C4
        { note: 261.63, duration: 0.3 }, // C4
        { note: 293.66, duration: 0.5 }, // D4
        { note: 261.63, duration: 0.5 }, // C4
        { note: 392.00, duration: 0.5 }, // G4
        { note: 349.23, duration: 0.8 }, // F4
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
      console.log("Audio play error", e);
    }
  };

  const toggleMusic = () => {
    setIsPlayingMusic(!isPlayingMusic);
    if (!isPlayingMusic) {
      playBirthdayAudioMelody();
      showToastMsg("Bật Nhạc Sinh Nhật", "Âm nhạc giai điệu Happy Birthday đang ngân vang!", "🎵");
    } else {
      showToastMsg("Tắt Nhạc", "Đã tạm dừng âm nhạc.", "🔇");
    }
  };

  // Blow Candles Action
  const blowCandles = () => {
    setCandlesBlown(true);
    fireConfetti();
    playBirthdayAudioMelody();
    showToastMsg("Chúc Mừng Sinh Nhật!", "Khánh Đoan đã thổi nến! Điều ước đã được gửi tới vũ trụ ✨", "🎂");
  };

  const relightCandles = () => {
    setCandlesBlown(false);
    showToastMsg("Thắp Nến", "Đã thắp lại ngọn nến lung linh cho Khánh Đoan!", "🕯️");
  };

  // Photo Upload Handler
  const triggerPhotoUpload = (index: number) => {
    activePhotoIndexForUpload.current = index;
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const handlePhotoUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activePhotoIndexForUpload.current !== null) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newUrl = event.target.result as string;
          const idx = activePhotoIndexForUpload.current!;
          const updated = [...photoSlots];
          updated[idx] = newUrl;
          savePhotos(updated);
          showToastMsg("Cập Nhật Ảnh", `Đã tải ảnh kỷ niệm mới của Đoan vào khung số ${idx + 1}!`, "📷");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Google Drive Links Import Submission
  const handleDriveLinksSubmit = () => {
    if (!driveLinksInput.trim()) return;
    const lines = driveLinksInput
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    const updated = [...photoSlots];
    lines.forEach((line, i) => {
      if (i < 6) {
        updated[i] = convertDriveUrlToDirectLink(line);
      }
    });

    savePhotos(updated);
    setIsDriveModalOpen(false);
    setDriveLinksInput("");
    fireConfetti();
    showToastMsg("Google Drive Import", `Đã tự động tải ${lines.length} ảnh từ Google Drive thành công!`, "☁️");
  };

  // Spin Horizontal Roulette Wheel (Smooth Casino CS:GO Style)
  const spinRoulette = () => {
    if (isSpinning || books.length === 0) return;
    setIsSpinning(true);
    setSelectedBook(null);

    const randomIndex = Math.floor(Math.random() * books.length);
    const winningBook = books[randomIndex];
    
    // Target a card in the 4th cycle (4 * 11 + randomIndex)
    const targetIndex = books.length * 4 + randomIndex;

    if (rouletteTrackRef.current) {
      const containerWidth = rouletteContainerRef.current?.offsetWidth || 800;
      const cardStep = 160; // 144px card width + 16px gap
      const cardCenterOffset = 72; // 144 / 2
      const targetX = targetIndex * cardStep + cardCenterOffset - containerWidth / 2;

      // 1. Instantly reset position to 0 without transition
      rouletteTrackRef.current.style.transition = "none";
      rouletteTrackRef.current.style.transform = "translateX(0px)";

      // Force browser reflow to reset
      void rouletteTrackRef.current.offsetHeight;

      // 2. Animate to target position with ultra-smooth cubic-bezier deceleration
      requestAnimationFrame(() => {
        if (rouletteTrackRef.current) {
          rouletteTrackRef.current.style.transition = "transform 5.2s cubic-bezier(0.08, 0.94, 0.12, 1)";
          rouletteTrackRef.current.style.transform = `translateX(-${targetX}px)`;
        }
      });
    }

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedBook(winningBook);
      setIsBookModalOpen(true);
      fireConfetti();
      showToastMsg("Kết Quả Vòng Quay", `Tân sẽ tặng Khánh Đoan cuốn: ${winningBook.title}!`, "📚");
    }, 5400);
  };

  // Draw Lucky Gift Card
  const drawLuckyGift = () => {
    const randomGift = luckyGifts[Math.floor(Math.random() * luckyGifts.length)];
    setGiftResult(randomGift);
    fireConfetti();
    showToastMsg("Hộp Quà Bất Ngờ", "Đoan đã bốc được một thẻ quà may mắn từ Tân!", "🎁");
  };

  // Live Countdown Timer to Sept 25
  useEffect(() => {
    const targetDate = new Date(new Date().getFullYear(), 8, 25).getTime(); // Sept 25

    const interval = setInterval(() => {
      const now = new Date().getTime();
      let diff = targetDate - now;

      if (diff < 0) {
        const nextYearDate = new Date(new Date().getFullYear() + 1, 8, 25).getTime();
        diff = nextYearDate - now;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days: days < 10 ? `0${days}` : `${days}`,
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sparkles Floating Heart Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
      angle: number;
      swingSpeed: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speed: Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.4 + 0.2,
        color: ["#FB6F92", "#FF85A1", "#FFB3C6", "#F3C68F"][Math.floor(Math.random() * 4)],
        angle: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y -= p.speed;
        p.angle += p.swingSpeed;
        p.x += Math.sin(p.angle) * 0.5;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const topCurveHeight = p.size * 0.3;
        ctx.arc(p.x - p.size / 4, p.y - topCurveHeight, p.size / 4, Math.PI, 0, false);
        ctx.arc(p.x + p.size / 4, p.y - topCurveHeight, p.size / 4, Math.PI, 0, false);
        ctx.lineTo(p.x, p.y + p.size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
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
    <div className="bg-gradient-to-b from-[#FFF0F5] via-[#FFE5EC] to-[#FFCCD5] text-stone-800 font-sans min-h-screen overflow-x-hidden relative selection:bg-rose-500 selection:text-white">
      {/* Sparkles Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />



      {/* Hidden File Input for Photo Album Upload */}
      <input
        type="file"
        ref={photoInputRef}
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUploadChange}
      />

      {/* Toast Alert Box */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-white/95 text-stone-800 px-5 py-3 rounded-2xl shadow-2xl border border-rose-300 flex items-center gap-3 backdrop-blur-md">
            <span className="text-2xl">{toast.icon}</span>
            <div>
              <h5 className="text-xs font-bold uppercase text-rose-600">{toast.title}</h5>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <header className="fixed top-4 right-4 z-40 flex items-center gap-3">
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-all text-sm font-semibold text-rose-700 active:scale-95 border border-white"
        >
          <span className="text-lg">{isPlayingMusic ? "🎵" : "🎶"}</span>
          <span>{isPlayingMusic ? "Tắt nhạc" : "Bật nhạc sinh nhật"}</span>
        </button>
        <button
          onClick={() => {
            fireConfetti();
            showToastMsg("Bắn Pháo Hoa", "Chúc mừng sinh nhật Khánh Đoan Rực Rỡ! 🎉", "💖");
          }}
          className="p-2.5 rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-600 transition-transform active:scale-95 animate-bounce"
          title="Bắn pháo hoa"
        >
          🎉
        </button>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-24 flex flex-col items-center">
        
        {/* Welcome Ribbon Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/75 backdrop-blur-md text-rose-600 font-medium text-xs sm:text-sm tracking-wide mb-6 shadow-sm border border-rose-200">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          Món quà bí mật dành riêng cho em • 25 Tháng 09
        </div>

        {/* Grand Title */}
        <div className="text-center mb-8">
          <p className="font-serif italic text-3xl sm:text-4xl text-rose-500 mb-1">
            Happy Birthday to my lovely girl
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-900 leading-tight">
            Đặng Nguyễn <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500">
              Khánh Đoan
            </span>
          </h1>
          <p className="mt-4 text-stone-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Trang web này được viết riêng dành tặng Khánh Đoan. Chúc em một tuổi mới ngập tràn niềm vui, rực rỡ và luôn hạnh phúc bên những người trân quý em nhất.
          </p>
          <p className="mt-2 text-xs uppercase tracking-widest text-rose-600 font-semibold font-mono">
            — Thiết kế &amp; gửi gắm bởi: Nguyễn Phạm Phúc Tân 💖 —
          </p>
        </div>

        {/* Taylor Swift Studio Music Player */}
        <TaylorSwiftPlayer />

        {/* Birthday Countdown Grid */}
        <div className="w-full max-w-xl bg-white/75 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl mb-14 text-center border border-white/80">
          <h3 className="text-xs uppercase tracking-widest text-rose-600 font-bold mb-4 font-mono">
            Dấu mốc ngày đặc biệt (25/09)
          </h3>
          <div className="grid grid-cols-4 gap-3 text-stone-800">
            <div className="bg-white/90 rounded-2xl p-3 shadow-inner">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-rose-600">
                {countdown.days}
              </span>
              <span className="text-[10px] text-stone-500 uppercase font-bold">Ngày</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-3 shadow-inner">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-rose-600">
                {countdown.hours}
              </span>
              <span className="text-[10px] text-stone-500 uppercase font-bold">Giờ</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-3 shadow-inner">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-rose-600">
                {countdown.minutes}
              </span>
              <span className="text-[10px] text-stone-500 uppercase font-bold">Phút</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-3 shadow-inner">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-rose-600">
                {countdown.seconds}
              </span>
              <span className="text-[10px] text-stone-500 uppercase font-bold">Giây</span>
            </div>
          </div>
          <p className="text-xs text-rose-500 font-medium mt-4">
            ✨ Ngày mà thế giới đón nhận một cô gái tuyệt vời ✨
          </p>
        </div>

        {/* 3-Tier Birthday Cake & Candle Blowing */}
        <section className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl mb-16 border border-rose-100 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-200 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-100 rounded-full blur-3xl opacity-60"></div>

          <span className="text-rose-500 text-xs font-bold uppercase tracking-wider block mb-2 font-mono">
            Điều ước tuổi mới
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 mb-6">
            Thổi Nến &amp; Nhận Điều Ước
          </h2>

          {/* Virtual 3-Tier Cake Illustration */}
          <div className="relative w-64 h-56 mx-auto my-6 flex flex-col items-center justify-end">
            
            {/* Candle 1 (Left) */}
            <div className="absolute top-4 left-20 flex flex-col items-center">
              {!candlesBlown ? (
                <div className="w-3.5 h-6 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b] animate-pulse"></div>
              ) : (
                <div className="text-xs text-stone-400 animate-bounce">💨</div>
              )}
              <div className="w-2.5 h-8 bg-gradient-to-b from-amber-200 to-rose-300 rounded-t-sm shadow-sm"></div>
            </div>

            {/* Center Candle (Main) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
              {!candlesBlown ? (
                <div className="w-4 h-7 rounded-full bg-amber-400 shadow-[0_0_16px_#f59e0b] animate-pulse"></div>
              ) : (
                <div className="text-xs text-stone-400 animate-bounce">💨</div>
              )}
              <div className="w-3 h-11 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-sm shadow-sm border border-rose-300"></div>
            </div>

            {/* Candle 3 (Right) */}
            <div className="absolute top-4 right-20 flex flex-col items-center">
              {!candlesBlown ? (
                <div className="w-3.5 h-6 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b] animate-pulse"></div>
              ) : (
                <div className="text-xs text-stone-400 animate-bounce">💨</div>
              )}
              <div className="w-2.5 h-8 bg-gradient-to-b from-amber-200 to-rose-300 rounded-t-sm shadow-sm"></div>
            </div>

            {/* Cake Layer 1 (Top) */}
            <div className="w-36 h-12 bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 rounded-t-2xl shadow-sm border-t-4 border-white relative z-10 flex items-center justify-center">
              <span className="text-xs text-rose-500 font-serif font-bold">✨ 25/09 ✨</span>
            </div>
            {/* Cake Layer 2 (Middle) */}
            <div className="w-48 h-14 bg-gradient-to-r from-rose-300 via-rose-200 to-rose-300 rounded-t-2xl shadow-md border-t-4 border-white/80 relative z-20 flex justify-around items-center px-4">
              <span className="text-base">🍓</span>
              <span className="text-base">🌸</span>
              <span className="text-base">🍓</span>
            </div>
            {/* Cake Layer 3 (Bottom Base) */}
            <div className="w-60 h-16 bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 rounded-2xl shadow-lg border-t-4 border-rose-200 relative z-30 flex items-center justify-center">
              <span className="font-serif italic text-rose-600 text-lg font-bold">Khánh Đoan</span>
            </div>
            {/* Plate */}
            <div className="w-64 h-3 bg-stone-300/80 rounded-full shadow-md mt-1"></div>
          </div>

          <p className="text-stone-600 text-xs sm:text-sm mb-5 italic">
            &quot;Hãy nhắm mắt lại, nghĩ về 1 điều ước chân thành nhất rồi ấn nút thổi nến nhé!&quot;
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {!candlesBlown ? (
              <button
                onClick={blowCandles}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold shadow-lg hover:shadow-rose-300/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-sm"
              >
                <span>💨</span>
                <span>Thổi Nến Ngay</span>
              </button>
            ) : (
              <button
                onClick={relightCandles}
                className="px-5 py-3 rounded-full border border-rose-300 text-rose-600 font-bold hover:bg-rose-50 active:scale-95 transition-all text-xs flex items-center gap-2"
              >
                <span>✨</span>
                <span>Thắp Lại Nến</span>
              </button>
            )}
          </div>

          {candlesBlown && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium animate-in fade-in duration-500">
              🎉 <strong>Ước nguyện đã được gửi tới vũ trụ!</strong> Chúc Khánh Đoan một năm mới thật nhiều may mắn, xinh đẹp, công việc hanh thông và luôn hạnh phúc trọn vẹn!
            </div>
          )}
        </section>

        {/* Secret Letter Section */}
        <section className="w-full max-w-3xl mb-16">
          <div className="text-center mb-8">
            <span className="text-rose-500 text-xs font-mono font-bold uppercase tracking-wider">
              Bức Thư Bí Mật
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-800 mt-1">
              Lời Chúc Tân Dành Riêng Cho Đoan
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border border-white relative overflow-hidden">
            <div className="absolute top-4 right-4 text-7xl opacity-10 select-none pointer-events-none">💌</div>

            <div className="space-y-4 text-stone-700 leading-relaxed sm:text-base">
              <p className="font-serif italic text-2xl text-rose-600 font-bold">
                Gửi Khánh Đoan thân mến,
              </p>
              
              <p>
                Ngày <strong>25 tháng 9</strong> là một ngày thật đẹp và đặc biệt — ngày mà cuộc đời này chào đón một cô gái vừa dịu dàng, đáng yêu, vừa thông minh và luôn mang nguồn năng lượng ấm áp như em.
              </p>
              <p>
                Tân tạo ra trang web nhỏ này như một không gian riêng tư chỉ dành cho Đoan, để lưu giữ những nụ cười và chúc em bước sang tuổi mới với trọn vẹn những điều tuyệt vời nhất:
              </p>
              <ul className="space-y-3 pl-4 border-l-2 border-rose-400 my-4 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 text-lg">🌷</span>
                  <span><strong>Nụ cười luôn toả nắng:</strong> Mong em mỗi ngày thức dậy đều có thật nhiều lý do để mỉm cười và luôn cảm thấy bình yên trong lòng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 text-lg">✨</span>
                  <span><strong>Mọi ước vọng thành toàn:</strong> Những ước mơ, mục tiêu hay kế hoạch mà Đoan đang ấp ủ đều sẽ đạt được kết quả ngọt ngào nhất.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 text-lg">💖</span>
                  <span><strong>Luôn được yêu thương:</strong> Mong Đoan luôn được chở che, thấu hiểu và hạnh phúc ngập tràn mỗi phút giây.</span>
                </li>
              </ul>
              <p>
                Cảm ơn Khánh Đoan vì đã luôn là chính em — một người đặc biệt và quý giá. Dù ở bất cứ chặng đường nào, chúc em luôn tự tin và toả sáng theo cách riêng của mình nhé!
              </p>
              <div className="pt-6 text-right">
                <p className="font-serif italic text-xl text-stone-600">Thương chúc sinh nhật em,</p>
                <p className="font-serif italic text-2xl text-rose-600 font-bold mt-1">Nguyễn Phạm Phúc Tân</p>
                <p className="text-xs text-stone-400 tracking-wider font-mono mt-1">25.09 • Happy Birthday Khánh Đoan</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Photo Album Section with Google Drive Direct Link Support */}
        <section className="w-full max-w-5xl mb-16">
          <div className="text-center mb-8">
            <span className="text-rose-500 text-xs font-mono font-bold uppercase tracking-wider">
              Album Kỷ Niệm Của Đoan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800">
              Khoảnh Khắc Xinh Đẹp Nhất
            </h2>
            <p className="text-xs text-stone-500 mt-2 max-w-md mx-auto">
              Bạn có thể <strong>bấm trực tiếp vào từng khung ảnh</strong> để chọn ảnh từ máy, hoặc <strong>dán link Google Drive</strong> bên dưới để tự động tải ảnh về hiển thị nhé!
            </p>

            {/* Google Drive Link Importer Button */}
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => setIsDriveModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-rose-700 font-bold text-xs sm:text-sm border border-rose-300 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>☁️</span>
                <span>Dán Link Google Drive Ảnh Khánh Đoan</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {[
              { title: "Nụ cười toả nắng ☀️", sub: "Khoảnh khắc rạng rỡ nhất", rotate: "-rotate-2" },
              { title: "Dịu dàng & Đáng yêu 🌸", sub: "Cô gái mang hương mùa thu", rotate: "rotate-2" },
              { title: "Toả sáng tuổi mới ✨", sub: "Chúc em chạm tới mọi giấc mơ", rotate: "-rotate-1" },
              { title: "Những ngày bình yên 🌿", sub: "Bình yên trên từng nẻo đường", rotate: "rotate-1" },
              { title: "Thanh xuân tuyệt đẹp 💐", sub: "Luôn là đoá hoa rạng ngời", rotate: "-rotate-2" },
              { title: "Happy 25.09! 🎂", sub: "Tân chúc Đoan vạn sự như ý", rotate: "rotate-2" },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`bg-white p-4 pb-6 rounded-2xl shadow-xl transform ${card.rotate} hover:rotate-0 hover:scale-[1.02] transition-all duration-300 border border-rose-100 flex flex-col items-center group`}
              >
                <div
                  className="relative w-full h-72 rounded-xl overflow-hidden bg-rose-50 border border-dashed border-rose-300 flex items-center justify-center cursor-pointer shadow-inner"
                  onClick={() => triggerPhotoUpload(idx)}
                >
                  <Image
                    src={photoSlots[idx]}
                    alt={`Khánh Đoan ${idx + 1}`}
                    fill
                    unoptimized
                    className="object-cover rounded-xl transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 backdrop-blur-xs">
                    <span className="text-2xl">📷</span>
                    <span className="text-xs font-semibold uppercase tracking-wider bg-rose-600/80 px-3 py-1 rounded-full">
                      Bấm đổi ảnh / Drive
                    </span>
                  </div>
                </div>
                <p className="mt-4 font-serif italic text-xl text-stone-800 font-bold">{card.title}</p>
                <span className="text-xs text-rose-400 font-medium">{card.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reasons Why Khanh Doan is Special */}
        <section className="w-full max-w-3xl mb-16">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border border-white">
            <div className="text-center mb-8">
              <span className="text-rose-500 text-xs font-mono font-bold uppercase tracking-wider">
                Từ góc nhìn của Tân
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 mt-1">
                Những Điều Tân Trân Quý Ở Đoan
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "💖",
                  title: "Sự dịu dàng và ấm áp",
                  desc: "Cách em lắng nghe và luôn quan tâm tinh tế đến mọi người xung quanh khiến ai cũng thấy dễ chịu.",
                },
                {
                  icon: "🌟",
                  title: "Nỗ lực và kiên định",
                  desc: "Sự chăm chỉ và tinh thần nhiệt huyết của Đoan trong mọi việc luôn làm Tân cảm phục.",
                },
                {
                  icon: "😊",
                  title: "Nụ cười xua tan âu lo",
                  desc: "Mỗi khi Khánh Đoan cười, không gian xung quanh dường như sáng bừng lên niềm vui.",
                },
                {
                  icon: "🍀",
                  title: "Sự chân thành thuần khiết",
                  desc: "Một tâm hồn trong sáng, chân thật và luôn xứng đáng được nhận lại những gì tốt đẹp nhất.",
                },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/80 border border-rose-100 flex items-start gap-3 shadow-sm">
                  <span className="text-2xl p-2 rounded-xl bg-rose-100 text-rose-600">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-stone-800 text-xs sm:text-sm">{item.title}</h4>
                    <p className="text-xs text-stone-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOOK LUCKY HORIZONTAL ROULETTE SECTION */}
        <section id="bookSpinSection" className="w-full max-w-5xl mb-16 relative">
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-rose-200/80 relative overflow-hidden">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                🎁 Wishlist Sách Của Khánh Đoan
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                Vòng Quay Ngang: <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-amber-600">Tân Tặng Sách Cho Đoan</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl mx-auto">
                Băng chuyền sẽ lướt qua từng cuốn sách trong danh sách của Đoan. Nhấn quay và xem cuốn sách nào sẽ dừng lại ngay vạch tâm điểm nhé! 📚✨
              </p>
            </div>

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
                  {Array(6).fill(books).flat().map((book, idx) => {
                    const isWinnerCard = !isSpinning && selectedBook?.id === book.id && idx >= books.length * 4 && idx < books.length * 5;
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
                <span>{isSpinning ? "ĐANG QUAY BĂNG CHUYỀN..." : "QUAY VÒNG QUAY MAY MẮN NGAY"}</span>
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
                    🎉 Tân Sẽ Tặng Cuốn Này Cho Đoan!
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900">{selectedBook.title}</h3>
                  <p className="text-xs text-rose-600 font-medium">{selectedBook.author}</p>
                  <p className="text-xs text-stone-600 mt-2 italic leading-relaxed">{selectedBook.desc}</p>
                </div>
              </div>
            )}
          </div>
        </section>



        <footer className="text-center text-stone-500 text-xs sm:text-sm space-y-2 mt-4 font-mono">
          <p>Trang web riêng tư dành tặng cho <strong>Đặng Nguyễn Khánh Đoan</strong> 🎂</p>
          <p className="text-rose-600 font-medium">
            Gửi gắm trọn vẹn yêu thương từ Nguyễn Phạm Phúc Tân • 25.09
          </p>
        </footer>
      </main>

      {/* GOOGLE DRIVE LINK IMPORTER MODAL */}
      {isDriveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-800 flex items-center gap-2">
                  <span>☁️</span> Dán Link Google Drive Ảnh Đoan
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Dán các link Google Drive (mỗi link 1 dòng, tối đa 6 link)
                </p>
              </div>
              <button
                onClick={() => setIsDriveModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl">
                <button
                  onClick={fetchDrivePhotosFromBackend}
                  disabled={isSyncingDrive}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow active:scale-95 disabled:opacity-50"
                >
                  <span>{isSyncingDrive ? "⏳" : "⚡"}</span>
                  <span>{isSyncingDrive ? "Đang kết nối Google Drive..." : "Tự động nạp ảnh từ Folder Min_Birthday_2026 (Google Drive API)"}</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center my-2">
                <span className="bg-white px-2 text-[10px] text-stone-400 font-bold uppercase">Hoặc Dán Link Thủ Công</span>
                <div className="absolute inset-0 -z-10 flex items-center"><div className="w-full border-t border-stone-200"></div></div>
              </div>

              <label className="block text-xs font-bold text-stone-700">
                Nhập / Dán Link Chia Sẻ Google Drive:
              </label>
              <textarea
                rows={4}
                value={driveLinksInput}
                onChange={(e) => setDriveLinksInput(e.target.value)}
                placeholder={`Ví dụ:\nhttps://drive.google.com/file/d/1ABCXYZ.../view?usp=sharing\nhttps://drive.google.com/file/d/2DEFUVW.../view?usp=sharing`}
                className="w-full p-3 rounded-2xl border border-rose-200 text-xs font-mono bg-slate-50 focus:outline-none focus:border-rose-500 focus:bg-white transition-all leading-relaxed"
              />
              <p className="text-[11px] text-stone-500 italic">
                💡 Hệ thống sẽ tự động chuyển link Drive thành hình ảnh hiển thị tốc độ cao!
              </p>
            </div>

            <div className="pt-3 border-t border-rose-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsDriveModalOpen(false)}
                className="px-4 py-2 rounded-full border border-stone-200 text-stone-600 font-bold text-xs hover:bg-stone-100 transition-all"
              >
                Hủy Bỏ
              </button>
              <button
                onClick={handleDriveLinksSubmit}
                className="px-6 py-2.5 rounded-full bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-all shadow-md"
              >
                Cập Nhật Ảnh Ngay
              </button>
            </div>
          </div>
        </div>
      )}



      {/* BOOK WINNER MODAL */}
      {isBookModalOpen && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 text-center">
            <button
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>

            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase mb-3 inline-block font-mono">
              🎉 Tân Sẽ Tặng Cuốn Này!
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
                <strong>Lời nhắn từ Tân:</strong> &quot;Đoan cứ chuẩn bị sẵn chỗ trên kệ sách nhé, cuốn này sẽ sớm được trao tận tay em!&quot;
              </p>
            </div>

            <button
              onClick={() => setIsBookModalOpen(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              Tuyệt vời! Em nhận cuốn này 🥰
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
