import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome Home Page</h1>
      <Link href="/articles/breaking-news-123?lang=en">Read in Spain</Link>
      <br />
      <Link href="/articles/breaking-news-123?lang=en">Read in English</Link>
      <br />
      <Link href="/articles/breaking-news-123?lang=fr">Read in Franch</Link>
      <br />
    </div>
  );
}
