'use client';
import React, { useEffect, useState } from 'react';
import { Transaction } from '../app/types/transaction';

const Home = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    date: new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit', // This will give the year in YY format
    }),
    user_id: 0, // Initialize with a default value
    payee: '',
    category: '',
    memo: '',
    outflow: 0,
    inflow: 0,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = parseInt(searchParams.get('userId') || '0', 10); // Default to 0 if not found

    if (userId) {
      setNewTransaction((prev) => ({
        ...prev,
        user_id: userId,
      }));
    }

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();

        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewTransaction((prev) => ({
      ...prev,
      [name]:
        (name === 'outflow' || name === 'inflow') && value !== '' && isNaN(Number(value))
          ? prev[name]
          : name === 'outflow' || name === 'inflow'
            ? parseFloat(value) || ''
            : value,
    }));
  };

  const addTransaction = async () => {
    try {
      const response = await fetch('/api/addTransaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) throw new Error('Failed to add transaction');
      const data = await response.json();
      setTransactions([data, ...transactions]);
    } catch (error) {
      console.error(error);
    } finally {
      resetForm();
    }
  };

  const updateTransaction = async () => {
    if (editIndex === null) return;
    try {
      const updatedTransaction = { ...transactions[editIndex], ...newTransaction };

      const response = await fetch('/api/updateTransaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTransaction),
      });
      if (!response.ok) throw new Error('Failed to update transaction');
      const data = await response.json();

      setTransactions(transactions.map((t, i) => (i === editIndex ? data : t)));
    } catch (error) {
      console.error(error);
    } finally {
      resetForm();
    }
  };

  const deleteTransaction = async (index: number) => {
    try {
      const transaction = transactions[index];
      const response = await fetch(
        `/api/deleteTransaction?transaction_id=${transaction.transaction_id}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) throw new Error('Failed to delete transaction');
      setTransactions(transactions.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (index: number) => {
    setIsEditing(true);
    setIsAddingTransaction(true);
    setEditIndex(index);
    setNewTransaction(transactions[index]);
  };

  const handleSave = () => {
    if (isEditing) {
      updateTransaction();
    } else {
      addTransaction();
    }
  };

  const resetForm = () => {
    setNewTransaction({
      date: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
      user_id: newTransaction.user_id, // Retain the user_id
      payee: '',
      category: '',
      memo: '',
      outflow: 0,
      inflow: 0,
    });
    setIsAddingTransaction(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.button} onClick={() => setIsAddingTransaction(true)}>
          + Add Transaction
        </button>
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
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isAddingTransaction && (
            <tr style={styles.highlightedRow}>
              <td style={styles.td}>
                <span>{newTransaction.date}</span>
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
              <td style={styles.td}>
                <button style={styles.actionButton} onClick={resetForm}>
                  Cancel
                </button>
                <button style={styles.actionButton} onClick={handleSave}>
                  {isEditing ? 'Update' : 'Save'}
                </button>
              </td>
            </tr>
          )}
          {transactions.map((transaction, index) => (
            <tr key={index} style={index % 2 ? styles.rowOdd : styles.rowEven}>
              <td style={styles.td}>{transaction.date}</td>
              <td style={styles.td}>{transaction.payee}</td>
              <td style={styles.td}>{transaction.category}</td>
              <td style={styles.td}>{transaction.memo}</td>
              <td style={styles.td}>{transaction.outflow}</td>
              <td style={styles.td}>{transaction.inflow}</td>
              <td style={styles.td}>
                <button style={styles.actionButton} onClick={() => handleEdit(index)}>
                  Update
                </button>
                <button style={styles.actionButton} onClick={() => deleteTransaction(index)}>
                  Delete
                </button>
              </td>
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