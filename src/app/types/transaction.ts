export interface Transaction {
  transaction_id?: number;
  user_id: number;
  date?: string;
  payee: string;
  category: string;
  memo: string;
  outflow: number;
  inflow: number;
}
