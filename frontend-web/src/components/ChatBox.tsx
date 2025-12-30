import { useState } from "react";

type Props = {
  explanation: string[];
};

function ChatBox({ explanation }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          cursor: "pointer",
        }}
      >
        {open ? "Hide AI Explanation" : "Ask AI to Explain"}
      </button>

      {open && (
        <div
          style={{
            marginTop: "12px",
            padding: "12px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            background: "#f9fafb",
          }}
        >
          {explanation.map((line, idx) => (
            <p key={idx} style={{ marginBottom: "8px" }}>
              🤖 {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatBox;
