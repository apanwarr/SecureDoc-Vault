import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 mt-10 shadow-lg rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full mb-3 p-2 border" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full mb-3 p-2 border" required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default Login;