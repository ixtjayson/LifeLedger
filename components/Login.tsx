import React, { useState } from 'react';
import { UserData } from '../types';
import { login, signup } from '../services/authService';

interface LoginProps {
  onLogin: (userData: UserData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let userData: UserData;
      if (isSignUp) {
        if (!name.trim()) {
          throw new Error("Name is required for sign up.");
        }
        userData = await signup(name, email, password);
      } else {
        userData = await login(email, password);
      }
      onLogin(userData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setEmail('');
    setPassword('');
    setName('');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-900">
      <div className="text-center max-w-md w-full p-8 bg-slate-800 rounded-3xl shadow-2xl shadow-cyan-500/10">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Life Ledger <span className="text-cyan-400">AI</span></h1>
          <p className="text-slate-300 text-lg">Level up your life, one quest at a time. 🌱</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-white">{isSignUp ? 'Create Your Account' : 'Welcome Back!'}</h2>
          
          {isSignUp && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />

          {error && <p className="text-sm text-rose-400 bg-rose-500/10 p-2 rounded-md">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Log In')}
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-6">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={toggleForm} className="font-semibold text-cyan-400 hover:underline ml-1">
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
