import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!form.name.trim()){
      return setMsg('Name is required');
    }
    if(!emailRegex.test(form.email)){
      return setMsg('Please enter a valid email address')
    }

    if(form.password.length<6){
      return setMsg('Password must be at least 6 charctors long')
    }
    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/transactions');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded border">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {msg && <p className="text-red-500 mb-1">{msg}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" value={form.name} onChange={handleChange}
          placeholder="Name" className="border p-2 rounded" required />
        <input type="email" name="email" value={form.email} onChange={handleChange}
          placeholder="Email" className="border p-2 rounded" required />
        <input type="password" name="password" value={form.password} onChange={handleChange}
          placeholder="Password" className="border p-2 rounded" required />
        <button type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
      </form>
      <p className='text-sm font-semibold text-center text-gray-900 mt-2'>Already have account? <Link to="/login" 
      className='bg-blue-500 px-1.5 py-0.5 text-white rounded' >Login</Link></p>
    </div>
  );
};

export default Register;
