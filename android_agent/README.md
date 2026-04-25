# Android Agent

Komponent Android projektu Project Zen.

## Cel modułu

Ten katalog jest przeznaczony na kod agenta Androida, konfigurację projektu mobilnego, testy oraz dokumentację budowania i uruchamiania.

## Planowana struktura

```text
android_agent/
├── README.md
├── app/
├── gradle/
├── build.gradle.kts
└── settings.gradle.kts
```

Rzeczywista struktura może się różnić w zależności od wybranego sposobu konfiguracji projektu Android.

## Wymagania

Uzupełnij po dodaniu projektu Android, np.:

- Android Studio
- JDK zgodny z używaną wersją Android Gradle Plugin
- Android SDK
- Gradle albo Gradle Wrapper

## Konfiguracja środowiska

Przed uruchomieniem projektu upewnij się, że:

- Android SDK jest zainstalowany.
- `ANDROID_HOME` albo `ANDROID_SDK_ROOT` wskazuje katalog SDK.
- Emulator lub fizyczne urządzenie Android jest dostępne.

## Budowanie

Po dodaniu Gradle Wrappera standardowa komenda buildu może wyglądać tak:

```bash
./gradlew assembleDebug
```

## Uruchamianie

Po skonfigurowaniu aplikacji można uruchomić wariant debug na urządzeniu lub emulatorze, np.:

```bash
./gradlew installDebug
```

## Testy

Po dodaniu testów dokumentuj tutaj właściwe komendy, np.:

```bash
./gradlew test
```

Testy instrumentacyjne mogą być uruchamiane przykładowo:

```bash
./gradlew connectedAndroidTest
```

## Konfiguracja

Jeśli agent wymaga kluczy API, adresów serwerów lub innej konfiguracji, dodaj bezpieczny mechanizm konfiguracji i przykładowy plik, np. `local.properties.example` albo `.env.example`.

Nie commituj sekretów, tokenów ani lokalnych plików konfiguracyjnych.

## Notatki developerskie

- Uzupełnij tę dokumentację po dodaniu właściwego projektu Android.
- Opisz wymagane uprawnienia Androida, jeśli agent będzie ich używał.
- Dokumentuj zależności od backendu, webapp lub zewnętrznych usług.
