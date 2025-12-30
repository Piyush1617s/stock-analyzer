type Props = {
  title?: string;
  children: React.ReactNode;
};

function Card({ title, children }: Props) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "20px",
        backgroundColor: "#ffffff",
      }}
    >
      {title && (
        <h3 style={{ marginBottom: "12px", fontWeight: 600 }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export default Card;
