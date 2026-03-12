'use client'
import { useState, useRef, useCallback, useEffect, SetStateAction } from "react";

// ── Markdown parser ────────────────────────────────────────────────────────────
function parseMarkdown(md: string) {
  if (!md) return "";
  return md
    .replace(/^#{6}\s(.+)$/gm, "<h6>$1</h6>")
    .replace(/^#{5}\s(.+)$/gm, "<h5>$1</h5>")
    .replace(/^#{4}\s(.+)$/gm, "<h4>$1</h4>")
    .replace(/^#{3}\s(.+)$/gm, "<h3>$1</h3>")
    .replace(/^#{2}\s(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#{1}\s(.+)$/gm, "<h1>$1</h1>")
    .replace(/^---$/gm, "<hr/>")
    .replace(/^>\s(.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang: string, code: string) =>
      `<pre><code class="lang-${lang}">${code.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    .replace(/==(.+?)==/g, "<mark>$1</mark>")
    .replace(/^\|\|([a-z]+)\|\|(.+)$/gm, (_, align: string, text: string) =>
      `<p style="text-align:${align === "c" ? "center" : align === "r" ? "right" : "left"}">${text.trim()}</p>`)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="display:block"/>')
    .replace(/\[video\]\(([^)]+)\)/g, '<video controls style="max-width:100%;border-radius:4px"><source src="$1"/></video>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^\s*[-*+]\s(.+)$/gm, "<li>$1</li>")
    .replace(/^\s*\d+\.\s(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/^(?!<[a-zA-Z]|$)(.+)$/gm, "<p>$1</p>")
    .replace(/\n{3,}/g, "\n\n");
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function countStats(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return { words, chars: text.length, readTime: Math.max(1, Math.ceil(words / 200)) };
}

let _nextId = 2;
function makeId() { return ++_nextId; }

const WELCOME = `# Welcome to the Blog Editor

Write your story here. This editor supports **full Markdown** syntax.

---

## Features

- **Bold**, *italic*, ~~strikethrough~~, ==highlight==, and \`inline code\`
- Headings H1–H6, blockquotes, lists, tables
- Image & video (URL or local file)
- Text alignment: \`||c|| centred text\`

> "Good writing is clear thinking made visible." — William Wheeler

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

Start editing to see the live preview →
`;

const INITIAL_FILES = [
  { id: 1, title: "Welcome Post", content: WELCOME, savedContent: WELCOME, status: "draft", tags: ["technology"], excerpt: "", coverUrl: "", lastChanged: Date.now() },
];

// ── Toolbar Button ────────────────────────────────────────────────────────────
function ToolbarBtn({ title, onClick, children, active, shortcut }: { title: string; onClick: () => void; children: React.ReactNode; active?: boolean; shortcut?: string }) {
  const tip = shortcut ? `${title} (${shortcut})` : title;
  return (
    <button
      title={tip}
      onClick={onClick}
      className={[
        "relative rounded px-[7px] py-[5px] text-[12px] font-[inherit] leading-none cursor-pointer transition-all duration-150 border group/tb",
        active
          ? "bg-[rgba(212,175,55,0.18)] border-[rgba(212,175,55,0.4)] text-[#d4af37]"
          : "bg-transparent border-transparent text-[#a8a090] hover:bg-white/6 hover:text-[#e8e0d0]",
      ].join(" ")}
    >
      {children}
      {shortcut && (
        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-1.5 py-0.5 bg-[#1e1d1b] border border-white/10 text-[9px] text-white/50 rounded whitespace-nowrap opacity-0 group-hover/tb:opacity-100 transition-opacity z-50">
          {shortcut}
        </span>
      )}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-white/10 mx-0.5 shrink-0" />;
}

// ── Delete-with-undo toast ────────────────────────────────────────────────────
function UndoToast({ title, onUndo, onDismiss }: { title: string; onUndo: () => void; onDismiss: () => void }) {
  const [secs, setSecs] = useState(6);
  useEffect(() => {
    const iv = setInterval(() => setSecs(s => {
      if (s <= 1) { clearInterval(iv); onDismiss(); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(iv);
  }, [onDismiss]);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-300 flex items-center gap-3 bg-[#1e1d1b] border border-white/15 rounded-lg px-4 py-3 shadow-2xl text-[13px] font-serif">
      <span className="text-[#a8a090]">
        <span className="text-[#ff8888]">"{title}"</span> deleted
      </span>
      <button
        onClick={onUndo}
        className="text-[#d4af37] border border-[rgba(212,175,55,0.4)] rounded px-3 py-1 text-[11px] uppercase tracking-widest cursor-pointer hover:bg-[rgba(212,175,55,0.1)] transition-all"
      >Undo ({secs}s)</button>
    </div>
  );
}

// ── Delete file confirm modal ─────────────────────────────────────────────────
function DeleteModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1916] border border-[rgba(212,175,55,0.2)] rounded-lg p-6 w-[360px] shadow-2xl">
        <p className="text-[#d8d0c0] font-serif text-[14px] leading-relaxed mb-1">Delete file?</p>
        <p className="text-[#7a7060] font-serif text-[12px] leading-relaxed mb-5">
          "<span className="text-[#d4af37]">{title}</span>" will be removed. You'll have 6 seconds to undo.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-serif border border-white/15 text-[#a8a090] rounded cursor-pointer hover:bg-white/5 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-serif bg-[rgba(255,80,80,0.15)] border border-[rgba(255,80,80,0.4)] text-[#ff8888] rounded cursor-pointer hover:bg-[rgba(255,80,80,0.25)] transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Table builder modal ───────────────────────────────────────────────────────
function TableModal({ onInsert, onClose }: { onInsert: (text: string) => void; onClose: () => void }) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const MAX = 8;
  const buildTable = () => {
    const header = "| " + Array(cols).fill("Header").map((h, i) => `${h} ${i + 1}`).join(" | ") + " |";
    const sep    = "|" + Array(cols).fill(" --- ").join("|") + "|";
    const body   = Array(rows - 1).fill(null).map(() =>
      "| " + Array(cols).fill("Cell").join(" | ") + " |"
    ).join("\n");
    return "\n" + header + "\n" + sep + "\n" + body + "\n";
  };
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1916] border border-[rgba(212,175,55,0.2)] rounded-lg p-6 w-[340px] shadow-2xl">
        <p className="text-[#d8d0c0] font-serif text-[15px] mb-4">Insert Table</p>
        <div className="mb-3">
          <p className="text-[9px] tracking-[0.2em] uppercase text-[rgba(212,175,55,0.5)] mb-2">Rows × Columns</p>
          <div className="grid grid-cols-8 gap-1">
            {Array(MAX).fill(null).map((_, r) =>
              Array(MAX).fill(null).map((_, c) => (
                <div
                  key={`${r}-${c}`}
                  onMouseEnter={() => { setRows(r + 1); setCols(c + 1); }}
                  onClick={() => { onInsert(buildTable()); onClose(); }}
                  className={[
                    "w-7 h-7 rounded cursor-pointer border transition-all",
                    r < rows && c < cols
                      ? "bg-[rgba(212,175,55,0.25)] border-[rgba(212,175,55,0.5)]"
                      : "bg-white/4 border-white/10 hover:bg-white/8",
                  ].join(" ")}
                />
              ))
            )}
          </div>
          <p className="text-[11px] text-[#d4af37] mt-2 font-serif">{rows} × {cols} table</p>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-serif border border-white/15 text-[#a8a090] rounded cursor-pointer hover:bg-white/5 transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Media dropdown ────────────────────────────────────────────────────────────
function MediaDropdown({ type, onInsert, onClose }: { type: "image" | "video"; onInsert: (text: string) => void; onClose: () => void }) {
  const [tab, setTab] = useState("url"); // "url" | "file"
  const [url, setUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const label = type === "image" ? "Image" : "Video";
  const accept = type === "image" ? "image/*" : "video/*";

  const handleUrl = () => {
    if (!url.trim()) return;
    const syntax = type === "image"
      ? `![image](${url.trim()})`
      : `[video](${url.trim()})`;
    onInsert(syntax);
    onClose();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objUrl = URL.createObjectURL(file);
    const syntax = type === "image"
      ? `![${file.name}](${objUrl})`
      : `[video](${objUrl})`;
    onInsert(syntax);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#1a1916] border border-[rgba(212,175,55,0.2)] rounded-lg p-5 w-[340px] shadow-2xl" onClick={e => e.stopPropagation()}>
        <p className="text-[#d8d0c0] font-serif text-[14px] mb-4">Insert {label}</p>
        <div className="flex mb-4 border-b border-white/[0.07]">
          {["url", "file"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={[
                "px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-serif border-b-2 transition-all cursor-pointer bg-transparent border-0",
                tab === t ? "text-[#d4af37] border-b-[#d4af37]" : "text-[#6a6458] border-b-transparent",
              ].join(" ")}
            >{t === "url" ? "From URL" : "From Device"}</button>
          ))}
        </div>
        {tab === "url" ? (
          <div className="flex flex-col gap-3">
            <input
              autoFocus
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleUrl()}
              placeholder={`Paste ${label.toLowerCase()} URL…`}
              className="bg-white/4 border border-white/10 rounded text-[#c8c0b0] px-3 py-2 text-[12px] outline-none w-full font-mono placeholder-white/20"
            />
            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="px-3 py-1.5 text-[11px] uppercase tracking-widest font-serif border border-white/15 text-[#a8a090] rounded cursor-pointer hover:bg-white/5">Cancel</button>
              <button onClick={handleUrl} className="px-3 py-1.5 text-[11px] uppercase tracking-widest font-serif bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] text-[#d4af37] rounded cursor-pointer hover:bg-[rgba(212,175,55,0.25)]">Insert</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div
              onClick={() => fileRef.current?.click()}
              className="border border-dashed border-white/20 rounded h-20 flex flex-col items-center justify-center text-white/30 text-[12px] cursor-pointer hover:border-[rgba(212,175,55,0.3)] hover:text-[rgba(212,175,55,0.5)] transition-colors font-serif gap-1"
            >
              <span className="text-2xl">{type === "image" ? "🖼" : "🎬"}</span>
              <span>Click to choose {label.toLowerCase()}</span>
            </div>
            <input ref={fileRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
            <button onClick={onClose} className="self-end px-3 py-1.5 text-[11px] uppercase tracking-widest font-serif border border-white/15 text-[#a8a090] rounded cursor-pointer hover:bg-white/5">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── File Tab ──────────────────────────────────────────────────────────────────
function FileTab({ file, active, onClick, onDelete, onRename }: { file: typeof INITIAL_FILES[0]; active: boolean; onClick: () => void; onDelete: () => void; onRename: (title: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(file.title);
  const inputRef              = useRef<HTMLInputElement>(null);
  const isDirty               = file.content !== file.savedContent;

  useEffect(() => { if (editing) inputRef.current?.select(); }, [editing]);

  const commit = () => {
    if (draft.trim()) onRename(draft.trim());
    setEditing(false);
  };

  return (
    <div
      onClick={onClick}
      onDoubleClick={() => { setDraft(file.title); setEditing(true); }}
      title="Double-click to rename"
      className={[
        "group flex items-center gap-1.5 px-3 py-[9px] cursor-pointer border-r border-white/6 shrink-0 max-w-[180px] transition-all duration-150 select-none",
        active
          ? "bg-[#0f0e0c] border-b-2 border-b-[#d4af37] text-[#e8e0d0]"
          : "bg-[#0a0908] border-b-2 border-b-transparent text-[#6a6458] hover:bg-[#0d0c0a] hover:text-[#a8a090]",
      ].join(" ")}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${isDirty ? "bg-[#d4af37]" : "bg-transparent"}`} />
      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
          onClick={e => e.stopPropagation()}
          className="bg-transparent outline-none border-b border-[#d4af37] text-[#e8e0d0] text-[12px] font-serif w-full min-w-0"
        />
      ) : (
        <span className="text-[12px] font-serif truncate">{file.title}</span>
      )}
      <button
        onClick={e => { e.stopPropagation(); onDelete(); }}
        title="Delete file"
        className="ml-auto shrink-0 text-[#6a6458] hover:text-[#ff8888] transition-colors opacity-0 group-hover:opacity-100 text-[12px] leading-none border-0 bg-transparent cursor-pointer"
      >×</button>
    </div>
  );
}

// ── Main Editor ───────────────────────────────────────────────────────────────
export default function BlogEditor() {
  const [files, setFiles]           = useState(INITIAL_FILES);
  const [activeId, setActiveId]     = useState(1);
  const [mode, setMode]             = useState("split");
  const [tagInput, setTagInput]     = useState("");
  const [showCoverInput, setShowCoverInput] = useState(false);
  const [showExcerpt, setShowExcerpt]       = useState(false);
  const [saveFlash, setSaveFlash]           = useState(false);
  const [showMoreFiles, setShowMoreFiles]   = useState(false);
  const [deleteModal, setDeleteModal]       = useState<{ id: number; title: string } | null>(null); // { id, title }
  const [undoToast, setUndoToast]           = useState<{ title: string } | null>(null); // { title }
  const [showTableModal, setShowTableModal] = useState(false);
  const [mediaModal, setMediaModal]         = useState<"image" | "video" | null>(null); // "image" | "video"
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const undoDataRef = useRef<{ files: typeof INITIAL_FILES; activeId: number } | null>(null); // holds { files, activeId } snapshot for undo

  const active = files.find(f => f.id === activeId) || files[0];
  const stats  = countStats(active?.content || "");
  const isDirty = active && active.content !== active.savedContent;

  // ── File mutations ────────────────────────────────────────────────────────
  const updateActive = useCallback((patch: Partial<typeof INITIAL_FILES[0]>) => {
    setFiles(fs => fs.map(f =>
      f.id === activeId ? { ...f, ...patch, lastChanged: Date.now() } : f
    ));
  }, [activeId]);

  const saveFile = useCallback(() => {
    setFiles(fs => fs.map(f => f.id === activeId ? { ...f, savedContent: f.content } : f));
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1800);
  }, [activeId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: { ctrlKey: any; metaKey: any; key: string; preventDefault: () => void; }) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const ta = textareaRef.current;
      const focused = document.activeElement === ta;

      if (e.key === "s") { e.preventDefault(); saveFile(); return; }
      if (!focused) return;

      const actions: Record<string, () => void> = {
        b: () => wrapText("**", "**", "bold text"),
        i: () => wrapText("*", "*", "italic text"),
        u: () => wrapText("~~", "~~", "text"),             // Ctrl+U = strikethrough
        k: () => wrapText("[", "](https://)", "link text"),// Ctrl+K = link
        "`": () => wrapText("`", "`", "code"),
        e: () => wrapText("==", "==", "highlight"),        // Ctrl+E = highlight
      };
      if (e.key in actions) { e.preventDefault(); actions[e.key](); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [saveFile]); // wrapText refs stable via ref below

  // ── Switch file (no modal — just switch, unsaved data stays in memory) ──
  const switchTo = useCallback((id: SetStateAction<number>) => {
    if (id === activeId) return;
    setActiveId(id);
    setTagInput("");
    setShowCoverInput(false);
    setShowExcerpt(false);
  }, [activeId]);

  // ── New file (no number in name) ──────────────────────────────────────────
  const newFile = () => {
    const id = makeId();
    const f = { id, title: "Untitled", content: "", savedContent: "", status: "draft", tags: [], excerpt: "", coverUrl: "", lastChanged: Date.now() };
    setFiles(fs => [...fs, f]);
    setActiveId(id);
    setTagInput("");
    setShowCoverInput(false);
    setShowExcerpt(false);
  };

  // ── Delete file (with undo) ───────────────────────────────────────────────
  const requestDelete = (id: number) => {
    const target = files.find(f => f.id === id);
    if (!target) return;
    setDeleteModal({ id, title: target.title });
  };

  const confirmDelete = () => {
    if (!deleteModal) return;
    const { id } = deleteModal;
    // Snapshot for undo
    undoDataRef.current = { files: [...files], activeId };
    setFiles(fs => {
      const remaining = fs.filter(f => f.id !== id);
      if (remaining.length === 0) {
        const newF = { id: makeId(), title: "Untitled", content: "", savedContent: "", status: "draft", tags: [], excerpt: "", coverUrl: "", lastChanged: Date.now() };
        setActiveId(newF.id);
        return [newF];
      }
      if (id === activeId) setActiveId(remaining[remaining.length - 1].id);
      return remaining;
    });
    setUndoToast({ title: deleteModal.title });
    setDeleteModal(null);
  };

  const doUndo = () => {
    if (undoDataRef.current) {
      setFiles(undoDataRef.current.files);
      setActiveId(undoDataRef.current.activeId);
      undoDataRef.current = null;
    }
    setUndoToast(null);
  };

  const dismissUndo = () => { undoDataRef.current = null; setUndoToast(null); };

  const renameFile = (id: number, title: string) => {
    setFiles(fs => fs.map(f => f.id === id ? { ...f, title } : f));
  };

  // ── Heading insertion — strips existing heading prefix first ──────────────
  const insertHeading = useCallback((level: number) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const content = active.content;
    const pos      = ta.selectionStart;
    const lineStart = content.lastIndexOf("\n", pos - 1) + 1;
    const lineEnd   = content.indexOf("\n", pos);
    const lineEnd2  = lineEnd === -1 ? content.length : lineEnd;
    const line      = content.slice(lineStart, lineEnd2);
    // Strip any existing heading prefix
    const stripped  = line.replace(/^#{1,6}\s?/, "");
    const prefix    = "#".repeat(level) + " ";
    const next      = content.slice(0, lineStart) + prefix + stripped + content.slice(lineEnd2);
    updateActive({ content: next });
    const newPos = lineStart + prefix.length + stripped.length;
    setTimeout(() => { ta.focus(); ta.setSelectionRange(newPos, newPos); }, 0);
  }, [active?.content, updateActive]);

  // ── Wrap / insert helpers ─────────────────────────────────────────────────
  // Store wrapText in a ref so the keydown handler always has latest version
  const wrapTextRef = useRef<(before: string | any[], after?: string | any[], placeholder?: string) => void>(null);
  const wrapText = useCallback((before: string | any[], after = before, placeholder = "text") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const content = active.content;
    const start = ta.selectionStart, end = ta.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const next = content.slice(0, start) + before + selected + after + content.slice(end);
    updateActive({ content: next });
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + before.length, start + before.length + selected.length); }, 0);
  }, [active?.content, updateActive]);
  wrapTextRef.current = wrapText;

  const insertLine = useCallback((prefix: string | any[]) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const content = active.content;
    const pos = ta.selectionStart;
    const lineStart = content.lastIndexOf("\n", pos - 1) + 1;
    const next = content.slice(0, lineStart) + prefix + content.slice(lineStart);
    updateActive({ content: next });
    setTimeout(() => { ta.focus(); ta.setSelectionRange(lineStart + prefix.length, lineStart + prefix.length); }, 0);
  }, [active?.content, updateActive]);

  const insertAtCursor = useCallback((text: string | any[]) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const content = active.content;
    const start = ta.selectionStart;
    const next = content.slice(0, start) + text + content.slice(start);
    updateActive({ content: next });
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + text.length, start + text.length); }, 0);
  }, [active?.content, updateActive]);

  // Alignment: insert alignment syntax on current line
  const insertAlign = useCallback((dir: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const content = active.content;
    const pos = ta.selectionStart;
    const lineStart = content.lastIndexOf("\n", pos - 1) + 1;
    const lineEnd   = (() => { const i = content.indexOf("\n", pos); return i === -1 ? content.length : i; })();
    const line = content.slice(lineStart, lineEnd);
    const stripped = line.replace(/^\|\|[lcr]\|\|\s?/, "");
    const code = dir === "center" ? "c" : dir === "right" ? "r" : "l";
    const next = content.slice(0, lineStart) + `||${code}|| ` + stripped + content.slice(lineEnd);
    updateActive({ content: next });
    setTimeout(() => { ta.focus(); }, 0);
  }, [active?.content, updateActive]);

  const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === "Tab") { e.preventDefault(); insertAtCursor("  "); }
  };

  const addTag = (e: { key: string; preventDefault: () => void; }) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().replace(/,/g, "");
      if (t && !active.tags.includes(t)) updateActive({ tags: [...active.tags, t] });
      setTagInput("");
    }
  };
  const removeTag = (t: string) => updateActive({ tags: active.tags.filter(x => x !== t) });

  const downloadMd = () => {
    const blob = new Blob([active.content], { type: "text/markdown" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `${active.title.replace(/\s+/g, "-")}.md`; a.click();
    URL.revokeObjectURL(url);
  };

  // ── Sidebar files: sorted by lastChanged, max 4 shown, see-more toggle ───
  const sortedFiles = [...files].sort((a, b) => (b.lastChanged || 0) - (a.lastChanged || 0));
  const visibleFiles = showMoreFiles ? sortedFiles : sortedFiles.slice(0, 4);

  if (!active) return null;

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#e8e0d0] font-serif flex flex-col">

      {/* ── Modals ── */}
      {deleteModal && (
        <DeleteModal
          title={deleteModal.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteModal(null)}
        />
      )}
      {showTableModal && (
        <TableModal
          onInsert={(t) => insertAtCursor(t)}
          onClose={() => setShowTableModal(false)}
        />
      )}
      {mediaModal && (
        <MediaDropdown
          type={mediaModal}
          onInsert={(t) => insertAtCursor(t)}
          onClose={() => setMediaModal(null)}
        />
      )}
      {undoToast && (
        <UndoToast
          title={undoToast.title}
          onUndo={doUndo}
          onDismiss={dismissUndo}
        />
      )}

      {/* ── Sticky top wrapper ── */}
      <div className="sticky top-0 z-50 flex flex-col bg-[#0f0e0c]">

        {/* ── Header ── */}
        <header className="border-b border-[rgba(212,175,55,0.15)] px-7 flex items-center justify-between h-14 bg-[rgba(15,14,12,0.97)] backdrop-blur-md">
          <div className="flex items-center gap-7">
            <span className="font-serif text-[15px] tracking-[0.15em] text-[#d4af37] uppercase font-normal">✦ Chronicle</span>
            <span className="text-[11px] text-white/25 tracking-widest">Blog Editor</span>
          </div>
          <div className="flex items-center gap-3">
            {saveFlash
              ? <span className="text-[11px] text-[rgba(212,175,55,0.7)] tracking-[0.08em]">✓ Saved</span>
              : isDirty
                ? <span className="text-[11px] text-[rgba(255,160,60,0.6)] tracking-[0.06em]">● Unsaved</span>
                : <span className="text-[11px] text-white/20 tracking-[0.06em]">Up to date</span>
            }
            <button onClick={downloadMd} title="Export as .md file" className="border border-white/15 rounded bg-transparent text-[#a8a090] px-3.5 py-1.5 text-[11px] tracking-widest uppercase font-serif cursor-pointer transition-all hover:bg-white/5 hover:text-[#c0b8a8]">
              ↓ Export
            </button>
            <button
              onClick={saveFile}
              title="Save (Ctrl+S)"
              className={["border rounded px-3.5 py-1.5 text-[11px] tracking-widest uppercase font-serif cursor-pointer transition-all",
                isDirty ? "border-[rgba(212,175,55,0.5)] text-[#d4af37] hover:bg-[rgba(212,175,55,0.1)]" : "border-white/10 text-white/20 cursor-default",
              ].join(" ")}
            >⌘ Save</button>
            <button
              onClick={() => updateActive({ status: active.status === "published" ? "draft" : "published" })}
              className={["border border-[#d4af37] rounded px-[18px] py-1.5 text-[12px] tracking-[0.12em] uppercase font-serif cursor-pointer transition-all",
                active.status === "published" ? "bg-[rgba(212,175,55,0.15)] text-[#d4af37]" : "bg-[#d4af37] text-[#0f0e0c]",
              ].join(" ")}
            >{active.status === "published" ? "✓ Published" : "Publish"}</button>
          </div>
        </header>

        {/* ── File Tabs ── */}
        <div className="flex items-stretch bg-[#0a0908] border-b border-white/[0.07] overflow-x-auto">
          {files.map(f => (
            <FileTab
              key={f.id}
              file={f}
              active={f.id === activeId}
              onClick={() => switchTo(f.id)}
              onDelete={() => requestDelete(f.id)}
              onRename={(title) => renameFile(f.id, title)}
            />
          ))}
          <button
            onClick={newFile}
            title="New file (Ctrl+Alt+N)"
            className="px-4 text-[#6a6458] hover:text-[#d4af37] hover:bg-[rgba(212,175,55,0.06)] transition-all border-0 bg-transparent cursor-pointer text-lg leading-none shrink-0"
          >+</button>
        </div>

        {/* ── Title Input ── */}
        <input
          key={activeId}
          value={active.title}
          onChange={e => updateActive({ title: e.target.value })}
          placeholder="Post title…"
          className="bg-[#0f0e0c] border-0 border-b border-[rgba(212,175,55,0.2)] outline-none text-[#f0e8d8] font-serif text-[22px] font-normal px-7 py-3 w-full tracking-[0.02em] rounded-none placeholder-white/20"
        />

        {/* ── Toolbar ── */}
        <div className="border-b border-white/[0.07] px-4 py-1.5 flex items-center gap-0.5 flex-wrap bg-[rgba(12,11,9,0.98)]">
          {/* View modes */}
          <div className="flex mr-2">
            {["write", "split", "preview"].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={["px-3 py-[5px] text-[10px] tracking-[0.15em] uppercase font-serif cursor-pointer border-0 border-b-2 transition-all",
                  mode === m ? "bg-[rgba(212,175,55,0.12)] text-[#d4af37] border-b-[#d4af37]" : "bg-transparent text-[#7a7060] border-b-transparent",
                ].join(" ")}
              >{m === "write" ? "✏ Write" : m === "split" ? "⊞ Split" : "◉ Preview"}</button>
            ))}
          </div>

          <Divider />

          {/* Headings */}
          {[1,2,3,4,5,6].map(n => (
            <ToolbarBtn key={n} title={`Heading ${n}`} shortcut={`Ctrl+${n}`} onClick={() => insertHeading(n)}>
              H{n}
            </ToolbarBtn>
          ))}

          <Divider />

          {/* Inline formatting */}
          <ToolbarBtn title="Bold" shortcut="Ctrl+B" onClick={() => wrapText("**", "**", "bold text")}><strong>B</strong></ToolbarBtn>
          <ToolbarBtn title="Italic" shortcut="Ctrl+I" onClick={() => wrapText("*", "*", "italic text")}><em>I</em></ToolbarBtn>
          <ToolbarBtn title="Strikethrough" shortcut="Ctrl+U" onClick={() => wrapText("~~", "~~", "text")}><del>S</del></ToolbarBtn>
          <ToolbarBtn title="Highlight" shortcut="Ctrl+E" onClick={() => wrapText("==", "==", "highlight")}>
            <span className="bg-yellow-400/30 px-0.5 rounded text-yellow-300 text-[11px]">H</span>
          </ToolbarBtn>

          <Divider />

          {/* Code */}
          <ToolbarBtn title="Inline code" shortcut="Ctrl+`" onClick={() => wrapText("`", "`", "code")}>{"<>"}</ToolbarBtn>
          <ToolbarBtn title="Code block" shortcut="Ctrl+Shift+`" onClick={() => insertAtCursor("\n```javascript\n// code here\n```\n")}>{"```"}</ToolbarBtn>

          <Divider />

          {/* Block elements */}
          <ToolbarBtn title="Blockquote" shortcut="Ctrl+Q" onClick={() => insertLine("> ")}>❝</ToolbarBtn>
          <ToolbarBtn title="Unordered list" shortcut="Ctrl+L" onClick={() => insertLine("- ")}>≡</ToolbarBtn>
          <ToolbarBtn title="Ordered list" shortcut="Ctrl+Shift+L" onClick={() => insertLine("1. ")}>①</ToolbarBtn>
          <ToolbarBtn title="Horizontal rule" onClick={() => insertAtCursor("\n\n---\n\n")}>―</ToolbarBtn>

          <Divider />

          {/* Table */}
          <ToolbarBtn title="Insert table" shortcut="Ctrl+T" onClick={() => setShowTableModal(true)}>⊞</ToolbarBtn>

          <Divider />

          {/* Link */}
          <ToolbarBtn title="Link" shortcut="Ctrl+K" onClick={() => wrapText("[", "](https://)", "link text")}>🔗</ToolbarBtn>

          {/* Image */}
          <ToolbarBtn title="Image" shortcut="Ctrl+G" onClick={() => setMediaModal("image")}>🖼</ToolbarBtn>

          {/* Video */}
          <ToolbarBtn title="Video" shortcut="Ctrl+Shift+V" onClick={() => setMediaModal("video")}>🎬</ToolbarBtn>

          <Divider />

          {/* Alignment */}
          <ToolbarBtn title="Align left" shortcut="Ctrl+Shift+L" onClick={() => insertAlign("left")}>
            <svg width="13" height="12" viewBox="0 0 14 12" fill="currentColor"><rect y="0" width="14" height="2"/><rect y="4" width="10" height="2"/><rect y="8" width="12" height="2"/></svg>
          </ToolbarBtn>
          <ToolbarBtn title="Align center" shortcut="Ctrl+Shift+E" onClick={() => insertAlign("center")}>
            <svg width="13" height="12" viewBox="0 0 14 12" fill="currentColor"><rect y="0" width="14" height="2"/><rect x="2" y="4" width="10" height="2"/><rect x="1" y="8" width="12" height="2"/></svg>
          </ToolbarBtn>
          <ToolbarBtn title="Align right" shortcut="Ctrl+Shift+R" onClick={() => insertAlign("right")}>
            <svg width="13" height="12" viewBox="0 0 14 12" fill="currentColor"><rect y="0" width="14" height="2"/><rect x="4" y="4" width="10" height="2"/><rect x="2" y="8" width="12" height="2"/></svg>
          </ToolbarBtn>

          {/* Stats */}
          <div className="ml-auto flex gap-3 text-[10px] text-white/25 items-center tracking-[0.06em]">
            <span>{stats.words}w</span>
            <span>{stats.chars}c</span>
            <span>{stats.readTime}m</span>
          </div>
        </div>
      </div>{/* end sticky wrapper */}

      {/* ── Editor Area ── */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 196px)" }}>

        {/* Write pane */}
        {(mode === "write" || mode === "split") && (
          <div className={`flex-1 flex flex-col overflow-hidden relative ${mode === "split" ? "border-r border-white/6" : ""}`}>
            <div className="px-5 py-1.5 text-[9px] tracking-[0.2em] uppercase text-[rgba(212,175,55,0.4)] font-serif border-b border-white/5 bg-[rgba(10,9,8,0.9)] flex justify-between items-center">
              <span>Markdown</span>
              <span className="text-white/15">TAB = indent · Ctrl+S = save</span>
            </div>
            <textarea
              key={activeId}
              ref={textareaRef}
              value={active.content}
              onChange={e => updateActive({ content: e.target.value })}
              onKeyDown={handleKeyDown}
              spellCheck
              placeholder="Start writing…"
              className="flex-1 bg-transparent border-0 outline-none text-[#d8d0c0] font-serif text-base leading-[1.85] px-10 py-8 resize-none overflow-y-auto caret-[#d4af37] placeholder-white/12"
            />
          </div>
        )}

        {/* Preview pane */}
        {(mode === "preview" || mode === "split") && (
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <div className="px-5 py-1.5 text-[9px] tracking-[0.2em] uppercase text-[rgba(212,175,55,0.4)] font-serif border-b border-white/5 bg-[rgba(10,9,8,0.9)] flex justify-between items-center">
              <span>Preview</span>
            </div>
            <div
              className="md-preview flex-1 overflow-y-auto px-10 py-8 bg-[#0d0c0a]"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(active.content) }}
            />
          </div>
        )}

        {/* Sidebar */}
        <div className="w-[252px] shrink-0 border-l border-white/[0.07] bg-[#0c0b09] px-4 py-4 overflow-y-auto flex flex-col gap-4">

          {/* Status */}
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2">Status</p>
            <div className={["inline-flex items-center gap-[7px] px-3 py-[5px] rounded-[3px] text-[11px] tracking-widest border",
              active.status === "published"
                ? "bg-[rgba(80,180,80,0.1)] border-[rgba(80,180,80,0.3)] text-[#6fcf6f]"
                : "bg-[rgba(212,175,55,0.08)] border-[rgba(212,175,55,0.2)] text-[#c8a830]",
            ].join(" ")}>
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${active.status === "published" ? "bg-[#6fcf6f]" : "bg-[#d4af37]"}`} />
              {active.status === "published" ? "Published" : "Draft"}
            </div>
          </div>

          {/* Files list — latest 4 + see more */}
          <div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2 flex justify-between items-center">
              <span>Files ({files.length})</span>
              <button onClick={newFile} className="bg-transparent border-0 text-[#d4af37] cursor-pointer text-base leading-none hover:text-white transition-colors" title="New file">+</button>
            </div>
            <div className="flex flex-col gap-0.5">
              {visibleFiles.map(f => {
                const dirty = f.content !== f.savedContent;
                return (
                  <div key={f.id} className="group/sf flex items-center gap-2 px-2 py-[5px] rounded cursor-pointer transition-all text-[12px] font-serif"
                    style={{ background: f.id === activeId ? "rgba(212,175,55,0.08)" : "transparent" }}
                    onClick={() => switchTo(f.id)}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dirty ? "bg-[#d4af37]" : "bg-white/10"}`} />
                    <span className={`truncate flex-1 ${f.id === activeId ? "text-[#e8e0d0]" : "text-[#7a7060] group-hover/sf:text-[#a8a090]"}`}>{f.title}</span>
                    <button
                      onClick={e => { e.stopPropagation(); requestDelete(f.id); }}
                      className="opacity-0 group-hover/sf:opacity-100 text-[#6a6458] hover:text-[#ff8888] border-0 bg-transparent cursor-pointer text-[11px] leading-none transition-all shrink-0"
                    >×</button>
                  </div>
                );
              })}
            </div>
            {files.length > 4 && (
              <button
                onClick={() => setShowMoreFiles(v => !v)}
                className="mt-1 text-[10px] text-[rgba(212,175,55,0.5)] hover:text-[#d4af37] cursor-pointer bg-transparent border-0 font-serif tracking-widest transition-colors w-full text-left"
              >{showMoreFiles ? "▲ Show less" : `▼ ${files.length - 4} more…`}</button>
            )}
          </div>

          {/* Tags */}
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2">Tags</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {active.tags.map(t => (
                <span key={t} className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.25)] text-[#c8a830] rounded-[3px] px-2 py-0.5 text-[11px] inline-flex items-center gap-1 font-mono tracking-[0.05em]">
                  #{t}
                  <button onClick={() => removeTag(t)} className="bg-transparent border-0 text-inherit cursor-pointer p-0 text-[11px] leading-none">×</button>
                </span>
              ))}
            </div>
            <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag}
              placeholder="Add tag, press Enter"
              className="bg-white/4 border border-white/10 rounded-[3px] text-[#c8c0b0] px-2.5 py-[5px] text-[12px] outline-none w-full font-mono placeholder-white/20"
            />
          </div>

          {/* Cover Image */}
          <div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2 flex justify-between items-center">
              <span>Cover Image</span>
              <button onClick={() => setShowCoverInput(v => !v)} className="bg-transparent border-0 text-[#d4af37] cursor-pointer text-base leading-none">+</button>
            </div>
            {active.coverUrl ? (
              <div className="relative">
                <img src={active.coverUrl} alt="cover" className="w-full h-[90px] object-cover rounded border border-white/10" />
                <button onClick={() => updateActive({ coverUrl: "" })} className="absolute top-1 right-1 bg-black/70 border-0 text-[#ff8888] cursor-pointer rounded px-1.5 py-0.5 text-[11px]">✕</button>
              </div>
            ) : showCoverInput ? (
              <input placeholder="Paste image URL…"
                onKeyDown={e => { if (e.key === "Enter") { updateActive({ coverUrl: (e.target as HTMLInputElement).value }); setShowCoverInput(false); } }}
                className="bg-white/4 border border-white/10 rounded-[3px] text-[#c8c0b0] px-2.5 py-[5px] text-[12px] outline-none w-full font-mono placeholder-white/20"
              />
            ) : (
              <div onClick={() => setShowCoverInput(true)} className="border border-dashed border-white/12 rounded h-[60px] flex items-center justify-center text-white/20 text-[11px] cursor-pointer hover:border-white/20 transition-colors">
                Click to add cover
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2 flex justify-between items-center">
              <span>Excerpt</span>
              <button onClick={() => setShowExcerpt(v => !v)} className="bg-transparent border-0 text-[#d4af37] cursor-pointer text-base leading-none">+</button>
            </div>
            {showExcerpt && (
              <textarea value={active.excerpt} onChange={e => updateActive({ excerpt: e.target.value })}
                placeholder="Short excerpt for SEO…" rows={3}
                className="bg-white/4 border border-white/10 rounded-[3px] text-[#c8c0b0] px-2.5 py-2 text-[12px] outline-none w-full resize-y leading-relaxed font-serif placeholder-white/20"
              />
            )}
          </div>

          {/* Stats */}
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(212,175,55,0.4)] font-serif mb-2">Stats</p>
            <div className="grid grid-cols-2 gap-1.5">
              {[["Words", stats.words], ["Chars", stats.chars], ["Read", `${stats.readTime}m`], ["¶", (active.content.match(/\n\n/g) || []).length + 1]].map(([label, val]) => (
                <div key={label} className="bg-white/3 rounded border border-white/5 px-2 py-1.5">
                  <div className="text-[15px] text-[#d4af37] font-serif">{val}</div>
                  <div className="text-[8px] text-white/25 tracking-[0.12em] uppercase mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Clear */}
          <div className="mt-auto pt-2">
            <button
              onClick={() => { if (window.confirm("Clear this file's content?")) updateActive({ content: "" }); }}
              className="w-full bg-transparent border border-[rgba(255,80,80,0.2)] text-[rgba(255,100,100,0.45)] rounded py-1.5 text-[10px] tracking-[0.12em] uppercase font-serif cursor-pointer transition-all hover:border-[rgba(255,80,80,0.5)] hover:text-[rgba(255,100,100,0.8)] hover:bg-[rgba(255,0,0,0.05)]"
            >Clear Editor</button>
          </div>
        </div>
      </div>

      {/* ── Preview & scrollbar styles (kept as-is) ── */}
      <style>{`
        .md-preview h1 { font-size: 2em; font-weight: normal; color: #f0e8d8; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 10px; margin-bottom: 16px; font-family: 'Georgia', serif; letter-spacing: 0.02em; }
        .md-preview h2 { font-size: 1.5em; font-weight: normal; color: #e8e0d0; margin: 24px 0 10px; font-family: 'Georgia', serif; }
        .md-preview h3 { font-size: 1.2em; font-weight: normal; color: #ddd8c8; margin: 18px 0 8px; font-family: 'Georgia', serif; }
        .md-preview h4,h5,h6 { font-weight: bold; color: #ccc8b8; margin: 12px 0 6px; }
        .md-preview p { color: #c0b8a8; line-height: 1.9; margin: 0 0 14px; }
        .md-preview strong { color: #e8e0d0; }
        .md-preview em { font-style: italic; color: #c8c0b0; }
        .md-preview del { text-decoration: line-through; opacity: 0.5; }
        .md-preview mark { background: rgba(250,210,60,0.25); color: #f5d76e; padding: 1px 3px; border-radius: 2px; }
        .md-preview code { background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2); color: #d4af37; padding: 1px 6px; border-radius: 3px; font-family: 'Courier New', monospace; font-size: 0.88em; }
        .md-preview pre { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #d4af37; border-radius: 4px; padding: 18px 20px; overflow-x: auto; margin: 16px 0; }
        .md-preview pre code { background: none; border: none; padding: 0; color: #a8d0a8; font-size: 0.9em; }
        .md-preview blockquote { border-left: 3px solid rgba(212,175,55,0.4); margin: 16px 0; padding: 10px 20px; color: #a0988a; font-style: italic; background: rgba(212,175,55,0.05); }
        .md-preview ul { color: #c0b8a8; padding-left: 24px; margin: 0 0 14px; }
        .md-preview li { margin: 4px 0; line-height: 1.8; }
        .md-preview hr { border: none; border-top: 1px solid rgba(212,175,55,0.2); margin: 28px 0; }
        .md-preview a { color: #d4af37; text-decoration: underline; text-underline-offset: 3px; }
        .md-preview img { max-width: 100%; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); margin: 12px 0; }
        .md-preview video { max-width: 100%; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); margin: 12px 0; }
        .md-preview table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.93em; }
        .md-preview th { background: rgba(212,175,55,0.1); color: #d4af37; padding: 8px 12px; border: 1px solid rgba(212,175,55,0.2); text-align: left; font-weight: normal; letter-spacing: 0.05em; }
        .md-preview td { padding: 7px 12px; border: 1px solid rgba(255,255,255,0.07); color: #b8b0a0; }
        .md-preview tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
        textarea::placeholder { color: rgba(255,255,255,0.12) !important; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.18); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.35); }
      `}</style>
    </div>
  );
}