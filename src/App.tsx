import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Forge } from './pages/Forge';
import { HallOfFame } from './pages/HallOfFame';
import { Manifesto } from './pages/Manifesto';

export interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (e) {
      console.error('Failed to fetch user', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleOAuthSuccess = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        fetchUser();
      }
    };

    window.addEventListener('message', handleOAuthSuccess);
    return () => window.removeEventListener('message', handleOAuthSuccess);
  }, []);

  return (
    <Router>
      <Layout user={user} loading={loading}>
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/forge" element={<Forge user={user} />} />
          <Route path="/leaderboard" element={<HallOfFame user={user} />} />
          <Route path="/manifesto" element={<Manifesto />} />
        </Routes>
      </Layout>
    </Router>
  );
}
