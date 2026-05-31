# Slovbal - CLAUDE.md

> Global info: [tonikkonik-workspace/CLAUDE.md](https://github.com/TonikKonik/tonikkonik-workspace/blob/main/CLAUDE.md)

## O projektu

Slovbal je platforma českých slovních her. Obsahuje tři hry přístupné přes rozcestník na hlavní straně.

| Hra | URL | Popis |
|-----|-----|-------|
| Slova | `/slova` | Wordle v češtině — hádej skryté slovo na 4–6 písmen |
| Anagram | `/anagram` | Zamíchaná písmena, složíš slovo co nejrychleji, 5 kol |
| Místopis | `/mistopis` | Hádej česká zeměpisná jména písmeno po písmenu (Hangman) |

## Stack

- Framework: Next.js 14 (App Router), TypeScript
- Styling: Tailwind CSS s CSS proměnnými pro světlý/tmavý režim
- Database: PostgreSQL na Hetzner VPS (jen pro Slova — denní slovo)
- Auth: žádná (anonymní hráč, statistiky v localStorage)
- Deploy: PM2 na Hetzner VPS, port 3002
- URL: http://188.34.162.255:3002

## Struktura projektu

```
src/
  app/
    page.tsx           # Rozcestník (hlavní strana)
    layout.tsx         # Root layout, TopNav, anti-flash theme script
    globals.css        # CSS proměnné pro témata, 100dvh layout
    slova/page.tsx     # Hra Slova (Wordle)
    anagram/page.tsx   # Hra Anagram
    mistopis/page.tsx  # Hra Místopis
    api/word/route.ts  # API endpoint pro denní slovo
  components/
    TopNav.tsx         # Navigační lišta (logo, ikony her, přepínač téma/zvuk)
    GameBoard.tsx      # Herní mřížka pro Slova
    GameTile.tsx       # Jednotlivá políčka mřížky
    Keyboard.tsx       # Klávesnice na obrazovce (sdílená všemi hrami)
    Modal.tsx          # Win/lose modal pro Slova
    SlovaSubNav.tsx    # Sub-navigace pro Slova (obtížnost, mód)
  hooks/
    useGame.ts         # Herní logika Slova (stav, fetch slova, validace)
    useAnagram.ts      # Herní logika Anagram (míchání, timer, skóre)
    useMistopis.ts     # Herní logika Místopis (hádání písmen/slova, životy)
    useSound.ts        # Zvukové efekty (klik, whoosh, fanfara)
  lib/
    gameLogic.ts       # Vyhodnocení tahu Slova (zelená/žlutá/šedá)
    geoWords.ts        # Slovníky pro Místopis (řeky, města, hory)
    words.ts           # Záložní seznam slov pro Slova
    db.ts              # PostgreSQL připojení
```

## Herní mechaniky

### Slova
- Vstupní strana s výběrem obtížnosti, bez auto-restore
- Obtížnosti: Lehká (4 písmena, 7 pokusů), Střední (5/6), Těžká (6/5)
- Módy: Denní výzva (stejné slovo pro všechny) + Procvičování (náhodné)
- Barevné kódování: zelená = správné místo, žlutá = špatné místo, šedá = není ve slově
- Statistiky: uloženy v localStorage (streak, distribuce pokusů)
- Sub-nav s přepínačem obtížnosti a módu

### Anagram
- Vstupní strana s výběrem obtížnosti
- Obtížnosti: Lehká (4–5 písmen, 45 s/kolo), Střední (5–6, 60 s), Těžká (6–7, 75 s)
- 5 kol, skóre = zbývající čas × 10 + délka slova × 50
- Hráč kliká na písmena, skládá odpověď; může zamíchat nebo vymazat
- Sub-nav s přepínačem obtížnosti (key={difficulty} = force re-mount)

### Místopis
- Vstupní strana s výběrem kategorie (Řeky / Města / Hory)
- 7 životů; špatné písmeno = −1 život, špatný tip celého slova = −2 životy
- Klávesnice i textové pole pro tip celého slova
- Sub-nav s přepínačem kategorie
- Slovníky v `lib/geoWords.ts`: 32 řek, 50+ měst, 27 hor

## Sdílené komponenty

### TopNav
- Logo SLOVBAL = odkaz na `/`
- Ikony her (abc, 🗺️, 🔀) = přímé odkazy na jednotlivé hry
- Přepínač tmavý/světlý režim (localStorage klíč `slovbal-theme`)
- Přepínač zvuku (localStorage klíč `slovbal-sound`)

### Keyboard
- Sdílená klávesnice pro všechny tři hry, přijímá `letterStates` a `onKey`
- Řádky: diakritika nahoře, pak QWERTZUIOP, ASDFGHJKL, YXCVBNM + ENTER/BACKSPACE
- Viewport-relativní šířky kláves (`8.5vw`, max 40px, min 28px) — mobil bez zalomení
- Diakritika: pevná šířka `w-6 sm:w-7`, text `text-[10px]`

## Theming (světlý/tmavý režim)

CSS proměnné v `globals.css`, aktivace přes `[data-theme="light"]` na `<html>`:

| Proměnná | Tmavý | Světlý |
|----------|-------|--------|
| `--color-bg` | `#121213` | `#f9f9f9` |
| `--color-bg-secondary` | `#1a1a1b` | `#ffffff` |
| `--color-text` | `#ffffff` | `#1a1a1b` |
| `--color-text-secondary` | `#818384` | `#787c7e` |
| `--color-border-default` | `#3a3a3c` | `#d3d6da` |
| `--color-key-default` | `#818384` | `#d3d6da` |
| `--color-key-special` | `#565758` | `#a0a3a6` |
| `--nav-active-bg` | `rgba(255,255,255,0.10)` | `rgba(0,0,0,0.08)` |

Herní barvy (tile-correct, tile-present, tile-absent) jsou pevné hex hodnoty — nemění se s tématem.

Anti-flash script v `layout.tsx` aplikuje uložené téma před hydratací Reactu (čte localStorage, nastaví `data-theme` attribute).

## Deploy

Push na `main` → GitHub Actions (`deploy.yml`) → SSH na Hetzner → `npm run build` → PM2 restart

### Server
- Adresář: `/var/www/slovbal/`
- Databáze: PostgreSQL, db: `slovbal`
- Logy: `pm2 logs slovbal`
- Restart: `pm2 restart slovbal`

## Secrets v GitHub

- `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY`, `SERVER_PORT`
- `SLOVBAL_DATABASE_URL`
- `SLOVBAL_AUTH_SECRET`

## Databázové tabulky

- `words` — seznam českých slov pro hru Slova
- `daily_word` — denní slovo (datum + slovo + obtížnost)

## Gotchas

- `NEXT_PUBLIC_*` proměnné se embedují při buildu — změna vyžaduje rebuild a nový deploy
- `.env.local` není v gitu, zapisuje se při každém deployi ze GitHub Secrets
- Layout používá `height: 100dvh; max-height: 100dvh; overflow: hidden` — `100vh` na iOS Safari je větší než viditelná oblast a způsobuje ořezání klávesnice
- Při změně obtížnosti ve Slova: board se musí resetovat synchronně před async fetchem slova (race condition v `useGame.ts`)
- Komponenty nesmí používat `text-white` na tématických pozadích (`bg-primary`, `bg-secondary`) — vždy `text-text-primary`, protože světlý režim má tmavý text
- `text-white` je OK pouze na pevně barevných pozadích herních dlaždic (tile-correct, tile-present, tile-absent)
