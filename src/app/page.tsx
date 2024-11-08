'use client';
import React, { useEffect, useState } from 'react';
import { Transaction } from '../app/types/transaction';
import { integer } from 'drizzle-orm/pg-core';

const Home = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }),
    payee: '',
    category: '',
    memo: '',
    outflow: '',
    inflow: '',
  });

  useEffect(() => {
    // const fetchTransactions = async () => {
    //   try {
    //     const response = await fetch('/api'); // Update the URL as per your API route
    //     if (!response.ok) throw new Error("Failed to fetch transactions");
    //     const data = await response.json();
    //     setTransactions(data);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api'); // Update the URL as per your API route
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();

        // Ensure data is an array before setting it to transactions
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          console.error('Data fetched is not an array:', data);
          setTransactions([]); // Set to an empty array if data is not an array
        }
      } catch (error) {
        console.error(error);
        setTransactions([]); // Set to an empty array if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTransaction = () => {
    if (newTransaction) {
      setTransactions([newTransaction, ...transactions]);

      const postTransaction = async () => {
        try {
          const transactionData = {
           // transaction_id: 1,
            user_id: 2,
            date: newTransaction.date,
            payee: newTransaction.payee,
            category: newTransaction.category,
            memo: newTransaction.memo,
            outflow: newTransaction.outflow,
            inflow: newTransaction.outflow,
          };
          const response = await fetch('/api/addTransaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify(transactionData),
          });
          if (!response.ok) throw new Error('Failed to post transaction');

          const data = await response.json();
          setTransactions(data); // Update transactions based on the server response
        } catch (error) {
          console.error(error);
        }
      };

      postTransaction(newTransaction); // Call postTransaction with the new transaction

      setNewTransaction({
        date: new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }),
        payee: '',
        category: '',
        memo: '',
        outflow: '',
        inflow: '',
      });
    }
  };

  const handleCancel = () => {
    setNewTransaction(null); // Set to null to hide the row
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button
          style={styles.button}
          onClick={() =>
            setNewTransaction({
              date: new Date().toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
              }),
              payee: '',
              category: '',
              memo: '',
              outflow: '',
              inflow: '',
            })
          }
        >
          + Add Transaction
        </button>
        <button style={styles.button}>File Import</button>
        <button style={styles.button}>Record Payment</button>
        <div style={styles.searchContainer}>
          <input style={styles.searchInput} type="text" placeholder="Search transactions" />
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
          {newTransaction && (
            <>
              <tr style={styles.highlightedRow}>
                <td style={styles.td}>
                  <input
                    type="text"
                    name="date"
                    value={newTransaction.date}
                    onChange={handleInputChange}
                    placeholder="MM/DD/YYYY"
                    style={styles.input}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    name="payee"
                    value={newTransaction.payee}
                    onChange={handleInputChange}
                    placeholder="Enter payee"
                    style={styles.input}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    name="category"
                    value={newTransaction.category}
                    onChange={handleInputChange}
                    placeholder="Enter category"
                    style={styles.input}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    name="memo"
                    value={newTransaction.memo}
                    onChange={handleInputChange}
                    placeholder="Enter memo"
                    style={styles.input}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    name="outflow"
                    value={newTransaction.outflow}
                    onChange={handleInputChange}
                    placeholder="Enter outflow"
                    style={styles.input}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    name="inflow"
                    value={newTransaction.inflow}
                    onChange={handleInputChange}
                    placeholder="Enter inflow"
                    style={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={styles.buttonRow}>
                  <button style={styles.actionButton} onClick={handleCancel}>
                    Cancel
                  </button>
                  <button style={styles.actionButton} onClick={addTransaction}>
                    Save
                  </button>
                </td>
              </tr>
            </>
          )}
          {/* {transactions.map((transaction, index) => (
            <tr key={index} style={index % 2 ? styles.rowOdd : styles.rowEven}>
              <td style={styles.td}><i style={styles.icon}>ℹ️</i> {transaction.date}</td>
              <td style={styles.td}>{transaction.payee}</td>
              <td style={styles.td}>{transaction.category}</td>
              <td style={styles.td}>{transaction.memo}</td>
              <td style={styles.td}>{transaction.outflow}</td>
              <td style={styles.td}>{transaction.inflow}</td>
            </tr>
          ))} */}
          {Array.isArray(transactions) &&
            transactions.map((transaction, index) => (
              <tr key={index} style={index % 2 ? styles.rowOdd : styles.rowEven}>
                <td style={styles.td}>
                  <i style={styles.icon}>ℹ️</i> {transaction.date}
                </td>
                <td style={styles.td}>{transaction.payee}</td>
                <td style={styles.td}>{transaction.category}</td>
                <td style={styles.td}>{transaction.memo}</td>
                <td style={styles.td}>{transaction.outflow}</td>
                <td style={styles.td}>{transaction.inflow}</td>
              </tr>
            ))}
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
  highlightedRow: {
    backgroundColor: '#0070f3',
    color: '#ffffff',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '10px',
    backgroundColor: '#1e1e1e',
  },
  input: {
    width: '100%',
    padding: '5px',
    borderRadius: '3px',
    border: '1px solid #444',
    backgroundColor: '#2e2e2e',
    color: '#ffffff',
  },
  actionButton: {
    backgroundColor: '#1e90ff',
    color: '#ffffff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    margin: '0 5px',
  },
  icon: {
    marginRight: '5px',
    color: '#aaa',
  },
};
export default Home;
