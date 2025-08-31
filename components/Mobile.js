import { useEffect, useState, useCallback, useRef } from "react";

("use client");

export default function Mobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const scrollStartedRef = useRef(false);
  const closeTimeoutRef = useRef(null);

  // Detect mobile viewport
  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth <= 820);
    };
    check();
    window.addEventListener("resize", check);
    setMounted(true);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mount animation trigger
  useEffect(() => {
    if (mounted && isMobile) {
      // Delay a tick for animation
      requestAnimationFrame(() => setOpen(true));
      document.documentElement.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "contain";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [mounted, isMobile]);

  const dismiss = useCallback(() => {
    if (closing) return;
    setClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 420);
  }, [closing]);

  // Dismiss on first user scroll / swipe
  useEffect(() => {
    if (!open) return;
    const handleScrollIntent = () => {
      if (scrollStartedRef.current) return;
      scrollStartedRef.current = true;
      dismiss();
    };
    window.addEventListener("scroll", handleScrollIntent, { passive: true });
    window.addEventListener("wheel", handleScrollIntent, { passive: true });
    window.addEventListener("touchmove", handleScrollIntent, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollIntent);
      window.removeEventListener("wheel", handleScrollIntent);
      window.removeEventListener("touchmove", handleScrollIntent);
    };
  }, [open, dismiss]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  if (!mounted || !isMobile || !open) return null;

  return (
    <>
      <div
        className={`mobile-overlay ${closing ? "closing" : "opening"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile notice"
      >
        <div className={`card ${closing ? "card-closing" : "card-opening"}`}>
          <h2>Hey! Nice smartphone :)</h2>
          <p>
            But consider that this website has been designed for desktop-first
            usage.
          </p>
        </div>
      </div>
      <style jsx>{`
        .mobile-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px, 4vw, 32px);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          background: #e8dfb757;
          z-index: 1000;
          overflow: hidden;
          animation: overlayIn 480ms cubic-bezier(0.4, 0.14, 0.3, 1) forwards;
        }
        .mobile-overlay.closing {
          animation: overlayOut 420ms cubic-bezier(0.6, 0.08, 0.4, 1) forwards;
        }

        .card {
          position: relative;
          width: min(520px, 100%);
          background: linear-gradient(
              135deg,
              rgba(190, 191, 212, 1),
              rgba(190, 191, 212, 0.6)
            )
            border-box;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 28px;
          padding: clamp(18px, 5vw, 34px);
          color: #fff;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          line-height: 1.4;
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.25),
            inset 0 0 0 1px rgba(255, 255, 255, 0.15);
          overflow: hidden;
          text-align: center;
        }

        .card:before,
        .card:after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .card:before {
          background: radial-gradient(
              circle at 18% 12%,
              rgba(255, 255, 255, 0.35),
              transparent 60%
            ),
            radial-gradient(
              circle at 82% 88%,
              rgba(255, 255, 255, 0.2),
              transparent 65%
            );
          mix-blend-mode: overlay;
          opacity: 0.9;
        }
        .card:after {
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.22),
            rgba(255, 255, 255, 0) 50%
          );
          mask: radial-gradient(circle at 30% 30%, #000 30%, transparent 72%);
          opacity: 0.55;
        }

        .card-opening {
          animation: cardIn 560ms cubic-bezier(0.5, 1.4, 0.4, 1) forwards;
        }
        .card-closing {
          animation: cardOut 400ms cubic-bezier(0.6, 0.05, 0.3, 1) forwards;
        }

        h2 {
          margin: 0 0 12px;
          font-size: clamp(1.5rem, 6vw, 2rem);
          font-weight: 600;
          letter-spacing: 0.5px;
          background: linear-gradient(92deg, #fff, #dfe9ff 45%, #fff);
          -webkit-background-clip: text;
          color: transparent;
        }

        p {
          margin: 0;
          font-size: clamp(0.95rem, 3.5vw, 1.05rem);
          font-weight: 400;
          opacity: 0.92;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 12px;
          width: 40px;
          height: 40px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.22),
            rgba(255, 255, 255, 0.05)
          );
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 14px;
          backdrop-filter: blur(14px) saturate(200%);
          -webkit-backdrop-filter: blur(14px) saturate(200%);
          color: #fff;
          font-size: 28px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0.14, 0.3, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25),
            inset 0 0 0 1px rgba(255, 255, 255, 0.25);
        }
        .close-btn:hover,
        .close-btn:active {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 6px 18px -2px rgba(0, 0, 0, 0.45),
            inset 0 0 0 1px rgba(255, 255, 255, 0.35);
        }
        .close-btn:active {
          transform: translateY(0) scale(0.97);
        }

        @keyframes overlayIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes overlayOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes cardIn {
          0% {
            transform: translateY(40px) scale(0.92);
            opacity: 0;
            filter: blur(12px);
          }
          55% {
            transform: translateY(-6px) scale(1.018);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }
        @keyframes cardOut {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
            filter: blur(0);
          }
          100% {
            transform: translateY(-32px) scale(0.9);
            opacity: 0;
            filter: blur(14px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-overlay,
          .mobile-overlay.closing,
          .card-opening,
          .card-closing {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
