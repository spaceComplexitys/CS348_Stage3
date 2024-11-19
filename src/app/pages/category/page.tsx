/* eslint-disable */
'use client';

import { Transaction } from '@/app/types/transaction';
import React, { useEffect, useState, useCallback } from 'react';

const Category = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTransactions = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/filterCategory?category=${query}`);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce the API call
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTransactions(searchQuery || 'GuiltFree'); // Default to 'GuiltFree' if empty
    }, 300); // Adjust debounce delay as needed
    return () => clearTimeout(timeout);
  }, [searchQuery, fetchTransactions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.button}>+ Add Transaction</button>
        <button style={styles.button}>File Import</button>
        <button style={styles.button}>Record Payment</button>
        <div style={styles.searchContainer}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search transactions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Payee</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Memo</th>
            <th style={styles.th}>Outflow</th>
            <th style={styles.th}>Inflow</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index} style={index % 2 ? styles.rowOdd : styles.rowEven}>
                <td style={styles.td}>
                  <i style={styles.icon}>ℹ️</i> {transaction.date}
                </td>
                <td style={styles.td}>{transaction.payee}</td>
                <td style={styles.td}>
                  {transaction.category === 'This needs a category' ? (
                    <span style={styles.needsCategory}>{transaction.category}</span>
                  ) : (
                    transaction.category
                  )}
                </td>
                <td style={styles.td}>{transaction.memo}</td>
                <td style={styles.td}>{transaction.outflow}</td>
                <td style={styles.td}>{transaction.inflow}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={styles.td} colSpan={6}>
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#0070f3',
    color: '#ffffff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  searchContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchInput: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #444',
    backgroundColor: '#2e2e2e',
    color: '#ffffff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    padding: '10px',
    backgroundColor: '#2e2e2e',
    color: '#aaa',
    borderBottom: '2px solid #444',
    textAlign: 'left' as const,
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #444',
  },
  rowOdd: {
    backgroundColor: '#2e2e2e',
  },
  rowEven: {
    backgroundColor: '#1e1e1e',
  },
  needsCategory: {
    backgroundColor: '#ffcc00',
    color: '#000',
    padding: '5px 10px',
    borderRadius: '5px',
  },
  icon: {
    marginRight: '5px',
    color: '#aaa',
  },
};

export default Category;
