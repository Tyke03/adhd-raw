import { useEffect, useRef, useState } from "react";

// Module-level flag — only the first rendered instance shows the tooltip.
let claimed = false;

export function HeadBobSob() {
  const [isFirst, setIsFirst] = useState(false);
  const [open, setOpen] = useState(false);
  const claimedHereRef = useRef(false);

  useEffect(() => {
    if (!claimed) {
      claimed = true;
      claimedHereRef.current = true;
      setIsFirst(true);
    }
    return () => {
      if (claimedHereRef.current) claimed = false;
    };
  }, []);

  if (!isFirst) return <>Head-bob sob</>;

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-describedby="hbs-def"
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          color: "inherit",
          font: "inherit",
          cursor: "help",
          borderBottom: "1px dotted currentColor",
        }}
      >
        Head-bob sob
      </button>
      {open && (
        <span
          id="hbs-def"
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1e1e2f",
            color: "#e0e0e0",
            fontSize: "0.8rem",
            borderRadius: 6,
            padding: "6px 10px",
            maxWidth: 220,
            width: "max-content",
            zIndex: 80,
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
            pointerEvents: "none",
            textTransform: "none",
            letterSpacing: "normal",
            fontWeight: 400,
            lineHeight: 1.35,
          }}
        >
          almost upbeat-sounding while the lyrics gut you
        </span>
      )}
    </span>
  );
}
