// // // await db.update(postsTable).set(data).where(eq(postsTable.id, id));


// // import { db } from '@/db';
// // import { transactionsTable } from '@/db/schema';
// // import { eq } from 'drizzle-orm';
// // import { NextResponse } from 'next/server';
// // import type { NextRequest } from 'next/server';

// // export async function POST(request: NextRequest) {
// //   try {
// //     // Parse JSON data from the request body or use test data
// //     const { searchParams } = new URL(request.url);
// //     const transaction_id = parseFloat(searchParams.get("transactionId") || "");

// //     const data = [
// //         {
// //           transactionId: 2001,
// //           userId: 2,
// //           date: "10/24/2024",
// //           payee: "Prime",
// //           category: "GuiltFree",
// //           memo: "Present",
// //           outflow: 20,
// //           inflow: 0
// //         }
// //     ];

// //     const newTransaction = await db.update(transactionsTable).set(data).where(eq(transactionsTable.transactionId, transaction_id));
// //     // Return the newly created transaction in JSON format
// //     return NextResponse.json(newTransaction);
// //   } catch (error) {
// //     console.error("Error creating transaction:", error);

// //     // Return an error response in case of failure
// //     return NextResponse.json(
// //       { error: 'Failed to create transaction' },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { db } from '@/db';
// import { transactionsTable } from '@/db/schema';
// import { eq } from 'drizzle-orm';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     // Parse URL and extract transactionId from query parameters
//     const { searchParams } = new URL(request.url);
//     const transaction_id = parseFloat(searchParams.get("transactionId") || "");

//     // Define data as an object, not an array
//     const data = {
//       transactionId: 2001,
//       userId: 2,
//       date: "10/24/2024",
//       payee: "Prime",
//       category: "GuiltFree",
//       memo: "Present",
//       outflow: 20,
//       inflow: 0
//     };

//     // Update the transaction in the database
//     const updatedTransaction = await db
//       .update(transactionsTable)
//       .set(data)
//       .where(eq(data.transactionId, transaction_id));

//     // Return the updated transaction in JSON format
//     return NextResponse.json(updatedTransaction);
//   } catch (error) {
//     console.error("Error updating transaction:", error);

//     // Return an error response in case of failure
//     return NextResponse.json(
//       { error: 'Failed to update transaction' },
//       { status: 500 }
//     );
//   }
// }

import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse URL and extract transactionId from query parameters
    const { searchParams } = new URL(request.url);
    const transaction_id = parseFloat(searchParams.get("transactionId") || "");

    // Define data as an object, not an array
    const data = {
      userId: 2,
      date: "10/24/2024",
      payee: "Prime",
      category: "Breh",
      memo: "Present",
      outflow: 20,
      inflow: 0
    };

    // Update the transaction in the database
    const updatedTransaction = await db
      .update(transactionsTable)
      .set(data)
      .where(eq(transactionsTable.transactionId, transaction_id));

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