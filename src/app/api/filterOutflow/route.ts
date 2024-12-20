/* eslint-disable */
export const dynamic = 'force-dynamic';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get the URL search parameters
    const { searchParams } = new URL(request.url);
    const outflow = parseFloat(searchParams.get("outflow") || "");

    if (isNaN(outflow)) {
      return NextResponse.json({ error: 'Outflow is required and must be a valid number' }, { status: 400 });
    }

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
      .where(eq(transactionsTable.outflow, outflow));

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