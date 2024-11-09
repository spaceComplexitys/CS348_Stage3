import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get the URL search parameters
    const { searchParams } = new URL(request.url);
    const inflow = parseFloat(searchParams.get("inflow") || "");

    if (isNaN(inflow)) {
      return NextResponse.json({ error: 'Inflow is required and must be a valid number' }, { status: 400 });
    }

    // Fetch the transactions based on the inflow amount
    console.log("This is inflow:", inflow);
    const transactions = await db
      .select({
        transaction_id: transactionsTable.transaction_id,
        user_id: transactionsTable.user_id,
        date: transactionsTable.date,
        payee: transactionsTable.payee,
        category: transactionsTable.category,
        memo: transactionsTable.memo,
        outflow: transactionsTable.outflow,
        inflow: transactionsTable.inflow,
      })
      .from(transactionsTable)
      .where(eq(transactionsTable.inflow, inflow));

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