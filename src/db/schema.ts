
import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

// Users Table
export const usersTable = sqliteTable('users', {
  userId: integer('user_id').primaryKey(),
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
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.userId, { onDelete: 'cascade' }),
  date: text('date').notNull(),
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