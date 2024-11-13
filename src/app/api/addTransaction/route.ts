import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { integer } from 'drizzle-orm/pg-core';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Use the body data to define the data object
    const data = {
      user_id: body.user_id || 10000000, // default value if not provided
      date: body.date,
      payee: body.payee || 'Default',
      category: body.category || 'Default',
      memo: body.memo || 'Default',
      outflow: body.outflow || 0,
      inflow: body.inflow || 0,
    };

    // Insert the transaction data into the database
    const newTransaction = await db.insert(transactionsTable).values(data);

    // Return the newly created transaction in JSON format
    return NextResponse.json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);

    // Return an error response in case of failure
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}
