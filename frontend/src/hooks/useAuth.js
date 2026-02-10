import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Verify token with backend
      axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setUser(response.data.user);
          setLoading(false);
        })
        .catch(() => {
          // Token invalid or expired
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Register new user
  const register = async (email, password, username, fullname) => {
    try {
      const response = await axios.post('/api/auth/register', {
        email,
        password,
        username,
        fullname
      });
  
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setLoading(false); // ← FIX: Reset loading after success
      
      return { success: true };
    } catch (error) {
      setLoading(false); // ← FIX: Reset loading after error too!
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed'
      };
    }
  };
  // Login existing user
  const login = async (email, password) => {
     
    try {
      console.log('🔵 Sending request to /api/auth/login');
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
  
       
  
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
       
      
      setUser(user);
       
      
      setLoading(false);
       
      
      return { success: true };
    } catch (error) {
       
      setLoading(false);
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed'
      };
    }
  };
  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };
};

export default useAuth;