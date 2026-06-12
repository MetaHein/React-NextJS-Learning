import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Next.js Data Fetching Demo</h1>

      <ul>
        <li>
          <Link href="/posts">Posts (JSONPlaceholder)</Link>
        </li>
        <li>
          <Link href="/newproducts">Products (DummyJSON)</Link>
        </li>
        <li>
          <Link href="/weather">Weather (Open-Meteo)</Link>
        </li>
      </ul>
    </div>
  );
}
