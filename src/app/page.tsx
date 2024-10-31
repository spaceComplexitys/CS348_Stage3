// export default function Page() {
//   return <h1>Hello, World!</h1>;
// }

import { db } from "@/db";
import { videosTable, usersTable } from "@/db/schema";
import { timestamp } from "drizzle-orm/mysql-core";

export default async function Home() {
  const video = await db.query.usersTable.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono">
        <form
          action={async () => {
            "use server";
            await db.insert(usersTable).values({
              id: 100,
              name: "bob1",
              email: "test1@example.com",
              //createdAt: timestamp
            });
            await db.insert(videosTable).values({
              id: 100,
              title: "please subscribe",
              description: "bro",
              userId: 200,
              viewCount: 1,
              likeCount: 1,
              //createdAt: timestamp,
            });
          }}
        >
          <button>submit</button>
        </form>
        {video.map(video => (
          <div>{video.email}</div>
        ))}
      </div>
    </main>
  );
}