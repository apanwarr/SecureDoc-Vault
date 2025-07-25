import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 mt-10 shadow-lg rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="block w-full mb-3 p-2 border" required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="block w-full mb-3 p-2 border" required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="block w-full mb-3 p-2 border" required />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default Register;