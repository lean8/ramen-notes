import fs from "fs";
import path from "path";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  date: string;
};

function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const titleMatch = fileContents.match(/title:\s*(.*)/);
    const dateMatch = fileContents.match(/date:\s*(.*)/);

    return {
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      date: dateMatch ? dateMatch[1] : "",
    };
  });
}

export default function Home() {
  const posts = getPosts();

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 40, marginBottom: 30 }}>🍜 拉麵筆記</h1>

      {posts.length === 0 && <p>還沒有任何拉麵文章</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: 20 }}>
            <Link href={`/posts/${post.slug}`}>
              <h2 style={{ fontSize: 24 }}>{post.title}</h2>
              <p style={{ color: "#666" }}>{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
