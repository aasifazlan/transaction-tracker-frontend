import { useEffect, useState } from 'react';
import api from '../lib/axios';

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get('/analytics/summary');
        setSummary(res.data);
      } catch (err) {
        setMsg('Failed to load analytics');
      }
    };
    fetchSummary();
  }, []);

  if (msg) return <p className="text-center mt-10 text-red-500">{msg}</p>;

  if (!summary) return <p className="text-center mt-10">Loading analytics...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-green-100 p-4 rounded shadow">
          <h4 className="font-semibold">Total Credit</h4>
          <p className="text-xl text-green-700">₹{summary.totalCredit.toLocaleString()}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h4 className="font-semibold">Total Debit</h4>
          <p className="text-xl text-red-700">₹{summary.totalDebit.toLocaleString()}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow">
          <h4 className="font-semibold">Net Balance</h4>
          <p className="text-xl text-blue-700">₹{summary.netBalance.toLocaleString()}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">🕒 Recent Transactions</h3>
      <ul className="space-y-2">
        {summary.recent.map((txn) => (
          <li key={txn._id} className="flex justify-between border p-2 rounded">
            <span>{new Date(txn.createdAt).toLocaleString()}</span>
            <span className={`font-medium ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
              {txn.type}: ₹{txn.amount.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
