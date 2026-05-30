import Link from 'next/link';

const GAMES = [
  {
    href: '/slova',
    emoji: '🔤',
    title: 'Slova',
    description: 'Hádej skryté české slovo. Máš 6 pokusů — zelená, žlutá, šedá tě navedou.',
    available: true,
  },
  {
    href: '/anagram',
    emoji: '🔀',
    title: 'Anagram',
    description: 'Zamíchaná písmena — složíš slovo co nejrychleji. 5 kol, čím rychleji tím víc bodů.',
    available: true,
  },
  {
    href: '/mistopis',
    emoji: '🗺️',
    title: 'Místopis',
    description: 'Hádej česká místní jména — řeky, města, hory. Zadej písmeno, uvidíš nápovědu.',
    available: false,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 gap-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-text-primary tracking-widest">SLOVBAL</h1>
        <p className="text-text-secondary mt-2">České slovní hry</p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-3">
        {GAMES.map(({ href, emoji, title, description, available }) => (
          available ? (
            <Link
              key={href}
              href={href}
              className="flex items-start gap-4 p-4 rounded-xl border border-border-default bg-bg-secondary hover:border-border-filled transition-all group"
            >
              <span className="text-3xl mt-0.5">{emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-text-primary font-bold text-lg">{title}</div>
                <div className="text-text-secondary text-sm mt-0.5 leading-snug">{description}</div>
              </div>
              <svg className="text-text-secondary mt-1 flex-none" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            </Link>
          ) : (
            <div
              key={href}
              className="flex items-start gap-4 p-4 rounded-xl border border-border-default bg-bg-secondary opacity-50 cursor-not-allowed"
            >
              <span className="text-3xl mt-0.5">{emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-text-primary font-bold text-lg">{title}</div>
                  <span className="text-xs bg-border-default text-text-secondary px-2 py-0.5 rounded-full uppercase tracking-wider">Brzy</span>
                </div>
                <div className="text-text-secondary text-sm mt-0.5 leading-snug">{description}</div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
