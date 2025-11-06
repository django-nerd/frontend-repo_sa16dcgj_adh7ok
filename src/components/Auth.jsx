import { useEffect, useState } from 'react';
import { LogIn, LogOut, User } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function Auth({ onAuth }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const authed = Boolean(token);

  useEffect(() => {
    async function fetchMe() {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          onAuth?.({ token, user: data });
        } else {
          setToken('');
          localStorage.removeItem('token');
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchMe();
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const body = new URLSearchParams();
      body.append('username', email);
      body.append('password', '');
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem('token', data.access_token);
        setToken(data.access_token);
      }
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    const demoEmail = prompt('Enter Google email for demo:');
    if (!demoEmail) return;
    const res = await fetch(`${API_BASE}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_token: demoEmail }),
    });
    const data = await res.json();
    if (res.ok && data.access_token) {
      localStorage.setItem('token', data.access_token);
      setToken(data.access_token);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setProfile(null);
    onAuth?.(null);
  };

  if (authed && profile) {
    return (
      <div className="flex items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
        <User size={16} />
        <span className="truncate">{profile.name} · {profile.email}</span>
        <button onClick={logout} className="ml-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-gray-50">
          <LogOut size={14} /> Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={login} className="flex items-center gap-2">
      <input
        type="email"
        placeholder="you@example.com"
        className="w-56 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={loading} className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black">
        <LogIn size={14} className="mr-1 inline" /> {loading ? '...' : 'Login'}
      </button>
      <button type="button" onClick={google} className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
        Sign in with Google
      </button>
    </form>
  );
}
