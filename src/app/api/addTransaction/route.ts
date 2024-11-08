// import { db } from '@/db';
// import { transactionsTable } from '@/db/schema';
// import { NextResponse } from 'next/server';


// export async function POST(request) {
//     try {
//       const data = await request.json();
//       const newTransaction = await db.insert(transactionsTable).values(data);
//       return NextResponse.json(newTransaction);
//     } catch (error) {
//       console.error("Error creating transaction:", error);
//       return NextResponse.json(
//         { error: 'Failed to create transaction' },
//         { status: 500 }
//       );
//     }
//   }

// import { db } from '@/db';
// import { transactionsTable } from '@/db/schema';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     // const data = await request.json();
//     const data = [
//         {
//           transaction_id: 101,
//           user_id: 2,
//           date: "10/24/2024",
//           payee: "Amazon",
//           category: "GuiltFree",
//           memo: "Present",
//           outflow: 20,
//           inflow: 0
//         }
//       ];
//     const newTransaction = await db.insert(transactionsTable).values(data);
//     return NextResponse.json(newTransaction);
//   } catch (error) {
//     console.error("Error creating transaction:", error);
//     return NextResponse.json(
//       { error: 'Failed to create transaction' },
//       { status: 500 }
//     );
//   }
// }

// export async function createPost(data: InsertPost) {
//   await db.insert(postsTable).values(data);
// }

import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse JSON data from the request body or use test data
    const data = [
      {
        transactionId: 2001,
        userId: 2,
        date: "10/24/2024",
        payee: "Prime",
        category: "GuiltFree",
        memo: "Present",
        outflow: 20,
        inflow: 0
      }
    ];

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