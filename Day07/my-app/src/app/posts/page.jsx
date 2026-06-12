export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 10 },
  });

  const posts = await res.json();

  return (
    <div style={{ padding: 20 }}>
      <h1>Posts (Static with Revalidate)</h1>

      {posts.slice(0, 10).map((post) => (
        <div key={post.id} style={{ marginBottom: 10 }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
