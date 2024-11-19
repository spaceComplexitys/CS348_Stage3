/* eslint-disable */
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, real, index, uniqueIndex } from 'drizzle-orm/sqlite-core';


export const usersTable = sqliteTable("users", {
  user_id: integer('user_id').primaryKey(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  email: text('email').unique().notNull(),
}, (table) => {
  return {
    userIdx: index('user_id').on(table.username),
    nameIdx: index("name_idx").on(table.username),
    emailIdx: uniqueIndex("email_idx").on(table.email),
  };
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
