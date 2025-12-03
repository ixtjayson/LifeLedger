import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { UserData } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user from localStorage
    try {
      const storedUser = localStorage.getItem('lifeLedgerUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      localStorage.removeItem('lifeLedgerUser');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData: UserData) => {
    localStorage.setItem('lifeLedgerUser', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('lifeLedgerUser');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-2xl font-bold text-cyan-400">Loading Life Ledger...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;