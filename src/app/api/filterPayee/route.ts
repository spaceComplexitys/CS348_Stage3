import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get the URL search parameters
    const { searchParams } = new URL(request.url);
    const payee = searchParams.get("payee");

    if (!payee) {
      return NextResponse.json({ error: 'Payee is required' }, { status: 400 });
    }

    // Fetch the transactions based on the payee
    console.log("This is payee:", payee);
    const transactions = await db
      .select({
        transaction_id: transactionsTable.transactionId,
        user_id: transactionsTable.userId,
        date: transactionsTable.date,
        payee: transactionsTable.payee,
        category: transactionsTable.category,
        memo: transactionsTable.memo,
        outflow: transactionsTable.outflow,
        inflow: transactionsTable.inflow,
      })
      .from(transactionsTable)
      .where(eq(transactionsTable.payee, payee));

    // Return the transactions in JSON format
    return NextResponse.json(transactions as Array<{
      transaction_id: number;
      user_id: number;
      date: string;
      payee: string | null;
      category: string | null;
      memo: string | null;
      outflow: number;
      inflow: number;
    }>);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}