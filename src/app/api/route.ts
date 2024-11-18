import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

// export async function GET(request: Request): Promise<NextResponse> {
//     try {
//       // Get the URL search parameters
//       const { searchParams } = new URL(request.url);
//       const user_id = searchParams.get("userId");
  
//       if (!user_id) {
//         return NextResponse.json({ error: 'userId is required' }, { status: 400 });
//       }
  
//       const transactions = await db
//         .select({
//           transaction_id: transactionsTable.transaction_id,
//           user_id: transactionsTable.user_id,
//           date: transactionsTable.date,
//           payee: transactionsTable.payee,
//           category: transactionsTable.category,
//           memo: transactionsTable.memo,
//           outflow: transactionsTable.outflow,
//           inflow: transactionsTable.inflow,
//         })
//         .from(transactionsTable)
//         .where(eq(transactionsTable.user_id, user_id));
  
//       return NextResponse.json(transactions as Array<{
//         transaction_id: number;
//         user_id: number;
//         date: string;
//         payee: string | null;
//         category: string | null;
//         memo: string | null;
//         outflow: number;
//         inflow: number;
//       }>);
      
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
//     }
// }

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get the URL search parameters
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("userId");

    if (!user_id) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const userIdNumber = parseInt(user_id, 10);
    if (isNaN(userIdNumber)) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
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
      .where(eq(transactionsTable.user_id, userIdNumber));

    return NextResponse.json(transactions);
    
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}