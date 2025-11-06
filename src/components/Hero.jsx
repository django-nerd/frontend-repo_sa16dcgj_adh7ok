import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Star } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';

export default function Hero() {
  // Use the provided stable Spline asset. Errors inside Spline are isolated by ErrorBoundary.
  const sceneUrl = 'https://prod.spline.design/Qe6dlWJktclXcUBS/scene.splinecode';

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <ErrorBoundary>
          <Spline scene={sceneUrl} style={{ width: '100%', height: '100%' }} />
        </ErrorBoundary>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-white" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 text-center">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1 text-xs font-medium text-gray-700 shadow-sm"
        >
          <Star size={14} className="text-yellow-500" /> Learn AI Tools. Build Projects. Get Certified.
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-5xl"
        >
          Master AI in 3 Weeks with Real Projects and Certification
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-base text-gray-600"
        >
          A modern learning platform designed to help you learn 14+ AI tools, build a portfolio-ready project, and earn an industry-recognized certificate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#enroll" className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-black">
            Start Learning Free
          </a>
          <a href="#courses" className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50">
            Explore Curriculum
          </a>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: 'Students', value: '12k+' },
            { label: 'AI Tools', value: '14+' },
            { label: 'Avg Rating', value: '4.9/5' },
            { label: 'Certs Issued', value: '8k+' },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <div className="text-xl font-semibold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
