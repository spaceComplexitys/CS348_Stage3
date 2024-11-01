import { db } from '@/db';
import { NextResponse } from 'next/server';


// export async function GET() {
//   return NextResponse.json({
//     hello: "world",
//   })
// }

export async function GET() {
    try {
      const transactions = await db.query.transactionsTable.findMany();
      return NextResponse.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return NextResponse.json(
        { error: 'Failed to fetch transactions' },
        { status: 500 }
      );
    }
  }