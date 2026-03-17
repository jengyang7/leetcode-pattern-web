'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { topics } from '@/data/topics';
import { problems } from '@/data/problems';
import { categories } from '@/data/categories';
import { useProgress } from '@/context/ProgressContext';
import { getTopicProgress } from '@/lib/progress';

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { progress } = useProgress();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 transition-colors"
        aria-label="Open navigation"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#0c1222] border-r border-gray-800 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <span className="text-sm font-semibold text-gray-200">Navigation</span>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-3 space-y-0.5">
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === '/' ? 'bg-indigo-500/15 text-indigo-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                Home
              </Link>
              <Link
                href="/roadmap"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === '/roadmap' ? 'bg-indigo-500/15 text-indigo-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                Roadmap
              </Link>

              {categories.map(category => (
                <div key={category.name}>
                  <div className="pt-4 pb-1 px-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">{category.name}</span>
                  </div>
                  {category.slugs.map(slug => {
                    const topic = topics.find(t => t.slug === slug);
                    if (!topic) return null;
                    const { completed, total, percentage } = getTopicProgress(slug, problems, progress);
                    const isActive = pathname === `/topic/${slug}`;
                    return (
                      <Link
                        key={slug}
                        href={`/topic/${slug}`}
                        className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive ? 'bg-indigo-500/15 text-indigo-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                        }`}
                      >
                        <div className="flex-1 min-w-0 truncate">{topic.name}</div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="w-12 h-1 rounded-full bg-gray-700/50 overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-[10px] text-gray-600 tabular-nums">{completed}/{total}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
