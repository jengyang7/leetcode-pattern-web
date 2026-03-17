import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-[72px] border-b border-gray-800 bg-[#0a0f1a]/80 backdrop-blur-sm flex items-center px-6">
      <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-colors">
        LeetCode Patterns
      </Link>
    </header>
  );
}
