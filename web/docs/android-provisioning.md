# Provisioning Android

Test laboratoryjny przez ADB:

```bash
adb shell dpm set-device-owner package.name/.YourDeviceAdminReceiver
```

Warunki:

- urządzenie świeże albo po factory reset,
- najlepiej bez konta Google,
- Device Owner ustawiony przed normalnym użytkowaniem,
- tylko urządzenia organizacji albo testowe.

QR provisioning jest kierunkiem dalszego rozwoju.
