# Android Agent

Katalog `android/` jest miejscem na przyszły komponent Android Agent projektu `project_zen`.

Agent ma działać jako element **Realtime Android Environment Management** i komunikować się z backendem webowym. Zakładany model wdrożenia opiera się na oficjalnych mechanizmach Android Enterprise, przede wszystkim Device Owner / Device Policy Controller oraz managed mode.

## Aktualny status

Moduł Android nie jest jeszcze zaimplementowany. W katalogu znajduje się tylko dokumentacja startowa. Po dodaniu projektu Android należy uzupełnić tu realne komendy Gradle, warianty buildów, konfigurację SDK i instrukcje provisioning.

## Planowana struktura

```text
android/
├── README.md
├── app/
├── gradle/
├── gradlew
├── gradlew.bat
├── build.gradle.kts
└── settings.gradle.kts
```

Rzeczywista struktura może się różnić w zależności od wersji Android Gradle Plugin i sposobu wygenerowania projektu.

## Zakres planowanego agenta

- rejestracja urządzenia w backendzie,
- cykliczny heartbeat z baterią, siecią, wersją Androida i wersją aplikacji,
- odbieranie komend administracyjnych z backendu,
- raportowanie wyniku wykonania komend,
- działanie w managed mode na urządzeniach organizacji,
- integracja z DevicePolicyManager tam, gdzie jest to zgodne z oficjalnym modelem Android Enterprise.

## Wymagania po dodaniu projektu

Po utworzeniu projektu Android należy udokumentować konkretne wersje:

- Android Studio,
- JDK,
- Android Gradle Plugin,
- Gradle Wrapper,
- Android SDK,
- minimalny i docelowy poziom API.

## Konfiguracja środowiska

Typowe wymagania lokalne:

```bash
export ANDROID_HOME=/path/to/android/sdk
export ANDROID_SDK_ROOT=/path/to/android/sdk
```

Do uruchomienia będzie potrzebny emulator lub fizyczne urządzenie Android. Dla scenariuszy Device Owner należy przygotować osobną procedurę provisioning, ponieważ zwykła instalacja debug nie daje aplikacji uprawnień właściciela urządzenia.

## Planowane komendy

Po dodaniu Gradle Wrappera typowe komendy mogą wyglądać tak:

```bash
./gradlew assembleDebug
./gradlew installDebug
./gradlew test
./gradlew connectedAndroidTest
```

Te komendy są orientacyjne. Należy je zweryfikować po dodaniu realnego projektu Android.

## Integracja z backendem

Backend webowy udostępnia endpointy dla agenta pod prefiksem:

```text
/api/agent
```

Planowane przepływy:

- `POST /api/agent/enroll` - przygotowanie rejestracji urządzenia,
- `POST /api/agent/heartbeat` - raport stanu urządzenia,
- `GET /api/agent/commands/pull` - pobieranie komend,
- `POST /api/agent/commands/:id/result` - wynik wykonania komendy,
- `POST /api/agent/events` - zdarzenia diagnostyczne.

## Zasady bezpieczeństwa

- Agent powinien działać wyłącznie na urządzeniach organizacji lub urządzeniach testowych.
- Nie należy implementować funkcji ukrywania aplikacji, obchodzenia zgód użytkownika ani przejmowania prywatnych urządzeń.
- Sekrety, tokeny enrollment i dane środowiskowe muszą być trzymane poza repozytorium.
- Wszystkie mechanizmy zarządzania urządzeniem powinny korzystać z oficjalnych API Android Enterprise.
