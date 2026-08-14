"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, Plus, ExternalLink, Clock, Star, Trash2, RefreshCw,
  MapPin, DollarSign, Users, Building2, Loader2, Search,
} from "lucide-react";
import {
  PageHeader, EmptyState, LoadingSkeleton, ErrorState, StatusBadge,
  TagPill, SearchInput, Modal, ConfirmDialog,
} from "@ui/index";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.nguyenphamphuctan.click/api/v1";

// ─── Types ────────────────────────────────────────
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  job_type: string;
  url: string;
  source: string;
  description: string;
  skills: string[];
  requirements: string[];
  benefits: string[];
  ai_relevance: number;
  ai_analysis: string;
  is_saved: boolean;
  crawled_at: string;
}

interface JobSource {
  name: string;
  search_url?: string;
  search_query?: string;
}

// ─── Helpers ──────────────────────────────────────
function timeAgo(iso: string): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "vừa xong";
  if (mins < 60) return `${mins} phút trước`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} giờ trước`;
  return `${Math.floor(hrs / 24)} ngày trước`;
}

function relevanceColor(score: number): string {
  if (score >= 8) return "bg-green-500/10 text-green-500 border-green-500/30";
  if (score >= 5) return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
  return "bg-muted text-muted-foreground border-muted";
}

// ─── Component chính ──────────────────────────────
export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedSource, setSelectedSource] = useState("All");
  const [minRelevance, setMinRelevance] = useState(0);

  // Crawl modal
  const [showCrawl, setShowCrawl] = useState(false);
  const [crawlSource, setCrawlSource] = useState("TopCV");
  const [crawlQuery, setCrawlQuery] = useState("AI engineer");
  const [crawlLimit, setCrawlLimit] = useState(3);
  const [crawling, setCrawling] = useState(false);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ limit: "50", offset: "0" });
      if (selectedSource !== "All") params.set("source", selectedSource);
      if (minRelevance > 0) params.set("min_relevance", String(minRelevance));
      const res = await fetch(`${API_URL}/jobs/jobs?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Lỗi tải jobs");
      setJobs(json.data || []);
    } catch (e: any) {
      setError(e.message || "Không kết nối được backend");
    } finally {
      setLoading(false);
    }
  }, [selectedSource, minRelevance]);

  const fetchSources = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/jobs/sources`);
      const json = await res.json();
      if (json.success) {
        const names = (json.data as JobSource[]).map((s) => s.name);
        setSources(names);
        setCrawlSource(names[0] || "TopCV");
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    fetchJobs();
    fetchSources();
  }, [fetchJobs, fetchSources]);

  // ─── Crawl ─────────────────────────────────────
  const handleCrawl = async () => {
    setCrawling(true);
    try {
      const res = await fetch(`${API_URL}/jobs/crawl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source_name: crawlSource, query: crawlQuery, limit: crawlLimit }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Crawl thất bại");
      setShowCrawl(false);
      await fetchJobs();
    } catch (e: any) {
      setError(e.message || "Crawl thất bại");
    } finally {
      setCrawling(false);
    }
  };

  // ─── Bookmark ──────────────────────────────────
  const toggleSave = async (job: Job) => {
    const next = !job.is_saved;
    // Optimistic update
    setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, is_saved: next } : j)));
    try {
      await fetch(`${API_URL}/jobs/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_saved: next }),
      });
    } catch {
      // rollback
      setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, is_saved: job.is_saved } : j)));
    }
  };

  // ─── Delete ────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/jobs/jobs/${deleteTarget.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Xoá thất bại");
      setJobs((prev) => prev.filter((j) => j.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e: any) {
      setError(e.message || "Xoá thất bại");
    } finally {
      setDeleting(false);
    }
  };

  // ─── Filter ────────────────────────────────────
  const filtered = jobs.filter((j) => {
    if (search) {
      const s = search.toLowerCase();
      if (!j.title.toLowerCase().includes(s) && !j.company.toLowerCase().includes(s) && !(j.skills || []).join(" ").toLowerCase().includes(s)) return false;
    }
    if (selectedSource !== "All" && j.source !== selectedSource) return false;
    if (minRelevance > 0 && (j.ai_relevance || 0) < minRelevance) return false;
    return true;
  });

  const savedCount = jobs.filter((j) => j.is_saved).length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader
        icon={Briefcase}
        title="AI Jobs"
        description="Việc làm AI được crawl & phân tích tự động bằng Gemma"
        actions={
          <button
            onClick={() => setShowCrawl(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Crawl Jobs
          </button>
        }
      />

      {/* Filters */}
      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo title, công ty, kỹ năng..." />
        <div className="flex flex-wrap items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          {["All", ...sources].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSource(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedSource === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Độ liên quan AI:</span>
          {[0, 5, 7, 9].map((score) => (
            <TagPill
              key={score}
              label={score === 0 ? "Tất cả" : `≥ ${score}`}
              active={minRelevance === score}
              onClick={() => setMinRelevance(score)}
            />
          ))}
          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} jobs · {savedCount} đã lưu
          </span>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : error && jobs.length === 0 ? (
        <ErrorState message={error} onRetry={fetchJobs} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="Chưa có job nào"
          description={search ? "Thử từ khoá khác" : "Crawl jobs từ các job board để bắt đầu"}
          action={!search ? { label: "Crawl Jobs", onClick: () => setShowCrawl(true) } : undefined}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="group flex h-full flex-col rounded-lg border border-muted/50 bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 font-semibold group-hover:text-primary">{job.title || "Untitled"}</h3>
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" /> {job.company || "—"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => toggleSave(job)}
                      title={job.is_saved ? "Bỏ lưu" : "Lưu job"}
                      className={`rounded-md p-1.5 transition-colors ${job.is_saved ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500"}`}
                    >
                      <Star className="h-4 w-4" fill={job.is_saved ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(job)}
                      title="Xoá job"
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {job.location && (
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                  )}
                  {job.salary && (
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><DollarSign className="h-3 w-3" />{job.salary}</span>
                  )}
                  {job.experience && (
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{job.experience}</span>
                  )}
                </div>

                {/* Skills */}
                {(job.skills || []).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {job.skills.slice(0, 5).map((skill) => (
                      <span key={skill} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{skill}</span>
                    ))}
                    {job.skills.length > 5 && (
                      <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">+{job.skills.length - 5}</span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between border-t border-muted/50 pt-3">
                    <div className="flex items-center gap-2">
                      <StatusBadge status="info" label={job.source || "—"} />
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${relevanceColor(job.ai_relevance || 0)}`}>
                        AI {job.ai_relevance || 0}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />{timeAgo(job.crawled_at)}
                      </span>
                      {job.url && (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Mở bài đăng gốc"
                          className="rounded-md p-1 text-muted-foreground hover:text-primary"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Crawl Modal */}
      <Modal open={showCrawl} title="Crawl việc làm AI" onClose={() => setShowCrawl(false)}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nguồn job board</label>
            <select
              value={crawlSource}
              onChange={(e) => setCrawlSource(e.target.value)}
              className="w-full rounded-lg border border-muted bg-background px-3 py-2 text-sm outline-none focus:border-primary/50"
            >
              {sources.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Từ khoá</label>
            <input
              value={crawlQuery}
              onChange={(e) => setCrawlQuery(e.target.value)}
              placeholder="AI engineer, ML engineer, Data Scientist..."
              className="w-full rounded-lg border border-muted bg-background px-3 py-2 text-sm outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Số job tối đa ({crawlLimit})</label>
            <input
              type="range"
              min={1}
              max={10}
              value={crawlLimit}
              onChange={(e) => setCrawlLimit(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setShowCrawl(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent"
            >
              Huỷ
            </button>
            <button
              onClick={handleCrawl}
              disabled={crawling}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {crawling ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Đang crawl...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" /> Crawl ngay
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Xoá job này?"
        message={`Bạn chắc chắn muốn xoá "${deleteTarget?.title}" khỏi danh sách?`}
        confirmLabel={deleting ? "Đang xoá..." : "Xoá"}
        cancelLabel="Huỷ"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </motion.div>
  );
}
