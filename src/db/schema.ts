// import { sql } from 'drizzle-orm';
// import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// export const usersTable = sqliteTable('users', {
//   id: integer('id').primaryKey(),
//   name: text('name').notNull(),
//   age: integer('age').notNull(),
//   email: text('email').unique().notNull(),
// });

// export const postsTable = sqliteTable('posts', {
//   id: integer('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: text('created_at')
//     .default(sql`(CURRENT_TIMESTAMP)`)
//     .notNull(),
//   updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
// });




// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;

// import { sql } from 'drizzle-orm';
// import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// // User Table
// export const usersTable = sqliteTable('users', {
//   id: integer('id').primaryKey(),
//   name: text('name').notNull(),
//   email: text('email').unique().notNull(),
// });

// // Video Table
// export const videosTable = sqliteTable('videos', {
//   id: integer('id').primaryKey(),
//   title: text('title').notNull(),
//   description: text('description').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   viewCount: integer('view_count').default(0).notNull(),
//   likeCount: integer('like_count').default(0).notNull(),
//   //createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
// });

// // Comment Table
// export const commentsTable = sqliteTable('comments', {
//   id: integer('id').primaryKey(),
//   videoId: integer('video_id')
//     .notNull()
//     .references(() => videosTable.id, { onDelete: 'cascade' }),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   content: text('content').notNull(),
//   createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
// });

// // Like Table
// export const likesTable = sqliteTable('likes', {
//   id: integer('id').primaryKey(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   videoId: integer('video_id')
//     .references(() => videosTable.id, { onDelete: 'cascade' }),
//   commentId: integer('comment_id')
//     .references(() => commentsTable.id, { onDelete: 'cascade' }),
//   createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
// });

// // Infer types
// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertVideo = typeof videosTable.$inferInsert;
// export type SelectVideo = typeof videosTable.$inferSelect;

// export type InsertComment = typeof commentsTable.$inferInsert;
// export type SelectComment = typeof commentsTable.$inferSelect;

// export type InsertLike = typeof likesTable.$inferInsert;
// export type SelectLike = typeof likesTable.$inferSelect;

import { sql } from 'drizzle-orm';
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
  transactionId: integer('transaction_id').primaryKey(),
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