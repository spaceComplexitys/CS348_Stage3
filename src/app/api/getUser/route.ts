import { eq} from 'drizzle-orm';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get the URL search parameters
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("userId") || "", 10);

    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Fetch the transactions based on the user ID
    console.log("This is userid:", userId);
    const transactions = await db
      .select({
        user_id: usersTable.user_id,
        username: usersTable.username,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.user_id, userId));

    // Return the transactions in JSON format
    return NextResponse.json(transactions as Array<{
      user_id: number;
      username: string;
      email: string;
    }>);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}