export default function DashboardLayout({
  children,
  users,
  revenue,
  notifications,
}) {
  return (
    <div>
      {/* main page */}
      <div>{children}</div>

      {/* dashboard grid */}
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          {users}
          {revenue}
        </div>

        <div style={{ flex: 1 }}>{notifications}</div>
      </div>
    </div>
  );
}
