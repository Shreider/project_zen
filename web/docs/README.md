# Dokumentacja Techniczna

Katalog `web/docs/` zawiera dodatkowe dokumenty techniczne dla modułu web i planowanego Android Agent.

## Dokumenty

| Plik | Zakres |
| --- | --- |
| `architecture.md` | ogólna architektura systemu i przepływy danych |
| `api.md` | lista endpointów API i format odpowiedzi |
| `database.md` | modele Prisma i założenia bazy danych |
| `websocket-events.md` | nazwy eventów realtime |
| `android-agent.md` | założenia przyszłego Android Agent |
| `android-provisioning.md` | notatki provisioning Android Enterprise |
| `security.md` | bezpieczeństwo, etyka i ograniczenia |
| `deployment.md` | notatki wdrożeniowe |
| `testing.md` | scenariusze walidacji |
| `thesis-notes.md` | notatki do pracy inżynierskiej |

## Relacja Do README

README w katalogach projektu są główną dokumentacją operacyjną:

- `../../README.md` - przegląd całego repozytorium,
- `../README.md` - moduł web,
- `../apps/backend/README.md` - backend,
- `../apps/frontend/README.md` - frontend,
- `../packages/shared/README.md` - shared package,
- `../../android/README.md` - Android Agent.

Pliki w `docs/` są krótszymi notatkami tematycznymi i mogą być rozwijane wraz z implementacją.

## Zasady Aktualizacji

- Przy zmianie endpointów aktualizuj `api.md` oraz README backendu.
- Przy zmianie Prisma schema aktualizuj `database.md` oraz README backendu.
- Przy zmianie eventów Socket.IO aktualizuj `websocket-events.md` oraz README shared.
- Przy zmianie flow Android Agent aktualizuj `android-agent.md`, `android-provisioning.md` i `android/README.md`.
