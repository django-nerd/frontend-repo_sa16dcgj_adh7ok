import { useState } from 'react';
import { Rocket, Trophy, BookOpen, Users } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Courses', href: '#courses' },
    { label: 'Leaderboard', href: '#leaderboard' },
    { label: 'Community', href: '#community' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <Rocket size={18} />
          </div>
          <span className="text-lg font-semibold tracking-tight">GetaiCertified</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#login"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Login
          </a>
          <a
            href="#enroll"
            className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-black"
          >
            <Trophy size={16} />
            Start Learning
          </a>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-3">
              <a href="#login" className="rounded-md bg-gray-50 px-3 py-2 text-center text-sm font-medium">
                Login
              </a>
              <a href="#enroll" className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-medium text-white">
                <BookOpen size={16} /> Enroll
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
