'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { topics } from '@/data/topics';
import { problems } from '@/data/problems';
import { categories } from '@/data/categories';
import { useProgress } from '@/context/ProgressContext';
import { getTopicProgress } from '@/lib/progress';

export default function Sidebar() {
  const pathname = usePathname();
  const { progress } = useProgress();

  return (
    <aside className="fixed left-0 top-[72px] bottom-0 w-64 border-r border-gray-800 bg-[#0c1222] overflow-y-auto z-40 hidden lg:block">
      <nav className="p-3 space-y-0.5">
        <Link
          href="/"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            pathname === '/'
              ? 'bg-indigo-500/15 text-indigo-400'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Home
        </Link>
        <Link
          href="/roadmap"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            pathname === '/roadmap'
              ? 'bg-indigo-500/15 text-indigo-400'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
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
                    isActive
                      ? 'bg-indigo-500/15 text-indigo-400'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                  }`}
                >
                  <div className="flex-1 min-w-0 truncate">{topic.name}</div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-12 h-1 rounded-full bg-gray-700/50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-600 tabular-nums w-7 text-right">{completed}/{total}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
