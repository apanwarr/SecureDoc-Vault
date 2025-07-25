import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Welcome, {user?.name || 'User'}!</h2>
      <p className="text-gray-600 mt-2">You can manage your documents from here.</p>
    </div>
  );
};

export default Dashboard;