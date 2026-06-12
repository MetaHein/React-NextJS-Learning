import Link from "next/link";
export default function Notifications() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notification Panel</h1>

      <div className="max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-gray-700">You have 3 new messages</p>
        <div>
          <Link href="/dashboard/archived">Archived</Link>
        </div>
      </div>
    </div>
  );
}
