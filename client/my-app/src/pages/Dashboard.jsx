import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import SummaryCards from "../components/SummaryCards.jsx";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import {
  
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getHealth,
  getTransactions,
} from "../services/api.js";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [apiStatus, setApiStatus] = useState("checking");
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadTransactions = useCallback(async () => {
    setLoadingList(true);
    setError("");
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    async function checkHealth() {
      try {
        await getHealth();
        setApiStatus("online");
      } catch {
        setApiStatus("offline");
      }
    }

    checkHealth();
    loadTransactions();
  }, [loadTransactions]);

  async function handleSubmitTransaction(data) {
    setSubmitting(true);
    setSuccess("");
    setError("");
    try {
       if (editingTransaction) {
      await updateTransaction(editingTransaction.id, data);
      setEditingTransaction(null);
      setSuccess("Transaction updated.");
    } else {
      await createTransaction(data);
      setSuccess("Transaction added successfully.");
      }
      await loadTransactions();
    } 
    catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }

  function handleStartEdit(transaction) {
  setError("");
  setSuccess("");
  setEditingTransaction(transaction);
}

  async function handleDeleteTransaction(id) {
    setDeletingId(id);
    setError("");
    setSuccess("");
    try {
      await deleteTransaction(id);
      await loadTransactions();
      setSuccess("Transaction deleted.");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="app-shell">
      <Header status={apiStatus} />

      {apiStatus === "offline" && (
        <div className="alert alert--error">
          Backend is offline. Start the server with <code>npm run dev</code> in the{" "}
          <code>server</code> folder.
        </div>
      )}

      {error && <div className="alert alert--error">{error}</div>}
      {success && <div className="alert alert--success">{success}</div>}

      <SummaryCards transactions={transactions} />

      <div className="dashboard-grid">
        <TransactionForm 
       
        transaction={editingTransaction}
        onSubmit={handleSubmitTransaction}
        loading={submitting}
          /> 
        <TransactionList
          transactions={transactions}
          loading={loadingList}
          onEdit={handleStartEdit}
          onDelete={handleDeleteTransaction}
          deletingId={deletingId}
        />
      </div>
    </div>
  );
}
