/* eslint-disable */
import { and, eq } from 'drizzle-orm';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    if (!body.username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }
    console.log("Usernamea: ", body.username)
    console.log("Password:", body.password)

    
    const user = await db
      .select({
        user_id: usersTable.user_id,
        username: usersTable.username,
        password: usersTable.password,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(and(eq(usersTable.username, body.username), eq(usersTable.password, body.password)));

    return NextResponse.json(
      user as Array<{
        user_id: number;
        username: string;
        password: string | null;
        email: string | null;
      }>,
    );
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 501 });
  }
}
