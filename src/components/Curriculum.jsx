import { motion } from 'framer-motion';
import { BookOpen, Layers, Wrench } from 'lucide-react';

const weeks = [
  {
    title: 'Week 1 — AI Fundamentals',
    icon: BookOpen,
    points: [
      'Core concepts: ML vs. DL, LLMs, prompting basics',
      'Ethics & responsible AI',
      'Hands-on: Prompt engineering mini-labs',
    ],
  },
  {
    title: 'Week 2 — 14+ AI Tools',
    icon: Wrench,
    points: [
      'ChatGPT, Midjourney, Runway, Notion AI, Claude',
      'Image, video, and text automation workflows',
      'Build your toolstack and ship faster',
    ],
  },
  {
    title: 'Week 3 — Capstone Project',
    icon: Layers,
    points: [
      'Choose a real problem and design an AI solution',
      'Build with no-code + code tooling',
      'Submit project, present, and get certified',
    ],
  },
];

export default function Curriculum() {
  return (
    <section id="courses" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Your 3-Week Outcome-Driven Path</h2>
        <p className="mt-3 text-sm text-gray-600">
          Progressively unlock each week. Track your progress, earn XP, and secure your certificate.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {weeks.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <w.icon size={18} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{w.title}</h3>
            <ul className="mt-3 space-y-2">
              {w.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gray-900" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
