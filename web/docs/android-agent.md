# Android Agent

Agent Android jest przyszłym modułem `project_zen`.

Założenia:

- Kotlin,
- Android SDK,
- DeviceAdminReceiver,
- DevicePolicyManager,
- Lock Task Mode,
- Foreground Service,
- WorkManager,
- BOOT_COMPLETED receiver,
- Retrofit albo OkHttp,
- secure storage dla tokena urządzenia.

Agent ma działać tylko na urządzeniach organization-owned albo testowych, provisionowanych jako Device Owner.
