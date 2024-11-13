import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    // Extract transaction_id from URL search parameters
    const { searchParams } = new URL(request.url);
    const transaction_id = parseFloat(searchParams.get('transaction_id') || '');

    console.log('transaction_id', transaction_id);

    // Proceed with the delete operation in the database
    const deleteResult = await db
      .delete(transactionsTable)
      .where(eq(transactionsTable.transaction_id, transaction_id));

    // Return the result in JSON format
    return NextResponse.json(deleteResult);
  } catch (error) {
    console.error('Error deleting transaction:', error);

    // Return an error response in case of failure
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}
