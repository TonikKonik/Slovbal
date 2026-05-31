# Slovbal

Platforma českých slovních her postavená na Next.js.

🌐 **Live:** http://188.34.162.255:3002

## Hry

| | Hra | Popis |
|--|-----|-------|
| 🔤 | **Slova** | Wordle v češtině — hádej skryté české slovo (4–6 písmen) s barevnými nápovědami. Denní výzva nebo procvičování. |
| 🔀 | **Anagram** | Zamíchaná písmena — složíš slovo co nejrychleji. 5 kol, čím rychleji tím víc bodů. |
| 🗺️ | **Místopis** | Hádej česká zeměpisná jména (řeky, města, hory) písmeno po písmenu. 7 životů. |

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** s CSS proměnnými — světlý i tmavý režim
- **PostgreSQL** (denní slovo pro Slova)
- **PM2** deploy na Hetzner VPS

## Vývoj

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # produkční build
npx tsc --noEmit  # type check
```

## Deploy

Push na `main` → GitHub Actions → SSH deploy → PM2 restart
