export function ChatEmbed({ id = "chat" }: { id?: string }) {
  return (
    <div id={id} className="rounded-2xl bg-surface border border-hairline p-5 sm:p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="aura-pulse h-2 w-2 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground tracking-wide">
            AURA · online
          </span>
        </div>
        <span className="text-[10px] text-dim uppercase tracking-widest">Private</span>
      </div>

      {/* user bubble */}
      <div className="flex justify-end mb-3">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-surface-elevated border border-hairline px-4 py-3 text-sm">
          My landlord won&rsquo;t return my deposit — what can I do?
        </div>
      </div>

      {/* AURA reply */}
      <div className="flex justify-start mb-4">
        <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-[#0B1220] border border-hairline px-4 py-3 text-sm leading-relaxed text-foreground/90">
          You have a few clear steps. First, send your landlord a written
          request for the deposit, with a reasonable deadline. If they don&rsquo;t
          respond, you can file a complaint with your local rent authority or
          small claims court. Want me to walk you through writing the letter?
        </div>
      </div>

      {/* AURA_CHATBOT_EMBED_START */}
      {/* Drop the live chatbot script / iframe here. This card is sized to fit it. */}
      {/* AURA_CHATBOT_EMBED_END */}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-2 flex items-center gap-2 rounded-xl bg-[#0B1220] border border-hairline px-4 py-3"
      >
        <input
          type="text"
          placeholder="Ask AURA a question…"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-dim"
        />
        <button
          type="submit"
          className="rounded-full bg-accent text-accent-foreground px-4 py-1.5 text-sm font-medium"
        >
          Ask
        </button>
      </form>

      <p className="mt-4 text-[11px] text-dim leading-relaxed">
        Legal information, not legal advice. For complex situations, please
        consult a qualified lawyer.
      </p>
    </div>
  );
}
