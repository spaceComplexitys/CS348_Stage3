import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

// Users Table
export const usersTable = sqliteTable('users', {
  user_id: integer('user_id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').unique().notNull(),
  // budget: real('budget'),
  // allocationFixedExpenses: real('allocation_fixed_expenses').default(50.0),  // Percentage
  // allocationSavings: real('allocation_savings').default(10.0),              // Percentage
  // allocationInvestment: real('allocation_investment').default(10.0),        // Percentage
  // allocationGuiltFree: real('allocation_guilt_free').default(30.0)          // Percentage
});

// Transactions Table
export const transactionsTable = sqliteTable('transactions', {
  transaction_id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  user_id: integer('user_id')
    .notNull()
    .references(() => usersTable.user_id, { onDelete: 'cascade' }),
  date: text('date')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  payee: text('payee'),
  category: text('category'),
  memo: text('memo'),
  outflow: real('outflow').default(0.0),
  inflow: real('inflow').default(0.0),
});

// Infer types
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertTransaction = typeof transactionsTable.$inferInsert;
export type SelectTransaction = typeof transactionsTable.$inferSelect;
