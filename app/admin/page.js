'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sprout, Lock, User, Key, AlertCircle } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const json = await res.json();
      if (json.success) {
        router.push('/admin/dashboard');
      } else {
        setError(json.error || 'Invalid username or password.');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade">
      <section className={styles.loginSection}>
        <div className={styles.loginCard}>
          <div className="text-gradient" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Sprout size={48} />
          </div>
          <h1>Admin Portal</h1>
          <p>Sign in to manage products, inquiries, and gallery assets.</p>

          {error && (
            <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', background: '#ffebee', color: 'var(--error)', padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(217, 4, 41, 0.15)' }}>
              <AlertCircle size={16} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} />
                <span>Username</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Lock size={14} />
                <span>Password</span>
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem' }} disabled={loading}>
              <Key size={16} />
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
