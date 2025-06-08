import { useEffect, useState } from 'react';
import api from '../lib/axios';

const Transactions = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ amount: '', type: 'credit' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch transactions on mount
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/transactions/${userId}`);
        setTransactions(res.data);
      } catch (err) {
        setMessage('❌ Failed to fetch transactions.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  // Handle form input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit new transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount) return;

    setSubmitting(true);
    setMessage('');

    try {
      const payload = {
        userId,
        amount: Number(formData.amount),
        type: formData.type,
      };
      const res = await api.post('/transactions', payload);
      setTransactions((prev) => [res.data, ...prev]);
      setMessage('✅ Transaction recorded successfully');
      setFormData({ amount: '', type: 'credit' });
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong';
      setMessage(`❌ ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">💳 Transactions</h1>

      {message && (
        <p className="text-center mb-4 text-sm text-red-600">{message}</p>
      )}

      {/* --- Add Transaction Form --- */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="border p-2 rounded flex-1"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Add'}
        </button>
      </form>

      {/* --- Transactions List --- */}
      {loading ? (
        <p className="text-center text-gray-500">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions yet.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn._id}>
                <td className="p-2 border text-xs">{txn._id.slice(-6)}</td>
                <td className="p-2 border text-sm">
                  {new Date(txn.createdAt).toLocaleString()}
                </td>
                <td
                  className={`p-2 border capitalize font-medium ${
                    txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {txn.type}
                </td>
                <td className="p-2 border text-right">
                  ₹{txn.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
