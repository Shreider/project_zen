# Webapp

Aplikacja webowa projektu Project Zen.

## Cel modułu

Ten katalog jest przeznaczony na kod aplikacji webowej: frontend, konfigurację narzędzi developerskich, testy oraz dokumentację uruchamiania.

## Planowana struktura

```text
webapp/
├── README.md
├── src/
├── public/
├── tests/
└── package.json
```

Rzeczywista struktura może się różnić w zależności od wybranego frameworka.

## Wymagania

Uzupełnij po wyborze stacku technologicznego, np.:

- Node.js
- pnpm, npm albo yarn
- framework webowy, np. React, Next.js, Vue lub inny

## Instalacja

Po dodaniu `package.json` zainstaluj zależności wybranym menedżerem pakietów, np.:

```bash
npm install
```

albo:

```bash
pnpm install
```

## Uruchamianie lokalne

Po skonfigurowaniu projektu dodaj tutaj właściwą komendę developerską, np.:

```bash
npm run dev
```

## Testy

Po dodaniu testów dokumentuj tutaj komendy do ich uruchamiania, np.:

```bash
npm test
```

## Konfiguracja

Jeśli aplikacja wymaga zmiennych środowiskowych, dodaj plik `.env.example` i opisz wymagane wartości w tej sekcji.

Przykład:

```text
API_URL=http://localhost:3000
```

## Build produkcyjny

Po dodaniu konfiguracji buildu uzupełnij właściwą komendę, np.:

```bash
npm run build
```

## Notatki developerskie

- Trzymaj logikę aplikacji w `src`.
- Dokumentuj nowe skrypty w tej sekcji.
- Nie commituj sekretów ani lokalnych plików `.env`.
