import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();


    // Define data as an object, not an array
    const data = {
      transactionId: body.transaction_id || 1000000,
      userId: body.user_id || 10000000, // default value if not provided
      date: body.date || "1/1/1",
      payee: body.payee || "Default",
      category: body.category || "Default",
      memo: body.memo || "Default",
      outflow: body.outflow || 0,
      inflow: body.inflow || 0
    };

    // Update the transaction in the database
    const updatedTransaction = await db
      .update(transactionsTable)
      .set(data)
      .where(eq(transactionsTable.transaction_id, body.transaction_id));

    // Return the updated transaction in JSON format
    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);

    // Return an error response in case of failure
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}