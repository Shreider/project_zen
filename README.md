# Project Zen

Monorepo dla projektu Project Zen. Repozytorium jest podzielone na dwa główne moduły:

- `webapp` - aplikacja webowa.
- `android_agent` - komponent/agencja dla Androida.

## Struktura

```text
.
├── android_agent/
│   └── README.md
├── webapp/
│   └── README.md
└── README.md
```

## Moduły

### Webapp

Kod aplikacji webowej powinien znajdować się w katalogu `webapp`. Szczegółowe informacje dotyczące instalacji, konfiguracji, uruchamiania i testów są opisane w [webapp/README.md](webapp/README.md).

### Android Agent

Kod komponentu Android powinien znajdować się w katalogu `android_agent`. Szczegółowe informacje dotyczące środowiska, budowania, uruchamiania i testów są opisane w [android_agent/README.md](android_agent/README.md).

## Wymagania

Wymagania zależą od konkretnego modułu. Przed rozpoczęciem pracy sprawdź README w odpowiednim katalogu:

- [webapp/README.md](webapp/README.md)
- [android_agent/README.md](android_agent/README.md)

## Konfiguracja

Pliki konfiguracyjne i zmienne środowiskowe powinny być dokumentowane lokalnie przy module, którego dotyczą. Jeśli projekt będzie używał sekretów lub konfiguracji środowiskowej, dodaj przykładowy plik `.env.example` w odpowiednim katalogu.

## Praca nad projektem

1. Wejdź do katalogu modułu, nad którym pracujesz.
2. Zainstaluj zależności zgodnie z README modułu.
3. Skonfiguruj wymagane zmienne środowiskowe.
4. Uruchom aplikację lub testy lokalnie.

## Status

Repozytorium zawiera obecnie strukturę startową. Szczegółowe komendy instalacji, uruchamiania i testowania należy uzupełnić po dodaniu właściwego stacku technologicznego.
