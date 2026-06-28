import { useEffect, useRef, useState } from "react";
import { Copy, ThumbsUp, ThumbsDown, AlertTriangle, Check, Info } from "lucide-react";

type Citation = {
  title?: string;
  text?: string;
  url?: string;
};

type MatchedCase = {
  title?: string;
  citations?: Citation[];
  law?: string;
  source?: string;
  [k: string]: unknown;
} | null;

type AuraResponse = {
  reply: string;
  matched_case: MatchedCase;
  crisis_category: string | null;
  crisis_message: string | null;
  disclaimer: string;
};

type Msg =
  | { id: string; role: "user"; text: string }
  | {
      id: string;
      role: "aura";
      text: string;
      matched_case: MatchedCase;
      crisis_category: string | null;
      crisis_message: string | null;
      disclaimer: string;
      feedback?: "up" | "down";
    }
  | { id: string; role: "error"; text: string; kind: "network" | "server" | "offline" };

const API_URL = "https://fast-api-fb40.onrender.com/chat";

const SUGGESTED = "My landlord won't return my deposit — what can I do?";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function ChatEmbed({ id = "chat" }: { id?: string }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [offline, setOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    const userMsg: Msg = { id: uid(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setPending(true);

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: "error",
          kind: "offline",
          text: "You're offline. Reconnect and try again — your question is still here.",
        },
      ]);
      setPending(false);
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            role: "error",
            kind: "server",
            text: "Something went wrong on our end. Please try again in a moment.",
          },
        ]);
        return;
      }
      const data = (await res.json()) as AuraResponse;
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: "aura",
          text: data.reply || "",
          matched_case: data.matched_case ?? null,
          crisis_category: data.crisis_category ?? null,
          crisis_message: data.crisis_message ?? null,
          disclaimer:
            data.disclaimer ||
            "Legal information, not legal advice. For complex situations, please consult a qualified lawyer.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: "error",
          kind: "network",
          text: "Couldn't reach AURA. Please check your connection and try again.",
        },
      ]);
    } finally {
      setPending(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  function copy(id: string, text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1600);
    });
  }

  function setFeedback(id: string, value: "up" | "down") {
    setMessages((m) =>
      m.map((msg) =>
        msg.id === id && msg.role === "aura" ? { ...msg, feedback: value } : msg,
      ),
    );
  }

  return (
    <div
      id={id}
      className="rounded-2xl bg-surface border border-hairline p-5 sm:p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] flex flex-col"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="aura-pulse h-2 w-2 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground tracking-wide">
            AURA · online
          </span>
        </div>
        <span className="text-[10px] text-dim uppercase tracking-widest">Private</span>
      </div>

      {offline && (
        <div
          role="status"
          className="mb-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200"
        >
          You're offline. AURA will respond once you reconnect.
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex-1 min-h-[260px] max-h-[440px] overflow-y-auto pr-1 space-y-3"
        aria-live="polite"
        aria-label="Conversation with AURA"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-start gap-3">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-[#0B1220] border border-hairline px-4 py-3 text-sm leading-relaxed text-foreground/90">
              Hi — I'm AURA. Ask me anything about your legal rights, in your own
              words. I'll explain what applies and what you can do next.
            </div>
            <button
              type="button"
              onClick={() => send(SUGGESTED)}
              className="text-xs text-accent border border-hairline hover:border-accent rounded-full px-3 py-1.5 transition"
            >
              Try: {SUGGESTED}
            </button>
          </div>
        )}

        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-surface-elevated border border-hairline px-4 py-3 text-sm">
                {m.text}
              </div>
            </div>
          ) : m.role === "error" ? (
            <div
              key={m.id}
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <div className="flex-1">
                <div>{m.text}</div>
                <button
                  type="button"
                  onClick={() => {
                    setMessages((all) => all.filter((x) => x.id !== m.id));
                  }}
                  className="mt-2 text-xs underline underline-offset-4 hover:text-red-100"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ) : (
            <AuraBubble
              key={m.id}
              msg={m}
              copied={copiedId === m.id}
              onCopy={() => copy(m.id, m.text)}
              onFeedback={(v) => setFeedback(m.id, v)}
            />
          ),
        )}

        {pending && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md bg-[#0B1220] border border-hairline px-4 py-3 text-sm text-muted-foreground inline-flex items-center gap-2">
              <span className="sr-only">AURA is typing</span>
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-4 flex items-center gap-2 rounded-xl bg-[#0B1220] border border-hairline px-4 py-3 focus-within:border-accent transition-colors"
      >
        <label htmlFor={`${id}-input`} className="sr-only">
          Ask AURA a question
        </label>
        <input
          id={`${id}-input`}
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AURA a question…"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-dim"
          aria-label="Ask AURA a question"
          autoComplete="off"
          disabled={pending}
        />
        <button
          type="submit"
          disabled={pending || !input.trim()}
          className="aura-cta rounded-full bg-accent text-accent-foreground px-4 py-1.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send question to AURA"
        >
          {pending ? "…" : "Ask"}
        </button>
      </form>

      <p className="mt-3 text-[11px] text-dim leading-relaxed">
        Legal information, not legal advice. For complex situations, please
        consult a qualified lawyer.
      </p>
    </div>
  );
}

function AuraBubble({
  msg,
  copied,
  onCopy,
  onFeedback,
}: {
  msg: Extract<Msg, { role: "aura" }>;
  copied: boolean;
  onCopy: () => void;
  onFeedback: (v: "up" | "down") => void;
}) {
  const noMatch = msg.matched_case == null;
  const citations = extractCitations(msg.matched_case);

  return (
    <div className="space-y-2">
      {msg.crisis_category && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-100"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-300" />
            <div>
              <div className="font-medium text-red-200">
                {prettifyCategory(msg.crisis_category)} — please read this first
              </div>
              {msg.crisis_message && (
                <p className="mt-1 leading-relaxed">{msg.crisis_message}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-start">
        <div
          className={`max-w-[90%] rounded-2xl rounded-bl-md border px-4 py-3 text-sm leading-relaxed text-foreground/90 ${
            noMatch
              ? "bg-surface-elevated/60 border-dashed border-hairline"
              : "bg-[#0B1220] border-hairline"
          }`}
        >
          {noMatch && (
            <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] text-dim uppercase tracking-widest">
              <Info size={12} /> No specific match
            </div>
          )}
          <div className="whitespace-pre-wrap">{msg.text}</div>

          {citations.length > 0 && (
            <details className="aura-faq mt-3 group">
              <summary className="cursor-pointer list-none text-xs text-accent inline-flex items-center gap-1.5 hover:underline underline-offset-4">
                <span className="aura-faq-icon inline-block">+</span>
                View the law this is based on
              </summary>
              <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground border-l border-hairline pl-3">
                {citations.map((c, i) => (
                  <li key={i}>
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:underline underline-offset-4"
                      >
                        {c.title || c.url}
                      </a>
                    ) : (
                      <span className="text-foreground/80">{c.title || c.text}</span>
                    )}
                    {c.title && c.text && (
                      <div className="text-dim mt-0.5">{c.text}</div>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 pl-1">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1 text-[11px] text-dim hover:text-foreground px-2 py-1 rounded-md transition"
          aria-label="Copy response"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          type="button"
          onClick={() => onFeedback("up")}
          className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md transition ${
            msg.feedback === "up" ? "text-accent" : "text-dim hover:text-foreground"
          }`}
          aria-label="Mark this response as helpful"
          aria-pressed={msg.feedback === "up"}
        >
          <ThumbsUp size={12} />
        </button>
        <button
          type="button"
          onClick={() => onFeedback("down")}
          className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md transition ${
            msg.feedback === "down" ? "text-accent" : "text-dim hover:text-foreground"
          }`}
          aria-label="Mark this response as not helpful"
          aria-pressed={msg.feedback === "down"}
        >
          <ThumbsDown size={12} />
        </button>
      </div>

      <p className="text-[11px] text-dim leading-relaxed pl-1">{msg.disclaimer}</p>
    </div>
  );
}

function prettifyCategory(c: string) {
  return c
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (s) => s.toUpperCase());
}

function extractCitations(matched: MatchedCase): Citation[] {
  if (!matched) return [];
  const out: Citation[] = [];
  const raw = matched as Record<string, unknown>;
  if (Array.isArray(raw.citations)) {
    for (const c of raw.citations as unknown[]) {
      if (typeof c === "string") out.push({ title: c });
      else if (c && typeof c === "object") out.push(c as Citation);
    }
  }
  if (typeof raw.law === "string") out.push({ title: "Applicable law", text: raw.law });
  if (typeof raw.source === "string") out.push({ title: "Source", url: raw.source });
  if (typeof raw.title === "string" && out.length === 0)
    out.push({ title: String(raw.title) });
  return out;
}
