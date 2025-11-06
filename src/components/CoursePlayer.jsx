import { useEffect, useMemo, useState } from 'react';
import { Play, CheckCircle2, ChevronRight, Award, Lock } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

const demoLessons = [
  { id: 'w1l1', week: 1, title: 'Intro to AI & LLMs', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'w1l2', week: 1, title: 'Prompt Engineering Basics', video: 'https://www.w3schools.com/html/movie.mp4' },
  { id: 'w2l1', week: 2, title: 'Image Generation Workflows', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'w3l1', week: 3, title: 'Capstone: Build & Ship', video: 'https://www.w3schools.com/html/movie.mp4' },
];

export default function CoursePlayer({ token, email, courseSlug = '3-week-ai' }) {
  const [progress, setProgress] = useState({ lessons_completed: [], week_unlocked: 1, xp: 0 });
  const [current, setCurrent] = useState(demoLessons[0]);

  const headers = useMemo(() => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }), [token]);

  useEffect(() => {
    async function load() {
      if (!token || !email) return;
      const res = await fetch(`${API_BASE}/api/dashboard?email=${encodeURIComponent(email)}&course_slug=${courseSlug}`);
      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress);
      }
    }
    load();
  }, [token, email]);

  const isLocked = (lesson) => lesson.week > (progress.week_unlocked || 1);
  const isDone = (lesson) => progress.lessons_completed?.includes(lesson.id);

  const markComplete = async (lesson) => {
    if (!token) return;
    const res = await fetch(`${API_BASE}/api/progress/complete`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, course_slug: courseSlug, lesson_id: lesson.id, xp: 10 }),
    });
    if (res.ok) {
      const data = await res.json();
      setProgress((p) => ({ ...p, lessons_completed: [...new Set([...(p.lessons_completed||[]), lesson.id])], week_unlocked: data.week_unlocked, xp: (p.xp||0) + 10 }));
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-black">
            <video key={current.id} src={current.video} controls className="aspect-video w-full" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">XP: <span className="font-semibold text-gray-900">{progress.xp}</span></div>
            <button
              onClick={() => markComplete(current)}
              className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
            >
              <CheckCircle2 size={16} /> Mark as Complete
            </button>
          </div>
        </div>
        <aside className="lg:col-span-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h4 className="mb-3 text-sm font-semibold text-gray-900">Course Content</h4>
            <ul className="space-y-2">
              {demoLessons.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => !isLocked(l) && setCurrent(l)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm ${isLocked(l) ? 'cursor-not-allowed border-gray-200 text-gray-400' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-2">
                      {isDone(l) ? <CheckCircle2 size={16} className="text-green-600" /> : <Play size={16} className="text-gray-500" />}
                      <span>{l.title}</span>
                    </div>
                    {isLocked(l) ? <Lock size={16} /> : <ChevronRight size={16} />}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-900">
              Week unlocked: {progress.week_unlocked} / 3
            </div>
            {progress.week_unlocked >= 3 && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
                <Award size={14} /> You are eligible for certificate soon!
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
