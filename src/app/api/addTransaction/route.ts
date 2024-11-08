import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { integer } from 'drizzle-orm/pg-core';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {

    const body = await request.json();

    console.log("body.transaction_id", body.transaction_id)
    console.log("body.user_id", body.user_id)
    console.log("body.date", body.date)
    console.log("body.payee", body.payee)
    console.log("body.category",  body.category)
    console.log("body.memo ", body.memo )
    console.log("body.outflow", body.outflow)
    console.log("body.inflow", body.inflow)

    // Use the body data to define the data object
    const data = {
      userId: body.user_id || 10000000, // default value if not provided
      date: body.date || "1/1/1",
      payee: body.payee || "Default",
      category: body.category || "Default",
      memo: body.memo || "Default",
      outflow: body.outflow || 0,
      inflow: body.inflow || 0
    };

    // Insert the transaction data into the database
    const newTransaction = await db.insert(transactionsTable).values(data);

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