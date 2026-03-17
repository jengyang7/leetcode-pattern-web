import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ProgressProvider } from '@/context/ProgressContext';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';
import MobileSidebar from '@/components/ui/MobileSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeetCode Patterns',
  description: 'Interactive roadmap for learning LeetCode patterns',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <ProgressProvider>
          <Header />
          <Sidebar />
          <MobileSidebar />
          <div className="lg:pl-64">
            {children}
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
