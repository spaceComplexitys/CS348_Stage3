// export default function Page() {
//   return <h1>Hello, World!</h1>;
// }

import { db } from "@/db";
import { postsTable, usersTable } from "@/db/schema";

export default async function Home() {
  const post = await db.query.postsTable.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono">
        <form
          action={async () => {
            "use server";
            await db.insert(usersTable).values({
              id: 2,
              age: 20,
              email: "test@example.com",
              name: "bob",
            });
            await db.insert(postsTable).values({
              title: "please subscribe",
              content: "yolo",
              userId: 2,
            });
          }}
        >
          <button>submit</button>
        </form>
        {post.map(post => (
          <div>{post.title}</div>
        ))}
      </div>
    </main>
  );
}