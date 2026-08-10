import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import SummaryCards from "../components/SummaryCards.jsx";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import {
  createTransaction,
  getHealth,
  getTransactions,
} from "../services/api.js";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [apiStatus, setApiStatus] = useState("checking");
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  async function handleCreateTransaction(data) {
    setSubmitting(true);
    try {
      await createTransaction(data);
      await loadTransactions();
    } finally {
      setSubmitting(false);
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

      <SummaryCards transactions={transactions} />

      <div className="dashboard-grid">
        <TransactionForm onSubmit={handleCreateTransaction} loading={submitting} />
        <TransactionList transactions={transactions} loading={loadingList} />
      </div>
    </div>
  );
}
