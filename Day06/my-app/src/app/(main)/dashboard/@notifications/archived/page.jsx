import Link from "next/link";
export default function ArchivedNotifications() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Archived Notification Panel</h1>

      <Link href="/dashboard">Default</Link>
    </div>
  );
}
