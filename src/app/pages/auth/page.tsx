/* eslint-disable */
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from '@/app/types/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<Users[]>([]);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Client: ", username)
      console.log("pasword: ", password)

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: username, password: password}),
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      setUser(Array.isArray(data) ? data: [])

      if (data != null) {
        router.push(`/?userId=${user[0].user_id}`);
      } else {
        console.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '2rem', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#0070f3', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;