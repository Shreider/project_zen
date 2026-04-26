# Android Agent

Katalog `android/` jest miejscem na przyszły komponent Android Agent projektu `project_zen`. Agent ma działać jako część **Realtime Android Environment Management** i komunikować się z backendem webowym.

## Spis Treści

- [Status](#status)
- [Cel modułu](#cel-modułu)
- [Planowana architektura](#planowana-architektura)
- [Planowana struktura](#planowana-struktura)
- [Wymagania](#wymagania)
- [Provisioning](#provisioning)
- [Integracja z backendem](#integracja-z-backendem)
- [Kontrakty API](#kontrakty-api)
- [Planowane komendy Gradle](#planowane-komendy-gradle)
- [Bezpieczeństwo](#bezpieczeństwo)
- [Roadmap](#roadmap)

## Status

Moduł Android nie jest jeszcze zaimplementowany. Katalog zawiera dokumentację startową i kontrakt integracyjny z backendem. Po dodaniu projektu Android należy uzupełnić realne wersje SDK, Gradle, Android Gradle Plugin, warianty buildów i instrukcje provisioning.

## Cel Modułu

Planowany Android Agent ma:

- zarejestrować urządzenie w backendzie,
- przechowywać token urządzenia w bezpieczny sposób,
- wysyłać cykliczny heartbeat,
- pobierać komendy administracyjne,
- raportować wyniki komend,
- wysyłać zdarzenia diagnostyczne,
- działać na urządzeniach organizacji w managed mode,
- korzystać z oficjalnych API Android Enterprise.

## Planowana Architektura

```text
Android Agent
├── Enrollment
├── Secure token storage
├── Heartbeat worker
├── Command pull worker
├── Command executor
├── Device policy integration
└── Diagnostics/event reporter
```

Komunikacja:

```text
Android Agent -> REST /api/agent/* -> Backend -> PostgreSQL
Backend -> Socket.IO -> Frontend
```

## Planowana Struktura

```text
android/
├── README.md
├── app/
│   ├── build.gradle.kts
│   └── src/
├── gradle/
├── gradlew
├── gradlew.bat
├── build.gradle.kts
└── settings.gradle.kts
```

Sugerowane pakiety po implementacji:

```text
pl.project_zen.agent
├── data/
├── devicepolicy/
├── network/
├── provisioning/
├── workers/
└── ui/
```

## Wymagania

Do uzupełnienia po dodaniu projektu Android:

- Android Studio,
- JDK,
- Android Gradle Plugin,
- Gradle Wrapper,
- Android SDK,
- minSdk,
- targetSdk,
- compileSdk.

Typowe zmienne lokalne:

```bash
export ANDROID_HOME=/path/to/android/sdk
export ANDROID_SDK_ROOT=/path/to/android/sdk
```

## Provisioning

Agent ma docelowo działać w oficjalnym modelu Device Owner / Device Policy Controller.

Scenariusz laboratoryjny przez ADB:

```bash
adb shell dpm set-device-owner pl.project_zen.agent/.YourDeviceAdminReceiver
```

Warunki:

- urządzenie testowe lub organizacyjne,
- urządzenie świeże albo po factory reset,
- Device Owner ustawiany przed normalnym użytkowaniem,
- brak prób obchodzenia zabezpieczeń systemu,
- provisioning opisany i wykonywany jawnie.

QR provisioning i enrollment token flow są kierunkiem dalszego rozwoju.

## Integracja Z Backendem

Backend lokalny:

```text
http://localhost:4000
```

Namespace agenta:

```text
/api/agent
```

W emulatorze Android adres hosta może wymagać `10.0.2.2` zamiast `localhost`.

## Kontrakty API

### Enrollment

```http
POST /api/agent/enroll
```

Aktualnie endpoint jest placeholderem i zwraca informację o wymaganym provisioning.

### Heartbeat

```http
POST /api/agent/heartbeat
Content-Type: application/json
```

Payload:

```json
{
  "deviceUuid": "tablet-01-demo",
  "batteryLevel": 84,
  "charging": false,
  "networkType": "Wi-Fi",
  "managedModeEnabled": true,
  "androidVersion": "13",
  "appVersion": "1.0.0"
}
```

Efekt:

- aktualizacja rekordu urządzenia,
- zapis `DeviceHeartbeat`,
- ustawienie statusu `ONLINE`,
- emisja eventu `device.heartbeat.received`.

### Pull Commands

```http
GET /api/agent/commands/pull
```

Aktualnie endpoint zwraca pustą listę. Docelowo powinien zwracać komendy `PENDING` dla danego urządzenia i oznaczać pobranie.

### Command Result

```http
POST /api/agent/commands/:id/result
Content-Type: application/json
```

Payload:

```json
{
  "success": true,
  "resultJson": {
    "received": true
  }
}
```

Efekt:

- status `SUCCESS` albo `FAILED`,
- zapis `resultJson`,
- zapis `errorMessage`, jeśli wystąpił,
- ustawienie `executedAt`,
- emisja eventu `device.command.finished`.

### Events

```http
POST /api/agent/events
```

Endpoint przyjmuje zdarzenia diagnostyczne. Aktualnie zwraca payload jako potwierdzenie.

## Planowane Komendy Gradle

Po dodaniu Gradle Wrappera:

```bash
./gradlew assembleDebug
./gradlew installDebug
./gradlew test
./gradlew connectedAndroidTest
```

Te komendy są orientacyjne do czasu dodania realnego projektu Android.

## Bezpieczeństwo

Zasady:

- agent tylko dla urządzeń organizacji lub testowych,
- żadnego ukrywania aplikacji,
- żadnego obchodzenia zgód użytkownika,
- żadnego przejmowania prywatnych urządzeń,
- token urządzenia przechowywany w secure storage,
- HTTPS wymagany poza lokalnym developmentem,
- provisioning jawny i zgodny z Android Enterprise,
- logowanie działań administracyjnych po stronie backendu.

## Roadmap

1. Utworzyć projekt Android/Kotlin.
2. Dodać DeviceAdminReceiver i konfigurację Device Owner.
3. Dodać klienta REST do `/api/agent`.
4. Dodać secure storage tokenu urządzenia.
5. Dodać heartbeat worker.
6. Dodać pull worker komend.
7. Dodać wykonawców komend.
8. Dodać raportowanie zdarzeń i wyników.
9. Dodać testy jednostkowe i instrumentacyjne.
