"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface SkillNode {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  subSkills: string[];
  appliedProject: string;
  level: string;
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "fullstack" | "iot">("all");
  const [skillViewMode, setSkillViewMode] = useState<"graph" | "grid">("graph");
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>("agents");
  const [copiedMsg, setCopiedMsg] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: "bot" | "user"; text: string; time: string }>
  >([
    {
      sender: "bot",
      text: "Xin chào! Tôi là AI Assistant của Nguyễn Phạm Phúc Tân. Bạn có thể hỏi tôi về kinh nghiệm AI Agents, RAG, GraphRAG, YOLOv8 hoặc công nghệ mà Tân làm việc!",
      time: "Vừa xong",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsg(label);
    setTimeout(() => setCopiedMsg(null), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: "user", text: userText, time: timeNow }]);
    setChatInput("");

    setTimeout(() => {
      let botReply = "Cảm ơn câu hỏi của bạn! Phúc Tân chuyên sâu về AI Agent Systems (LangChain, LangGraph), GraphRAG (Neo4j), Computer Vision (YOLOv8, PyTorch) và Fullstack Next.js/FastAPI. Bạn có thể liên hệ qua Email phuctan977@gmail.com hoặc SĐT 0847 120 357 để trao đổi thêm nhé!";
      
      const lower = userText.toLowerCase();
      if (lower.includes("hoc") || lower.includes("truong") || lower.includes("dut")) {
        botReply = "Phúc Tân là sinh viên năm cuối chuyên ngành Khoa học Dữ liệu & Trí tuệ Nhân tạo (DS&AI) tại Đại học Bách Khoa ĐN (DUT), tốt nghiệp 2026 với GPA xuất sắc!";
      } else if (lower.includes("dự án") || lower.includes("project") || lower.includes("kinh nghiệm")) {
        botReply = "Tân đã từng làm AI Research & Engineering Intern tại Reasonary AI (Phát triển AI Agent phân tích BĐS Mỹ, Úc, VN với 100,000+ data points) và VNPT-IT (Phát triển RAG Pipeline cho Enterprise Q&A). ngoài ra còn làm dự án DRC Tire GraphRAG & YOLOv8!";
      } else if (lower.includes("tiếng anh") || lower.includes("toeic") || lower.includes("english")) {
        botReply = "Tân có chứng chỉ Tiếng Anh TOEIC 640, đọc hiểu tài liệu kĩ thuật AI/ML và làm việc tốt với tài liệu quốc tế!";
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }, 600);
  };

  // GRAPH NODES DATA
  const graphNodes: Record<string, SkillNode> = {
    agents: {
      id: "agents",
      name: "AI Agents & LLMs Workflow",
      category: "Core AI Architecture",
      icon: "fa-robot",
      color: "from-sky-500 to-indigo-600",
      badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
      borderColor: "border-sky-400",
      subSkills: [
        "LangChain & LangGraph Multi-Agent Systems",
        "RAG & GraphRAG Knowledge Graphs (Neo4j)",
        "FAISS Vector DB & Semantic Retrieval",
        "OpenAI GPT-4 & Google Gemini API Integration",
        "Firecrawl Web Scraping & Data Preprocessing",
        "Ollama & Model Context Protocol (MCP)",
      ],
      appliedProject: "Reasonary AI (AI Agent BĐS Úc/Mỹ/VN) & VNPT-IT Enterprise RAG",
      level: "Production Ready (Thực chiến doanh nghiệp)",
    },
    cv: {
      id: "cv",
      name: "Computer Vision & ML Models",
      category: "Deep Learning & Vision",
      icon: "fa-eye",
      color: "from-purple-500 to-pink-600",
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      borderColor: "border-purple-400",
      subSkills: [
        "PyTorch & TensorFlow / Keras Frameworks",
        "YOLOv5 & YOLOv8 Object Detection & Fine-tuning",
        "OpenCV Image Processing & Augmentation",
        "PaddleOCR Text Recognition",
        "Scikit-learn & Statistical Machine Learning",
        "Model Quantization & INT8 Inference Optimization",
      ],
      appliedProject: "DRC Tire Defect Classification & Traffic Sign Edge Detection",
      level: "Advanced (Tối ưu hóa mô hình nhúng)",
    },
    backend: {
      id: "backend",
      name: "Backend & Web Architecture",
      category: "Fullstack Engineering",
      icon: "fa-code",
      color: "from-emerald-500 to-teal-600",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      borderColor: "border-emerald-400",
      subSkills: [
        "Python (Primary Programming Language)",
        "FastAPI & Flask High-Performance RESTful APIs",
        "React.js & Next.js Fullstack Framework",
        "Node.js & Express.js Microservices",
        "Supabase & PostgreSQL Database Design",
      ],
      appliedProject: "DRC Tire E-Commerce Platform & AI Service Integration",
      level: "Proficient (Xây dựng hệ thống web khép kín)",
    },
    cloud: {
      id: "cloud",
      name: "Cloud, DevOps & Infra",
      category: "Production Infrastructure",
      icon: "fa-cloud",
      color: "from-amber-500 to-orange-600",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      borderColor: "border-amber-400",
      subSkills: [
        "Docker Containerization & Docker Compose",
        "AWS EC2 Deployment & Security Configuration",
        "Linux Administration & Nginx Reverse Proxy",
        "Git Version Control & Modern CI/CD Workflows",
        "Postman API Documentation & Testing",
      ],
      appliedProject: "Multi-country AI Agent Infrastructure on AWS EC2",
      level: "Operational (Triển khai & Vận hành Cloud)",
    },
    edge: {
      id: "edge",
      name: "Edge AI & IoT Hardware",
      category: "Embedded & Sensor Systems",
      icon: "fa-microchip",
      color: "from-rose-500 to-red-600",
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
      borderColor: "border-rose-400",
      subSkills: [
        "Raspberry Pi Single-Board Computing",
        "Arduino Sensor Monitoring & Actuator Control",
        "WebSocket Real-time Data Streaming",
        "Real-time Camera Feed Edge Inference",
      ],
      appliedProject: "IoT Plant Health System & Traffic Sign Real-time Raspberry Pi",
      level: "Experienced (Lập trình nhúng AI thời gian thực)",
    },
  };

  const selectedSkill = graphNodes[selectedGraphNode] || graphNodes["agents"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative font-sans bg-cyber-grid selection:bg-sky-200 selection:text-sky-900">
      {/* Ambient Soft Glowing Pastel Background Orbs */}
      <div className="glow-orb-sky top-0 -left-20 animate-pulse-slow"></div>
      <div className="glow-orb-indigo top-1/4 -right-20 animate-pulse-slow"></div>
      <div className="glow-orb-emerald top-2/3 left-1/3 animate-pulse-slow"></div>

      {/* Copy Toast Alert */}
      {copiedMsg && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <i className="fa-solid fa-circle-check text-emerald-400 text-xl"></i>
          <span className="text-sm font-semibold">{copiedMsg}</span>
        </div>
      )}

      {/* STICKY GLASS NAVBAR */}
      <header className="sticky top-0 z-40 glass-nav border-b border-slate-200/80 backdrop-blur-xl bg-white/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/portfolio" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-indigo-500/40 shadow-md group-hover:border-indigo-600 transition-all">
              <Image
                src="/phuctan_studio.png"
                alt="Nguyen Pham Phuc Tan"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight block leading-none">
                NGUYỄN PHẠM PHÚC TÂN
              </span>
              <span className="text-xs font-mono font-semibold text-indigo-600 block mt-1">
                AI Research &amp; Engineering Intern
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#about" className="hover:text-indigo-600 transition-colors">Về Tôi</a>
            <a href="#skills" className="hover:text-indigo-600 transition-colors">Đồ Thị Kỹ Năng</a>
            <a href="#projects" className="hover:text-indigo-600 transition-colors">Dự Án AI</a>
            <a href="#experience" className="hover:text-indigo-600 transition-colors">Kinh Nghiệm</a>
            <a href="#education" className="hover:text-indigo-600 transition-colors">Học Vấn</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs border border-indigo-200 flex items-center gap-2 transition-all shadow-sm"
            >
              <i className="fa-solid fa-robot text-indigo-600"></i>
              <span>Hỏi AI Twin</span>
            </button>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 text-white font-bold text-xs shadow-md hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
            >
              <i className="fa-regular fa-paper-plane"></i>
              <span>Liên Hệ Ngay</span>
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
        
        {/* HERO SECTION */}
        <section id="about" className="pt-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-bold shadow-sm">
                <i className="fa-solid fa-graduation-cap text-indigo-600"></i>
                DUT B.Eng Data Science &amp; AI (2021 – 2026)
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Kỹ Sư <span className="gradient-text">Trí Tuệ Nhân Tạo</span> &amp; AI Agent Systems
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                Tôi là <strong className="text-slate-900 font-semibold">Nguyễn Phạm Phúc Tân</strong>, cử nhân năm cuối ngành Khoa học Dữ liệu &amp; AI tại Đại học Bách Khoa Đà Nẵng (DUT). Đã có kinh nghiệm thực chiến phát triển các hệ thống <span className="text-indigo-600 font-medium">AI Agents độc lập</span>, <span className="text-sky-600 font-medium">LLM RAG / GraphRAG</span>, và <span className="text-emerald-600 font-medium">Computer Vision (YOLOv8)</span> cho các doanh nghiệp công nghệ lớn.
              </p>

              {/* Key Competency Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {[
                  { icon: "fa-brain", label: "AI Agent Systems (LangChain, LangGraph)" },
                  { icon: "fa-diagram-project", label: "GraphRAG & Neo4j Knowledge Graphs" },
                  { icon: "fa-eye", label: "Computer Vision & YOLOv8 / PyTorch" },
                  { icon: "fa-microchip", label: "Edge AI & IoT (Raspberry Pi, Sensor)" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm hover:border-indigo-300 hover:bg-slate-50 transition-all"
                  >
                    <i className={`fa-solid ${item.icon} text-indigo-600`}></i>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => copyToClipboard("phuctan977@gmail.com", "Đã sao chép Email của Phúc Tân!")}
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-md hover:bg-slate-800 transition-all flex items-center gap-2.5"
                >
                  <i className="fa-regular fa-envelope text-indigo-400"></i>
                  <span>phuctan977@gmail.com</span>
                </button>
                <a
                  href="tel:0847120357"
                  className="px-6 py-3 rounded-xl bg-white text-slate-700 font-bold text-sm border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2.5"
                >
                  <i className="fa-solid fa-phone text-emerald-600"></i>
                  <span>0847 120 357</span>
                </a>
              </div>
            </div>

            {/* Right Column: Studio Portrait & Console */}
            <div className="lg:col-span-5">
              <div className="glass-card rounded-3xl p-6 relative border border-slate-200/90 shadow-xl bg-white/90">
                <div className="relative w-full h-[360px] rounded-2xl overflow-hidden mb-6 border border-slate-200 shadow-md">
                  <Image
                    src="/phuctan_studio.png"
                    alt="Nguyen Pham Phuc Tan - AI Engineer"
                    fill
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-md flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Nguyễn Phạm Phúc Tân</h3>
                      <p className="text-[11px] text-slate-500">Đà Nẵng, Việt Nam • TOEIC 640</p>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Sẵn Sàng Làm Việc
                    </span>
                  </div>
                </div>

                {/* Light Glass Developer Code Console */}
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-2 text-slate-200 shadow-inner">
                  <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                    <span className="text-sky-400 font-bold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      tan@ai-engineer:~$
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">DUT AI 2021-2026</span>
                  </div>
                  <p className="text-sky-300"><span className="text-slate-500">&gt;</span> specialized_in = [&quot;AI Agents&quot;, &quot;GraphRAG&quot;, &quot;YOLOv8&quot;]</p>
                  <p className="text-indigo-300"><span className="text-slate-500">&gt;</span> primary_stack = [&quot;Python&quot;, &quot;LangGraph&quot;, &quot;Neo4j&quot;, &quot;FastAPI&quot;]</p>
                  <p className="text-emerald-300"><span className="text-slate-500">&gt;</span> production_exp = &quot;Reasonary AI (AU/US/VN Market Intel)&quot;</p>
                  <p className="text-amber-300"><span className="text-slate-500">&gt;</span> english_proficiency = &quot;TOEIC 640 / Technical Fluent&quot;</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 1: INTERACTIVE SKILL TREE / KNOWLEDGE GRAPH */}
        <section id="skills" className="pt-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm inline-block mb-3">
              Interactive AI Knowledge Graph
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Sơ Đồ Đồ Thị Kỹ Năng Công Nghệ</h2>
            <p className="text-slate-600 text-sm mt-3 font-normal">
              Bản đồ kết nối các trụ cột công nghệ AI từ hạt nhân trung tâm đến các dự án thực tế.
            </p>

            {/* View Mode Switcher */}
            <div className="inline-flex items-center gap-2 mt-6 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <button
                onClick={() => setSkillViewMode("graph")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  skillViewMode === "graph"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <i className="fa-solid fa-diagram-project"></i>
                <span>Sơ Đồ Đồ Thị (Graph View)</span>
              </button>
              <button
                onClick={() => setSkillViewMode("grid")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  skillViewMode === "grid"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <i className="fa-solid fa-table-cells"></i>
                <span>Thẻ Danh Sách (Grid View)</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: INTERACTIVE KNOWLEDGE GRAPH CANVAS */}
          {skillViewMode === "graph" ? (
            <div className="glass-card rounded-3xl p-6 md:p-8 bg-white/95 border border-slate-200 shadow-xl relative overflow-hidden">
              
              {/* Responsive Graph Display */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Desktop: Radial SVG Skill Tree Diagram */}
                <div className="hidden lg:flex lg:col-span-7 relative items-center justify-center py-6 h-[480px]">
                  
                  {/* SVG Laser Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-indigo-400/40" style={{ zIndex: 1 }}>
                    <line x1="50%" y1="50%" x2="25%" y2="18%" strokeWidth="2.5" className="pulse-line stroke-sky-500" />
                    <line x1="50%" y1="50%" x2="75%" y2="18%" strokeWidth="2.5" className="pulse-line stroke-purple-500" />
                    <line x1="50%" y1="50%" x2="82%" y2="60%" strokeWidth="2.5" className="pulse-line stroke-emerald-500" />
                    <line x1="50%" y1="50%" x2="50%" y2="88%" strokeWidth="2.5" className="pulse-line stroke-amber-500" />
                    <line x1="50%" y1="50%" x2="18%" y2="60%" strokeWidth="2.5" className="pulse-line stroke-rose-500" />
                  </svg>

                  {/* Central Node: PHÚC TÂN AI CORE */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
                    <div className="relative group cursor-pointer">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-sky-600 via-indigo-600 to-violet-600 p-1 shadow-2xl shadow-indigo-500/30 animate-pulse">
                        <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center p-2 text-white border-2 border-white/20">
                          <i className="fa-solid fa-brain text-2xl text-sky-400 mb-1"></i>
                          <span className="text-[11px] font-black tracking-wider font-mono">AI CORE</span>
                          <span className="text-[9px] text-slate-400">DUT 2026</span>
                        </div>
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md font-mono border border-slate-700">
                        Nguyễn Phạm Phúc Tân
                      </div>
                    </div>
                  </div>

                  {/* 5 Outer Branch Nodes (Clickable & Selectable) */}
                  {/* Node 1: AI Agents & LLMs (Top Left) */}
                  <button
                    onClick={() => setSelectedGraphNode("agents")}
                    className={`absolute top-[10%] left-[8%] z-20 p-4 rounded-2xl bg-white border shadow-lg transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      selectedGraphNode === "agents"
                        ? "border-sky-500 ring-4 ring-sky-500/20 scale-110 shadow-sky-500/20"
                        : "border-slate-200 hover:border-sky-300 hover:scale-105"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-lg">
                      <i className="fa-solid fa-robot"></i>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-900">AI Agents &amp; LLM</h4>
                      <p className="text-[10px] text-slate-500 font-mono">LangChain • Neo4j</p>
                    </div>
                  </button>

                  {/* Node 2: Computer Vision (Top Right) */}
                  <button
                    onClick={() => setSelectedGraphNode("cv")}
                    className={`absolute top-[10%] right-[8%] z-20 p-4 rounded-2xl bg-white border shadow-lg transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      selectedGraphNode === "cv"
                        ? "border-purple-500 ring-4 ring-purple-500/20 scale-110 shadow-purple-500/20"
                        : "border-slate-200 hover:border-purple-300 hover:scale-105"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
                      <i className="fa-solid fa-eye"></i>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-900">Vision &amp; ML</h4>
                      <p className="text-[10px] text-slate-500 font-mono">YOLOv8 • PyTorch</p>
                    </div>
                  </button>

                  {/* Node 3: Fullstack & Backend (Middle Right) */}
                  <button
                    onClick={() => setSelectedGraphNode("backend")}
                    className={`absolute top-[52%] right-[5%] z-20 p-4 rounded-2xl bg-white border shadow-lg transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      selectedGraphNode === "backend"
                        ? "border-emerald-500 ring-4 ring-emerald-500/20 scale-110 shadow-emerald-500/20"
                        : "border-slate-200 hover:border-emerald-300 hover:scale-105"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                      <i className="fa-solid fa-code"></i>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-900">Backend &amp; API</h4>
                      <p className="text-[10px] text-slate-500 font-mono">FastAPI • Next.js</p>
                    </div>
                  </button>

                  {/* Node 4: Cloud & DevOps (Bottom Center) */}
                  <button
                    onClick={() => setSelectedGraphNode("cloud")}
                    className={`absolute bottom-[5%] left-1/2 -translate-x-1/2 z-20 p-4 rounded-2xl bg-white border shadow-lg transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      selectedGraphNode === "cloud"
                        ? "border-amber-500 ring-4 ring-amber-500/20 scale-110 shadow-amber-500/20"
                        : "border-slate-200 hover:border-amber-300 hover:scale-105"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
                      <i className="fa-solid fa-cloud"></i>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-900">Cloud &amp; DevOps</h4>
                      <p className="text-[10px] text-slate-500 font-mono">Docker • AWS EC2</p>
                    </div>
                  </button>

                  {/* Node 5: Edge AI & IoT (Middle Left) */}
                  <button
                    onClick={() => setSelectedGraphNode("edge")}
                    className={`absolute top-[52%] left-[5%] z-20 p-4 rounded-2xl bg-white border shadow-lg transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      selectedGraphNode === "edge"
                        ? "border-rose-500 ring-4 ring-rose-500/20 scale-110 shadow-rose-500/20"
                        : "border-slate-200 hover:border-rose-300 hover:scale-105"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg">
                      <i className="fa-solid fa-microchip"></i>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-900">Edge AI &amp; IoT</h4>
                      <p className="text-[10px] text-slate-500 font-mono">Raspberry Pi • Sensors</p>
                    </div>
                  </button>
                </div>

                {/* Mobile / Tablet Node Selector Grid */}
                <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {Object.values(graphNodes).map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedGraphNode(node.id)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        selectedGraphNode === node.id
                          ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 font-bold"
                          : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      <i className={`fa-solid ${node.icon} text-indigo-600`}></i>
                      <span className="text-xs font-extrabold truncate">{node.name}</span>
                    </button>
                  ))}
                </div>

                {/* Right: Dynamic Node Inspector Card */}
                <div className="lg:col-span-5 space-y-4">
                  <div className={`p-6 rounded-3xl bg-white border-2 ${selectedSkill.borderColor} shadow-xl transition-all`}>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${selectedSkill.color} text-white flex items-center justify-center text-xl font-bold shadow-md`}>
                          <i className={`fa-solid ${selectedSkill.icon}`}></i>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                            {selectedSkill.category}
                          </span>
                          <h3 className="text-lg font-black text-slate-900">{selectedSkill.name}</h3>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-full ${selectedSkill.badgeBg}`}>
                        {selectedSkill.level}
                      </span>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2">
                        <i className="fa-solid fa-layer-group text-indigo-600"></i>
                        <span>Chi Tiết Công Nghệ Đồ Thị:</span>
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedSkill.subSkills.map((sub, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            <span>{sub}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Ứng Dụng Trong Dự Án Thực Tế:
                        </h4>
                        <p className="text-xs font-bold text-indigo-600 bg-indigo-50 p-2.5 rounded-xl border border-indigo-200">
                          {selectedSkill.appliedProject}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* VIEW MODE 2: CARD GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(graphNodes).map((skill, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 bg-white/90 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${skill.color} text-white flex items-center justify-center font-bold text-lg shadow-sm`}>
                        <i className={`fa-solid ${skill.icon}`}></i>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base">{skill.name}</h3>
                        <span className="text-[10px] text-slate-400 font-mono font-semibold">{skill.category}</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5">
                      {skill.subSkills.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <i className="fa-solid fa-circle-check text-indigo-600 mt-0.5"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 2: KEY PROJECTS SHOWCASE */}
        <section id="projects" className="pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm inline-block mb-3">
                Dự Án Đã Thực Hiện
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Dự Án AI Nổi Bật</h2>
              <p className="text-slate-600 text-sm mt-2">
                Các sản phẩm AI thực tế từ môi trường doanh nghiệp (Production) và Đồ án Bách Khoa.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mt-6 md:mt-0 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
              {[
                { id: "all", label: "Tất Cả" },
                { id: "ai", label: "AI & RAG" },
                { id: "fullstack", label: "Fullstack & Vision" },
                { id: "iot", label: "IoT & Edge AI" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PROJECT 1: AI Agent Real Estate Analysis */}
            {(activeTab === "all" || activeTab === "ai") && (
              <div className="glass-card rounded-3xl overflow-hidden bg-white/90 border border-slate-200 shadow-md hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-56 bg-slate-100 border-b border-slate-200">
                    <Image
                      src="/projects/realestate.png"
                      alt="AI Agent Real Estate Analysis"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-mono font-bold border border-slate-700">
                      Reasonary AI • Production
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-extrabold text-slate-900">
                        Hệ Thống AI Agent Phân Tích Thị Trường BĐS Quản Lý 100,000+ Data Points
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-indigo-600 mb-4 font-mono">
                      Khách hàng: Reasonary AI (Úc, Mỹ, VN) | Vai trò: AI Research &amp; Eng Intern
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Xây dựng nền tảng AI Agent tự động thu thập và phân tích chỉ số thị trường BĐS đa quốc gia để tạo báo cáo tư vấn đầu tư thông minh cho chuyên gia.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-indigo-600 mt-0.5"></i>
                        <span>Thiết kế workflow LangChain kết hợp Web Scraping (Firecrawl), Vector Retrieval &amp; LLM reasoning.</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-indigo-600 mt-0.5"></i>
                        <span>Làm sạch &amp; chuẩn hóa dữ liệu BĐS không đồng nhất từ 3 quốc gia, xử lý schema mismatches.</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-indigo-600 mt-0.5"></i>
                        <span>Đóng góp trực tiếp vào sản phẩm cốt lõi Proactive Super Agent của công ty.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-slate-100 flex flex-wrap gap-2">
                  {["Python", "LangChain", "LangGraph", "FAISS", "OpenAI API", "Gemini API", "Firecrawl", "Docker", "AWS EC2"].map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECT 2: DRC Tire GraphRAG & YOLOv8 */}
            {(activeTab === "all" || activeTab === "fullstack" || activeTab === "ai") && (
              <div className="glass-card rounded-3xl overflow-hidden bg-white/90 border border-slate-200 shadow-md hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-56 bg-slate-100 border-b border-slate-200">
                    <Image
                      src="/projects/drc.png"
                      alt="DRC Tire AI & GraphRAG Platform"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-mono font-bold border border-slate-700">
                      DUT Graduation Project
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                      Nền Tảng AI Tích Hợp Nhận Diện Lỗi Lốp DRC &amp; GraphRAG Chatbot
                    </h3>
                    <p className="text-xs font-semibold text-emerald-600 mb-4 font-mono">
                      Khách hàng: Nhà Phân Phối Lốp DRC | Vai trò: Fullstack &amp; AI Lead
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Hệ thống E-Commerce thương mại điện tử kết hợp AI phát hiện lỗi lốp xe qua hình ảnh (YOLOv8) và Chatbot GraphRAG tư vấn sản phẩm thông minh.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-emerald-600 mt-0.5"></i>
                        <span>Fine-tune mô hình YOLOv8 phân loại lỗi lốp xe DRC và tích hợp API vào quy trình mua hàng.</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-emerald-600 mt-0.5"></i>
                        <span>Triển khai GraphRAG Chatbot sử dụng Neo4j Knowledge Graph &amp; GPT-4 trả lời tự động.</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-emerald-600 mt-0.5"></i>
                        <span>Xây dựng React/Next.js frontend, FastAPI &amp; Node.js backend RESTful API.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-slate-100 flex flex-wrap gap-2">
                  {["React", "Next.js", "Node.js", "FastAPI", "Supabase", "YOLOv8", "PyTorch", "Neo4j", "GraphRAG", "AWS EC2"].map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECT 3: IoT Smart Home & Plant Vision */}
            {(activeTab === "all" || activeTab === "iot") && (
              <div className="glass-card rounded-3xl overflow-hidden bg-white/90 border border-slate-200 shadow-md hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-56 bg-slate-100 border-b border-slate-200">
                    <Image
                      src="/projects/iot.png"
                      alt="IoT Smart Home Plant Health AI"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-mono font-bold border border-slate-700">
                      School Project • May 2024
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                      Hệ Thống IoT Smart Home &amp; AI Phân Tích Sức Khỏe Cây Trồng
                    </h3>
                    <p className="text-xs font-semibold text-sky-600 mb-4 font-mono">
                      Dự án môn học DUT | Vai trò: IoT &amp; AI Developer (Team 3 người)
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Hệ thống IoT theo dõi cảm biến thời gian thực, phân tích lá cây bằng Computer Vision và trợ lý AI Gemini tư vấn chăm sóc cây trồng.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-sky-600 mt-0.5"></i>
                        <span>Tích hợp phần cứng Arduino &amp; Raspberry Pi điều khiển thiết bị &amp; giám sát cảm biến.</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-sky-600 mt-0.5"></i>
                        <span>Xây dựng mô hình Computer Vision đánh giá độ héo và bệnh của lá cây.</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-sky-600 mt-0.5"></i>
                        <span>Kết nối Google Gemini API đưa ra khuyến nghị tưới nước &amp; phân bón tự động.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-slate-100 flex flex-wrap gap-2">
                  {["Python", "Arduino", "Raspberry Pi", "FastAPI", "WebSocket", "Computer Vision", "PyTorch", "Gemini API"].map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-sky-50 text-sky-700 border border-sky-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECT 4: Real-Time Traffic Sign Recognition */}
            {(activeTab === "all" || activeTab === "iot" || activeTab === "fullstack") && (
              <div className="glass-card rounded-3xl overflow-hidden bg-white/90 border border-slate-200 shadow-md hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-56 bg-slate-100 border-b border-slate-200">
                    <Image
                      src="/projects/trafficsign.png"
                      alt="Real-Time Traffic Sign Recognition"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-mono font-bold border border-slate-700">
                      School Project • Jun 2025
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                      Hệ Thống Nhận Diện Biển Báo Giao Thông Thời Gian Thực Trên Raspberry Pi
                    </h3>
                    <p className="text-xs font-semibold text-purple-600 mb-4 font-mono">
                      Dự án môn học DUT | Vai trò: AI Developer (Team 3 người)
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Hệ thống nhúng phát hiện và nhận diện biển báo giao thông tốc độ cao từ camera feed live sử dụng YOLOv5 tối ưu hóa quantization.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-purple-600 mt-0.5"></i>
                        <span>Thu thập, gán nhãn dataset biển báo giao thông &amp; Data Augmentation tăng độ chính xác.</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-purple-600 mt-0.5"></i>
                        <span>Huấn luyện YOLOv5 &amp; áp dụng Model Quantization nâng cao FPS trên thiết bị nhúng.</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-slate-700">
                        <i className="fa-solid fa-angle-right text-purple-600 mt-0.5"></i>
                        <span>Lập trình kết nối camera feed xử lý real-time trực tiếp trên Raspberry Pi.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-slate-100 flex flex-wrap gap-2">
                  {["Python", "PyTorch", "OpenCV", "YOLOv5", "NumPy", "Raspberry Pi", "Model Quantization"].map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: WORK EXPERIENCE & CAREER TIMELINE */}
        <section id="experience" className="pt-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm inline-block mb-3">
              Lịch Sử Làm Việc
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Kinh Nghiệm Thực Chiến</h2>
            <p className="text-slate-600 text-sm mt-3 font-normal">
              Hành trình thực tập và đóng góp công nghệ AI tại các công ty chuyên nghiệp.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
            {/* Experience 1: Reasonary AI */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white shadow-md"></div>
              
              <div className="glass-card rounded-2xl p-6 bg-white/90 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[11px] font-bold border border-indigo-200">
                      Oct 2025 – Jul 2026
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">AI Research &amp; Engineering Intern</h3>
                    <p className="text-xs font-bold text-slate-600">Reasonary AI Vietnam Co., LTD</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 self-start sm:self-auto">
                    AI Agent &amp; LLM Systems
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-indigo-600 mt-0.5"></i>
                    <span>Nghiên cứu &amp; phát triển AI Agent Systems phân tích thị trường BĐS quốc tế (Úc, Mỹ, VN), xử lý trên 100,000+ data points.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-indigo-600 mt-0.5"></i>
                    <span>Xây dựng Data Pipeline khép kín (thu thập, tiền xử lý, vector retrieval) bằng LangChain &amp; Firecrawl hỗ trợ đưa ra quyết định đầu tư.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-indigo-600 mt-0.5"></i>
                    <span>Đánh giá &amp; Benchmark kiến trúc LLM (GPT-4, Gemini) để tối ưu chiến lược truy vấn thông tin contextual relevance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-indigo-600 mt-0.5"></i>
                    <span>Phối hợp cùng engineering team nghiên cứu kiến trúc AI Agent và đóng góp vào sản phẩm Proactive Super Agent.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Experience 2: VNPT-IT */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-sky-600 border-4 border-white shadow-md"></div>
              
              <div className="glass-card rounded-2xl p-6 bg-white/90 border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 font-mono text-[11px] font-bold border border-sky-200">
                      Jan 2025 – April 2025
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">AI Research Intern</h3>
                    <p className="text-xs font-bold text-slate-600">VNPT-IT (Tập đoàn Bưu chính Viễn thông Việt Nam)</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 self-start sm:self-auto">
                    Enterprise RAG Pipelines
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-sky-600 mt-0.5"></i>
                    <span>Nghiên cứu &amp; thử nghiệm pipeline RAG (Retrieval-Augmented Generation) cho hệ thống hỏi đáp doanh nghiệp lớn.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-sky-600 mt-0.5"></i>
                    <span>Sử dụng cơ sở dữ liệu Vector FAISS và các mô hình Open-source LLMs cho khả năng truy xuất chính xác.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa-solid fa-check text-sky-600 mt-0.5"></i>
                    <span>Xử lý &amp; làm sạch tập dữ liệu huấn luyện, viết báo cáo thử nghiệm đề xuất cải tiến kiến trúc cho Production.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: EDUCATION & CERTIFICATIONS */}
        <section id="education" className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <span className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm inline-block mb-3">
                Nền Tảng Tốt Nốt
              </span>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Học Vấn &amp; Năng Lực</h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Được đào tạo bài bản về thuật toán toán học, khoa học dữ liệu, học máy và trí tuệ nhân tạo chuyên sâu tại trường đại học hàng đầu miền Trung.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-language text-2xl text-indigo-600"></i>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Chứng Chỉ Tiếng Anh</h4>
                      <p className="text-xs text-slate-500">TOEIC Quốc Tế 640</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Đạt Chuẩn
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-code text-2xl text-sky-600"></i>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Platform &amp; Tools</h4>
                      <p className="text-xs text-slate-500">Jupyter, VS Code, Postman, Kaggle</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                    Thành Thạo
                  </span>
                </div>
              </div>
            </div>

            {/* University Card */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-white via-indigo-50/30 to-sky-50/50 border border-slate-200 shadow-xl relative overflow-hidden">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="px-3 py-1 text-[11px] font-mono font-bold rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                      Niên khóa 2021 – 2026
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-2">
                      Đại Học Bách Khoa - ĐH Đà Nẵng (DUT)
                    </h3>
                    <p className="text-sm font-bold text-indigo-600 mt-1">
                      Kỹ Sư Khoa Học Dữ Liệu &amp; Trí Tuệ Nhân Tạo (B.Eng in DS &amp; AI)
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
                    DUT
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                  <div className="p-3 rounded-xl bg-white/80 border border-slate-200 text-center">
                    <span className="block text-xs text-slate-500 font-semibold">Chuyên Ngành</span>
                    <span className="text-xs font-extrabold text-slate-900">DS &amp; AI</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-slate-200 text-center">
                    <span className="block text-xs text-slate-500 font-semibold">Tốt Nghiệp</span>
                    <span className="text-xs font-extrabold text-slate-900">Năm 2026</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-slate-200 text-center col-span-2 sm:col-span-1">
                    <span className="block text-xs text-slate-500 font-semibold">Ngoại Ngữ</span>
                    <span className="text-xs font-extrabold text-slate-900">TOEIC 640</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: CALL TO ACTION & CONTACT FOOTER */}
        <section id="contact" className="pt-6 pb-12">
          <div className="glass-card rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
                  🔴 Open for AI Engineer Roles
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Sẵn Sàng Hợp Tác &amp; Đóng Góp Công Nghệ AI
                </h2>
                <p className="text-slate-300 text-sm font-normal max-w-2xl leading-relaxed">
                  Bạn đang tìm kiếm vị trí AI Engineer, LLM Developer, hay AI Research Intern có khả năng hiện thực hóa các giải pháp AI Agents &amp; RAG vào sản phẩm thực tế? Hãy kết nối với Phúc Tân ngay hôm nay!
                </p>
                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-rose-400"></i> Đà Nẵng, Việt Nam
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-envelope text-sky-400"></i> phuctan977@gmail.com
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-phone text-emerald-400"></i> 0847 120 357
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  onClick={() => copyToClipboard("phuctan977@gmail.com", "Đã sao chép Email phuctan977@gmail.com!")}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-sm shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-regular fa-copy"></i>
                  <span>Sao Chép Email Chồng</span>
                </button>
                <a
                  href="tel:0847120357"
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-sm border border-slate-700 text-center transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-phone text-emerald-400"></i>
                  <span>Gọi Điện Trực Tiếp</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} Nguyễn Phạm Phúc Tân. Built with Next.js, React &amp; TailwindCSS.
          </div>
        </section>

      </main>

      {/* FLOATING CHATBOT MODAL */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[560px] animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-indigo-400">
                  <Image src="/phuctan_studio.png" alt="Phuc Tan AI" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    Phúc Tân AI Assistant
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">Powered by LangChain &amp; GPT-4</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-medium shadow-sm ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1.5 font-mono ${
                        msg.sender === "user" ? "text-indigo-200 text-right" : "text-slate-400"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Hỏi về kinh nghiệm AI, dự án hay kỹ năng của Tân..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 placeholder-slate-400 text-xs border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
