export interface Transaction {
    transaction_id: number;
    user_id: number;
    date: string;
    payee: string;
    category: string;
    memo: string;
    outflow: number;
    inflow: number;
    created_at: string;
  }
// type Transaction = {
//   date: string;
//   userId: number;
//   transactionId: number;
//   payee: string | null;
//   category: string | null;
//   memo: string | null;
//   outflow: number | null;
//   inflow: number | null;
//   // Add missing fields to match the data
//   transaction_id: number;
//   user_id: number;
//   created_at: string; // Or the appropriate type for created_at
// };