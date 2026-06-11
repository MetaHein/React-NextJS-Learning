import React from "react";
import Link from "next/link";

export default async function NewsArticle({ params, searchParams }) {
  const { articleid } = await params;
  const { lang } = await searchParams;
  return (
    <div>
      <h1>New article {articleid}</h1>
      <p>Reading in language {lang}</p>

      <div>
        <Link href={`/articles/${articleid}?lang=en`}>English</Link>
        <Link href={`/articles/${articleid}?lang=es`}>Spanish</Link>
        <Link href={`/articles/${articleid}?lang=fr`}>Franch</Link>
      </div>
    </div>
  );
}
