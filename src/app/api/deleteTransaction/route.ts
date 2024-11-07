import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    // Parse JSON data from the request body or use test data
    const { searchParams } = new URL(request.url);
    const transaction_id = parseFloat(searchParams.get("transactionId") || "");


    // Insert the transaction data into the database
    //const newTransaction = await db.delete(transactionsTable).values(data);
    const newTransaction = await db.delete(transactionsTable).where(eq(transactionsTable.transactionId, transaction_id));
    // Return the newly created transaction in JSON format
    return NextResponse.json(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);

    // Return an error response in case of failure
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}