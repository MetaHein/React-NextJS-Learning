export const Card = ({ children }) => {
  return (
    <div
      style={{
        padding: "20px",
        margin: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </div>
  );
};
