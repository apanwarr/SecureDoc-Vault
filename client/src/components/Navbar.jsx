import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">SecureDoc</Link>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
            <Link to="/register" className="hover:text-blue-400">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            <Link to="/upload" className="hover:text-blue-400">Upload</Link>
            <button onClick={logout} className="hover:text-red-400">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;