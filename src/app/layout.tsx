import type { Metadata } from 'next';
import './globals.css';
import { TopNav } from '@/components/TopNav';

export const metadata: Metadata = {
  title: 'Slovbal',
  description: 'České slovní hry — Slova, Místopis, Anagram',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔤</text></svg>',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        {/* Apply saved theme before first paint — prevents flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('slovbal-theme');if(t)document.documentElement.setAttribute('data-theme',t);})()` }} />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased" style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
