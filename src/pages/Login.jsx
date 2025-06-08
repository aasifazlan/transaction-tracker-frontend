import { useState } from 'react';
import api from '../lib/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/transactions');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded border">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      {msg && <p className="text-red-500">{msg}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded" required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded" required />
        <button type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
      <p className='text-sm font-semibold text-center text-gray-900 mt-2'>Don't have account? <Link to="/register" 
      className='bg-blue-500 px-1.5 py-0.5 text-white rounded' >Register</Link></p>
    </div>
  );
};

export default Login;
