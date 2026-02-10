import React, { useState } from 'react';
import '../styles/LoginForm.scss';

const LoginForm = ({ onSwitchToRegister, login }) => {
  console.log('🔴 LoginForm rendered!');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔴 Form submitted!');
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      
      
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <h2>Welcome Back to PhotoLabs</h2>
        <p className="login-subtitle">Sign in to continue</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="switch-form">
          Don't have an account?{' '}
          <button 
            onClick={onSwitchToRegister}
            className="switch-button"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;