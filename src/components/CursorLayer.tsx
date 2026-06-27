import { useEffect, useRef, useState } from "react";

export function CursorLayer() {
  const [enabled, setEnabled] = useState(false);
  const [reduced, setReduced] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    setEnabled(finePointer.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    finePointer.addEventListener("change", onChange);

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(reducedMq.matches);
    const onReduced = (e: MediaQueryListEvent) => setReduced(e.matches);
    reducedMq.addEventListener("change", onReduced);

    return () => {
      finePointer.removeEventListener("change", onChange);
      reducedMq.removeEventListener("change", onReduced);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = dotRef.current;
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let raf = 0;
    let visible = false;
    let hovering = false;
    let pressing = false;
    let overText = false;

    const TEXT_SELECTOR =
      'input[type="text"], input[type="email"], input[type="password"], input[type="search"], input[type="url"], input[type="tel"], input:not([type]), textarea, [contenteditable="true"], [contenteditable=""]';
    const CLICK_SELECTOR =
      'a, button, [role="button"], summary, label, select, [data-cursor="hover"]';

    const inner = el.firstElementChild as HTMLElement | null;
    const apply = () => {
      const scale = (hovering ? 1.65 : 1) * (pressing ? 0.8 : 1);
      const bg = hovering ? "rgba(201, 168, 92, 0.15)" : "transparent";
      el.style.transform = `translate3d(${curX - 12}px, ${curY - 12}px, 0)`;
      if (inner) {
        inner.style.transform = `scale(${scale})`;
        inner.style.backgroundColor = bg;
      }
    };

    const tick = () => {
      if (reduced) {
        curX = mouseX;
        curY = mouseY;
      } else {
        curX += (mouseX - curX) * 0.2;
        curY += (mouseY - curY) * 0.2;
      }
      apply();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = overText ? "0" : "1";
      }
      const target = e.target as Element | null;
      if (target) {
        const inText = !!target.closest(TEXT_SELECTOR);
        const inClick = !!target.closest(CLICK_SELECTOR);
        if (inText !== overText) {
          overText = inText;
          el.style.opacity = overText ? "0" : visible ? "1" : "0";
          document.documentElement.style.cursor = overText ? "" : "none";
        }
        hovering = inClick && !inText;
      }
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };
    const onEnter = () => {
      if (!overText) {
        visible = true;
        el.style.opacity = "1";
      }
    };
    const onDown = () => {
      pressing = true;
    };
    const onUp = () => {
      pressing = false;
    };

    document.documentElement.style.cursor = "none";
    el.style.opacity = "0";

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.style.cursor = "";
    };
  }, [enabled, reduced]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        borderRadius: "9999px",
        border: "1px solid #C9A85C",
        backgroundColor: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transition:
          "opacity 200ms ease, background-color 200ms ease, border-color 200ms ease",
        willChange: "transform, opacity, background-color",
        mixBlendMode: "normal",
      }}
    />
  );
}
