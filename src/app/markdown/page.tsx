"use client"
import { useState, useRef, useCallback, useEffect } from "react";

// ── Markdown parser (lightweight, no deps) ────────────────────────────────────
function parseMarkdown(md: string) {
  if (!md) return "";
  let html = md
    .replace(/^#{6}\s(.+)$/gm, "<h6>$1</h6>")
    .replace(/^#{5}\s(.+)$/gm, "<h5>$1</h5>")
    .replace(/^#{4}\s(.+)$/gm, "<h4>$1</h4>")
    .replace(/^#{3}\s(.+)$/gm, "<h3>$1</h3>")
    .replace(/^#{2}\s(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#{1}\s(.+)$/gm, "<h1>$1</h1>")
    .replace(/^---$/gm, "<hr/>")
    .replace(/^>\s(.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_: string, lang: string, code: string) =>
      `<pre><code class="lang-${lang}">${code.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1"/>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^\s*[-*+]\s(.+)$/gm, "<li>$1</li>")
    .replace(/^\s*\d+\.\s(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match: string) => `<ul>${match}</ul>`)
    .replace(/^(?!<[a-z]|$)(.+)$/gm, "<p>$1</p>")
    .replace(/\n{3,}/g, "\n\n");
  return html;
}

// ── Toolbar button component ──────────────────────────────────────────────────
function ToolbarBtn({ title, onClick, children, active }: { title: string; onClick: () => void; children: React.ReactNode; active?: boolean }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={[
        "rounded px-2 py-1 text-[13px] font-[inherit] leading-none cursor-pointer transition-all duration-150 border",
        active
          ? "bg-[rgba(212,175,55,0.18)] border-[rgba(212,175,55,0.4)] text-[#d4af37]"
          : "bg-transparent border-transparent text-[#a8a090] hover:bg-white/6 hover:text-[#e8e0d0]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-[22px] bg-white/10 mx-1 shrink-0" />;
}

// ── Word / char counter ───────────────────────────────────────────────────────
function countStats(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const readTime = Math.max(1, Math.ceil(words / 200));
  return { words, chars, readTime };
}

// ── Default content ───────────────────────────────────────────────────────────
const INITIAL = `# Welcome to the Blog Editor

Write your story here. This editor supports **full Markdown** syntax.

---

## Features

- **Bold**, *italic*, ~~strikethrough~~, and \`inline code\`
- Headings H1–H6
- Ordered and unordered lists
- Blockquotes and horizontal rules
- Fenced code blocks
- Links and images

> "Good writing is clear thinking made visible." — William Wheeler

\`\`\`javascript
// Example code block
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

Start editing to see the live preview →
`;

// ── Main Editor ───────────────────────────────────────────────────────────────
export default function BlogEditor() {
  const [title, setTitle]                   = useState("Untitled Post");
  const [content, setContent]               = useState(INITIAL);
  const [mode, setMode]                     = useState("split");
  const [saved, setSaved]                   = useState(false);
  const [saveTime, setSaveTime]             = useState("");
  const [tags, setTags]                     = useState(["technology", "design"]);
  const [tagInput, setTagInput]             = useState("");
  const [coverUrl, setCoverUrl]             = useState("");
  const [showCoverInput, setShowCoverInput] = useState(false);
  const [status, setStatus]                 = useState("draft");
  const [excerpt, setExcerpt]               = useState("");
  const [showExcerpt, setShowExcerpt]       = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const stats = countStats(content);

  // Auto-save simulation
  useEffect(() => {
    const t = setTimeout(() => {
      setSaved(true);
      setSaveTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1200);
    setSaved(false);
    return () => clearTimeout(t);
  }, [content, title]);

  // ── Toolbar actions ──────────────────────────────────────────────────────────
  const wrap = useCallback((before: any, after = before, placeholder = "text") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const newContent = content.slice(0, start) + before + selected + after + content.slice(end);
    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  }, [content]);

  const insertLine = useCallback((prefix: string | any[]) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = content.lastIndexOf("\n", start - 1) + 1;
    const newContent = content.slice(0, lineStart) + prefix + content.slice(lineStart);
    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(lineStart + prefix.length, lineStart + prefix.length);
    }, 0);
  }, [content]);

  const insertAtCursor = useCallback((text: string | any[]) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const newContent = content.slice(0, start) + text + content.slice(start);
    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  }, [content]);

  const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === "Tab") {
      e.preventDefault();
      insertAtCursor("  ");
    }
  };

  const addTag = (e: { key: string; preventDefault: () => void; }) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().replace(/,/g, "");
      if (t && !tags.includes(t)) setTags([...tags, t]);
      setTagInput("");
    }
  };
  const removeTag = (t: string) => setTags(tags.filter(x => x !== t));

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#e8e0d0] font-serif flex flex-col">

      {/* ── Header ── */}
      <header className="border-b border-[rgba(212,175,55,0.15)] px-7 flex items-center justify-between h-14 bg-[rgba(15,14,12,0.95)] backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-7">
          <span className="font-serif text-[15px] tracking-[0.15em] text-[#d4af37] uppercase font-normal">
            ✦ Chronicle
          </span>
          <span className="text-[11px] text-white/25 tracking-widest">Blog Editor</span>
        </div>
        <div className="flex items-center gap-3">
          {saved ? (
            <span className="text-[11px] text-[rgba(212,175,55,0.5)] tracking-[0.08em]">
              ✓ Saved {saveTime}
            </span>
          ) : (
            <span className="text-[11px] text-white/20">Saving…</span>
          )}
          <button
            onClick={() => setStatus("draft")}
            className="border border-white/15 rounded bg-transparent text-[#a8a090] px-[18px] py-[7px] text-[12px] tracking-[0.12em] uppercase font-serif cursor-pointer transition-all duration-200 hover:bg-white/5 hover:text-[#c0b8a8] mr-2"
          >
            Save Draft
          </button>
          <button
            onClick={() => setStatus(status === "published" ? "draft" : "published")}
            className={[
              "border border-[#d4af37] rounded px-[18px] py-[7px] text-[12px] tracking-[0.12em] uppercase font-serif cursor-pointer transition-all duration-200",
              status === "published"
                ? "bg-[rgba(212,175,55,0.15)] text-[#d4af37]"
                : "bg-[#d4af37] text-[#0f0e0c]",
            ].join(" ")}
          >
            {status === "published" ? "✓ Published" : "Publish"}
          </button>
        </div>
      </header>

      {/* ── Title Input ── */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post title…"
        className="bg-transparent border-0 border-b border-[rgba(212,175,55,0.2)] outline-none text-[#f0e8d8] font-serif text-[22px] font-normal px-7 py-3 w-full tracking-[0.02em] rounded-none placeholder-white/20"
      />

      {/* ── Toolbar ── */}
      <div className="border-b border-white/[0.07] px-6 py-2 flex items-center gap-0.5 flex-wrap bg-[rgba(18,17,14,0.9)]">
        {/* Mode switcher */}
        <div className="flex mr-3">
          {["write", "split", "preview"].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={[
                "px-3.5 py-[5px] text-[11px] tracking-[0.15em] uppercase font-serif cursor-pointer border-0 border-b-2 transition-all duration-200",
                mode === m
                  ? "bg-[rgba(212,175,55,0.12)] text-[#d4af37] border-b-[#d4af37]"
                  : "bg-transparent text-[#7a7060] border-b-transparent",
              ].join(" ")}
            >
              {m === "write" ? "✏ Write" : m === "split" ? "⊞ Split" : "◉ Preview"}
            </button>
          ))}
        </div>

        <Divider />
        <ToolbarBtn title="Heading 1" onClick={() => insertLine("# ")}>H1</ToolbarBtn>
        <ToolbarBtn title="Heading 2" onClick={() => insertLine("## ")}>H2</ToolbarBtn>
        <ToolbarBtn title="Heading 3" onClick={() => insertLine("### ")}>H3</ToolbarBtn>
        <Divider />
        <ToolbarBtn title="Bold" onClick={() => wrap("**", "**", "bold text")}><strong>B</strong></ToolbarBtn>
        <ToolbarBtn title="Italic" onClick={() => wrap("*", "*", "italic text")}><em>I</em></ToolbarBtn>
        <ToolbarBtn title="Strikethrough" onClick={() => wrap("~~", "~~", "text")}><del>S</del></ToolbarBtn>
        <Divider />
        <ToolbarBtn title="Inline code" onClick={() => wrap("`", "`", "code")}>{"<>"}</ToolbarBtn>
        <ToolbarBtn title="Code block" onClick={() => insertAtCursor("\n```javascript\n// code here\n```\n")}>{"```"}</ToolbarBtn>
        <Divider />
        <ToolbarBtn title="Blockquote" onClick={() => insertLine("> ")}>❝</ToolbarBtn>
        <ToolbarBtn title="Unordered list" onClick={() => insertLine("- ")}>≡</ToolbarBtn>
        <ToolbarBtn title="Ordered list" onClick={() => insertLine("1. ")}>①</ToolbarBtn>
        <Divider />
        <ToolbarBtn title="Link" onClick={() => wrap("[", "](https://)", "link text")}>🔗</ToolbarBtn>
        <ToolbarBtn title="Image" onClick={() => insertAtCursor("![alt text](https://)")}>🖼</ToolbarBtn>
        <ToolbarBtn title="Horizontal rule" onClick={() => insertAtCursor("\n\n---\n\n")}>―</ToolbarBtn>

        <div className="ml-auto flex gap-4 text-[11px] text-white/30 items-center tracking-[0.06em]">
          <span>{stats.words} words</span>
          <span>{stats.chars} chars</span>
          <span>{stats.readTime} min read</span>
        </div>
      </div>

      {/* ── Editor Area ── */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>

        {/* ── Write pane ── */}
        {(mode === "write" || mode === "split") && (
          <div className={`flex-1 flex flex-col overflow-hidden relative ${mode === "split" ? "border-r border-white/6" : ""}`}>
            <div className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase text-[rgba(212,175,55,0.5)] font-serif border-b border-white/5 bg-[rgba(12,11,9,0.8)] flex justify-between items-center">
              <span>Markdown</span>
              <span className="text-white/20 text-[9px]">TAB = 2 spaces</span>
            </div>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={e => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck
              placeholder="Start writing your post in Markdown…"
              className="flex-1 bg-transparent border-0 outline-none text-[#d8d0c0] font-serif text-base leading-[1.85] px-10 py-8 resize-none overflow-y-auto caret-[#d4af37] placeholder-white/15"
            />
          </div>
        )}

        {/* ── Preview pane ── */}
        {(mode === "preview" || mode === "split") && (
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <div className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase text-[rgba(212,175,55,0.5)] font-serif border-b border-white/5 bg-[rgba(12,11,9,0.8)] flex justify-between items-center">
              <span>Preview</span>
            </div>
            <div
              className="md-preview flex-1 overflow-y-auto px-10 py-8 bg-[#0d0c0a]"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
            />
          </div>
        )}

        {/* ── Sidebar ── */}
        <div className="w-[260px] shrink-0 border-l border-white/[0.07] bg-[#0c0b09] p-5 overflow-y-auto flex flex-col gap-5">

          {/* Status */}
          <div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2">
              Status
            </div>
            <div className={[
              "inline-flex items-center gap-[7px] px-3 py-[5px] rounded-[3px] text-[11px] tracking-widest border",
              status === "published"
                ? "bg-[rgba(80,180,80,0.1)] border-[rgba(80,180,80,0.3)] text-[#6fcf6f]"
                : "bg-[rgba(212,175,55,0.08)] border-[rgba(212,175,55,0.2)] text-[#c8a830]",
            ].join(" ")}>
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${status === "published" ? "bg-[#6fcf6f]" : "bg-[#d4af37]"}`} />
              {status === "published" ? "Published" : "Draft"}
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2">
              Tags
            </div>
            <div className="flex flex-wrap gap-[5px] mb-2">
              {tags.map(t => (
                <span key={t} className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.25)] text-[#c8a830] rounded-[3px] px-2 py-0.5 text-[11px] inline-flex items-center gap-[5px] font-mono tracking-[0.05em]">
                  #{t}
                  <button
                    onClick={() => removeTag(t)}
                    className="bg-transparent border-0 text-inherit cursor-pointer p-0 text-[11px] leading-none"
                  >×</button>
                </span>
              ))}
            </div>
            <input
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="Add tag, press Enter"
              className="bg-white/4 border border-white/10 rounded-[3px] text-[#c8c0b0] px-2.5 py-[5px] text-[12px] outline-none w-full font-mono placeholder-white/20"
            />
          </div>

          {/* Cover Image */}
          <div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2 flex justify-between items-center">
              <span>Cover Image</span>
              <button
                onClick={() => setShowCoverInput(!showCoverInput)}
                className="bg-transparent border-0 text-[#d4af37] cursor-pointer text-base leading-none"
              >+</button>
            </div>
            {coverUrl ? (
              <div className="relative">
                <img src={coverUrl} alt="cover" className="w-full h-[100px] object-cover rounded border border-white/10" />
                <button
                  onClick={() => setCoverUrl("")}
                  className="absolute top-1 right-1 bg-black/70 border-0 text-[#ff8888] cursor-pointer rounded px-1.5 py-0.5 text-[11px]"
                >✕</button>
              </div>
            ) : showCoverInput ? (
              <input
                placeholder="Paste image URL…"
                onKeyDown={e => { if (e.key === "Enter") { setCoverUrl((e.target as HTMLInputElement).value); setShowCoverInput(false); } }}
                className="bg-white/4 border border-white/10 rounded-[3px] text-[#c8c0b0] px-2.5 py-[5px] text-[12px] outline-none w-full font-mono placeholder-white/20"
              />
            ) : (
              <div
                onClick={() => setShowCoverInput(true)}
                className="border border-dashed border-white/12 rounded h-[72px] flex items-center justify-center text-white/20 text-[11px] cursor-pointer hover:border-white/20 transition-colors"
              >
                Click to add cover
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2 flex justify-between items-center">
              <span>Excerpt</span>
              <button
                onClick={() => setShowExcerpt(!showExcerpt)}
                className="bg-transparent border-0 text-[#d4af37] cursor-pointer text-base leading-none"
              >+</button>
            </div>
            {showExcerpt && (
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="Write a short excerpt for SEO and previews…"
                rows={3}
                className="bg-white/4 border border-white/10 rounded-[3px] text-[#c8c0b0] px-2.5 py-2 text-[12px] outline-none w-full resize-y leading-relaxed font-serif placeholder-white/20"
              />
            )}
          </div>

          {/* Stats */}
          <div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2">
              Document Stats
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Words",      stats.words],
                ["Characters", stats.chars],
                ["Read time",  `${stats.readTime} min`],
                ["Paragraphs", (content.match(/\n\n/g) || []).length + 1],
              ].map(([label, val]) => (
                <div key={label} className="bg-white/3 rounded border border-white/6 px-2.5 py-2">
                  <div className="text-[17px] text-[#d4af37] font-serif">{val}</div>
                  <div className="text-[9px] text-white/30 tracking-[0.15em] uppercase mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Clear */}
          <div className="mt-auto">
            <button
              onClick={() => { if (window.confirm("Clear editor content?")) setContent(""); }}
              className="w-full bg-transparent border border-[rgba(255,80,80,0.2)] text-[rgba(255,100,100,0.5)] rounded py-[7px] text-[11px] tracking-[0.12em] uppercase font-serif cursor-pointer transition-all duration-200 hover:border-[rgba(255,80,80,0.5)] hover:text-[rgba(255,100,100,0.8)] hover:bg-[rgba(255,0,0,0.05)]"
            >
              Clear Editor
            </button>
          </div>
        </div>
      </div>

      {/* ── Preview Styles (kept as-is) ── */}
      <style>{`
        .md-preview h1 { font-size: 2em; font-weight: normal; color: #f0e8d8; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 10px; margin-bottom: 16px; font-family: 'Georgia', serif; letter-spacing: 0.02em; }
        .md-preview h2 { font-size: 1.5em; font-weight: normal; color: #e8e0d0; margin: 24px 0 10px; font-family: 'Georgia', serif; }
        .md-preview h3 { font-size: 1.2em; font-weight: normal; color: #ddd8c8; margin: 18px 0 8px; font-family: 'Georgia', serif; }
        .md-preview h4,h5,h6 { font-weight: bold; color: #ccc8b8; margin: 12px 0 6px; }
        .md-preview p { color: #c0b8a8; line-height: 1.9; margin: 0 0 14px; }
        .md-preview strong { color: #e8e0d0; }
        .md-preview em { font-style: italic; color: #c8c0b0; }
        .md-preview del { text-decoration: line-through; opacity: 0.5; }
        .md-preview code { background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2); color: #d4af37; padding: 1px 6px; border-radius: 3px; font-family: 'Courier New', monospace; font-size: 0.88em; }
        .md-preview pre { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #d4af37; border-radius: 4px; padding: 18px 20px; overflow-x: auto; margin: 16px 0; }
        .md-preview pre code { background: none; border: none; padding: 0; color: #a8d0a8; font-size: 0.9em; }
        .md-preview blockquote { border-left: 3px solid rgba(212,175,55,0.4); margin: 16px 0; padding: 10px 20px; color: #a0988a; font-style: italic; background: rgba(212,175,55,0.05); }
        .md-preview ul { color: #c0b8a8; padding-left: 24px; margin: 0 0 14px; }
        .md-preview li { margin: 4px 0; line-height: 1.8; }
        .md-preview hr { border: none; border-top: 1px solid rgba(212,175,55,0.2); margin: 28px 0; }
        .md-preview a { color: #d4af37; text-decoration: underline; text-underline-offset: 3px; }
        .md-preview img { max-width: 100%; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); margin: 12px 0; }
        textarea::placeholder { color: rgba(255,255,255,0.15) !important; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.4); }
      `}</style>
    </div>
  );
}