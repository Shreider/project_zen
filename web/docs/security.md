# Bezpieczeństwo i etyka

`project_zen` jest systemem demonstracyjnym dla urządzeń organizacji i urządzeń testowych. Android Agent ma działać wyłącznie jako oficjalny Device Owner / Device Policy Controller.

System nie służy do:

- przejmowania prywatnych telefonów,
- ukrywania aplikacji,
- obchodzenia zabezpieczeń Androida,
- podsłuchiwania użytkownika,
- silent install APK na zwykłym Androidzie.

## Mechanizmy bezpieczeństwa

- hasła hashowane bcrypt,
- JWT access token,
- refresh token jako hash w bazie,
- agent token jako hash,
- role `SUPERADMIN`, `ADMIN`, `VIEWER`,
- audit log dla działań administratorów,
- walidacja wejścia Zod,
- brak sekretów w frontendzie,
- HTTPS wymagany w produkcji.
