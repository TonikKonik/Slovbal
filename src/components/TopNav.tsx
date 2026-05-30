'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SOUND_KEY = 'slovbal-sound-enabled';
const THEME_KEY = 'slovbal-theme';

const GAMES = [
  { href: '/slova', label: 'Slova', emoji: '🔤' },
  { href: '/mistopis', label: 'Místopis', emoji: '🗺️' },
  { href: '/anagram', label: 'Anagram', emoji: '🔀' },
];

function SoundButton() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(SOUND_KEY);
    setEnabled(stored === null ? true : stored === 'true');
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(SOUND_KEY, String(next));
  };

  return (
    <button
      onClick={toggle}
      className="text-text-secondary hover:text-text-primary transition-colors p-2"
      aria-label={enabled ? 'Vypnout zvuk' : 'Zapnout zvuk'}
      title={enabled ? 'Vypnout zvuk' : 'Zapnout zvuk'}
    >
      {enabled ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        </svg>
      )}
    </button>
  );
}

function ThemeButton() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const stored = (localStorage.getItem(THEME_KEY) || 'dark') as 'dark' | 'light';
    setTheme(stored);
    document.documentElement.setAttribute('data-theme', stored);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <button
      onClick={toggle}
      className="text-text-secondary hover:text-text-primary transition-colors p-2"
      aria-label={theme === 'dark' ? 'Světlý režim' : 'Tmavý režim'}
      title={theme === 'dark' ? 'Světlý režim' : 'Tmavý režim'}
    >
      {theme === 'dark' ? (
        /* Sun icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z" />
        </svg>
      ) : (
        /* Moon icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      )}
    </button>
  );
}

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-border-default bg-bg-primary">
      <div className="max-w-2xl mx-auto px-4 h-12 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-lg font-bold text-text-primary tracking-widest hover:opacity-80 transition-opacity">SLOVBAL</Link>

        {/* Game tabs */}
        <div className="flex items-center gap-1">
          {GAMES.map(({ href, label, emoji }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-nav-active text-text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-nav-active'
                }`}
              >
                <span className="text-base leading-none">{emoji}</span>
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Global controls */}
        <div className="flex items-center">
          <ThemeButton />
          <SoundButton />
        </div>
      </div>
    </nav>
  );
}
