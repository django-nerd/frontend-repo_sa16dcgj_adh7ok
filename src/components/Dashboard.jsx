import { useEffect, useState } from 'react';

export default function Dashboard({ email = 'student@example.com' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const load = async () => {
      try {
        const url = `${backend}/api/dashboard?email=${encodeURIComponent(email)}&course_slug=3-week-ai`;
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (backend) load();
  }, [backend, email]);

  if (!backend) {
    return (
      <section id="dashboard" className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
          Set VITE_BACKEND_URL to enable the live dashboard. Example: https://your-backend.onrender.com
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="dashboard" className="mx-auto max-w-7xl px-4 py-16">
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">Loading dashboard…</div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Your Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">Welcome back, {data?.user?.name}. Track your learning journey.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-500">XP</div>
          <div className="mt-1 text-3xl font-semibold">{data?.progress?.xp ?? 0}</div>
          <div className="mt-2 text-xs text-gray-500">Earn XP by completing lessons and quizzes.</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-500">Week Unlocked</div>
          <div className="mt-1 text-3xl font-semibold">{data?.progress?.week_unlocked ?? 1}/3</div>
          <div className="mt-2 text-xs text-gray-500">Advance by finishing required lessons.</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-500">Badges</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(data?.user?.badges || []).length === 0 ? (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">No badges yet</span>
            ) : (
              data.user.badges.map((b) => (
                <span key={b} className="rounded-md bg-indigo-50 px-2 py-1 text-xs text-indigo-700">{b}</span>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {(data?.progress?.lessons_completed || []).slice(-5).reverse().map((l) => (
              <li key={l} className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
                <span>Lesson {l}</span>
                <span className="text-xs text-gray-500">Completed</span>
              </li>
            ))}
            {(!data?.progress?.lessons_completed || data.progress.lessons_completed.length === 0) && (
              <li className="rounded-md border border-dashed border-gray-200 p-3 text-gray-500">No activity yet. Start your first lesson!</li>
            )}
          </ul>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">Leaderboard (Top 10)</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {(data?.leaderboard || []).map((row, idx) => (
              <li key={row.user_email || idx} className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
                <span className="truncate">{row.user_email}</span>
                <span className="text-xs text-gray-600">{row.xp} XP</span>
              </li>
            ))}
            {(data?.leaderboard || []).length === 0 && (
              <li className="rounded-md border border-dashed border-gray-200 p-3 text-gray-500">Leaderboard updates as students progress.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
