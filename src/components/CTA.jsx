import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award } from 'lucide-react';

export default function CTA() {
  return (
    <section id="enroll" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid items-center gap-8 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm sm:grid-cols-2">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">Enroll now and start learning today</h3>
          <p className="mt-3 text-sm text-gray-600">
            Join thousands of learners mastering AI. Build real projects, earn XP, and unlock your certificate.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-600" /> Industry-recognized certificate</li>
            <li className="flex items-center gap-2"><Award size={18} className="text-yellow-600" /> Leaderboard and badges</li>
            <li className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-gray-900" /> Lifetime access to updates</li>
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#" className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-black">
              Enroll for Free <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#" className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50">
              View Pricing
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h4 className="text-sm font-semibold text-gray-900">What you’ll master</h4>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-700 sm:grid-cols-3">
            {['Prompting', 'Automation', 'Vision', 'LLMs', 'No-code', 'APIs', 'Datasets', 'RAG', 'Deploy'].map((s) => (
              <span key={s} className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-center">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
