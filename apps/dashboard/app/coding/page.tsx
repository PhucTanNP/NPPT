"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Plus, Copy, Trash2 } from "lucide-react";
import { PageHeader, EmptyState, TagPill, SearchInput } from "@ui/index";

const LANGUAGES = ["#all", "#python", "#rust", "#javascript", "#typescript"];

const MOCK_SNIPPETS = [
  { title: "async_fetch.py", lang: "python", code: "async def fetch_data(url):\n    async with httpx.AsyncClient() as client:\n        return await client.get(url)", desc: "Async HTTP fetch example", tags: ["#python", "#async"] },
  { title: "ownership.rs", lang: "rust", code: "fn main() {\n    let s = String::from(\"hello\");\n    println!(\"{}\", s);\n}", desc: "Rust ownership basics", tags: ["#rust"] },
];

export default function CodingPage() {
  const [lang, setLang] = useState("#all");
  const filtered = lang === "#all" ? MOCK_SNIPPETS : MOCK_SNIPPETS.filter((s) => s.tags.includes(lang));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader icon={Code} title="Code Snippets" description="Save and organize code snippets"
        actions={<button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> New Snippet</button>}
      />

      <div className="flex flex-wrap gap-1.5">
        {LANGUAGES.map((l) => (<TagPill key={l} label={l} active={lang === l} onClick={() => setLang(l)} />))}
      </div>

      <div className="space-y-4">
        {filtered.map((snippet) => (
          <div key={snippet.title} className="rounded-lg border border-muted/50 bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-muted/50 bg-muted/30 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{snippet.lang}</span>
                <span className="text-sm font-medium">{snippet.title}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"><Copy className="h-3.5 w-3.5" /></button>
                <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <pre className="overflow-x-auto p-4 text-sm"><code>{snippet.code}</code></pre>
            <div className="border-t border-muted/50 px-4 py-2">
              <p className="text-xs text-muted-foreground">{snippet.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

