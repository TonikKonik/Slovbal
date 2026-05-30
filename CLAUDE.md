# Slovbal - CLAUDE.md

> Global info: [tonikkonik-workspace/CLAUDE.md](https://github.com/TonikKonik/tonikkonik-workspace/blob/main/CLAUDE.md)

## O projektu

Slovbal je ceska hra na hadani slov (Wordle). Hrac hada 5-pismenove ceske slovo, 6 pokusu.
Kazdy den nove slovo, stejne pro vsechny hrace.

## Stack

- Framework: Next.js (App Router)
- Database: PostgreSQL na Hetzner VPS
- Auth: zadna (anonymni hrac, statistiky v localStorage)
- Deploy: PM2 na Hetzner VPS, port 3002
- URL: http://188.34.162.255:3002

## Herni mechanika

- Mrizka 6x5 (6 pokusu, 5 pismen)
- Obtiznosti: lehka (4 pismena, 7 pokusu), stredni (5/6), tezka (6/5)
- Zelenat = spravne pismeno, spravna pozice
- Zluta = pismeno je ve slove, ale jinde
- Seda = pismeno neni ve slove
- Animace: flip karta pri odhaleni, bounce pro zelenou, wobble pro zlutou, shake pro spatne slovo
- Zvuky: klik pri psani, whoosh pri odhaleni, fanfara pri vyhre (vse vypinatelne)
- Klavesnice na obrazovce se barevnym kodovanim

## Deploy

Push na main -> GitHub Actions (deploy.yml) -> PM2 restart

## Server

- Adresar: /var/www/slovbal/
- Databaze: PostgreSQL, db: slovbal
- Logy: pm2 logs slovbal
- Restart: pm2 restart slovbal

## Secrets v GitHub

- SERVER_HOST, SERVER_USER, SERVER_SSH_KEY, SERVER_PORT
- SLOVBAL_DATABASE_URL
- SLOVBAL_AUTH_SECRET

## Databazove tabulky (navrh)

- words - seznam ceskych slov pro hru
- daily_word - denniho slovo (datum + slovo)
- scores - vysledky hracu (session_id, datum, pokusy, vyhrano)

## Gotchas

- NEXT_PUBLIC_* promenne se embeduji pri buildu, zmena vyzaduje rebuild
- .env.local neni v gitu, zapisuje se pri kazdem deployi ze secrets
