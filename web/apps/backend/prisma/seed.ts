import { PrismaClient, UserRole, DeviceStatus, CommandStatus, CommandType, EventSeverity } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin123!ChangeMe", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: { email: "admin@example.com", passwordHash, role: UserRole.SUPERADMIN }
  });

  const devices = await Promise.all([
    prisma.device.upsert({
      where: { deviceUuid: "tablet-01-demo" },
      update: {},
      create: {
        deviceUuid: "tablet-01-demo",
        name: "Tablet-01",
        model: "Tab Active 4 Pro",
        manufacturer: "Samsung",
        androidVersion: "13",
        appVersion: "1.0.0",
        status: DeviceStatus.ONLINE,
        batteryLevel: 84,
        charging: false,
        networkType: "Wi-Fi",
        managedModeEnabled: true,
        lastSeenAt: new Date()
      }
    }),
    prisma.device.upsert({
      where: { deviceUuid: "tablet-02-demo" },
      update: {},
      create: {
        deviceUuid: "tablet-02-demo",
        name: "Tablet-02",
        model: "Lenovo Tab M10",
        manufacturer: "Lenovo",
        androidVersion: "12",
        appVersion: "1.0.0",
        status: DeviceStatus.OFFLINE,
        batteryLevel: 32,
        charging: false,
        networkType: "LTE",
        managedModeEnabled: false,
        lastSeenAt: new Date(Date.now() - 1000 * 60 * 18)
      }
    }),
    prisma.device.upsert({
      where: { deviceUuid: "environment-frontdesk-demo" },
      update: {},
      create: {
        deviceUuid: "environment-frontdesk-demo",
        name: "FrontDesk-Tablet",
        model: "Pixel Tablet",
        manufacturer: "Google",
        androidVersion: "14",
        appVersion: "1.0.0",
        status: DeviceStatus.ONLINE,
        batteryLevel: 100,
        charging: true,
        networkType: "Ethernet",
        managedModeEnabled: true,
        lastSeenAt: new Date()
      }
    })
  ]);

  await prisma.policy.create({
    data: {
      name: "Profil podstawowy",
      description: "Polityka demonstracyjna dla trybu dedicated device.",
      configJson: {
        managedModeEnabled: true,
        targetUrl: "https://example.com/environment",
        allowedApps: ["com.android.chrome", "pl.project_zen.agent"],
        lockTaskEnabled: true
      }
    }
  });

  for (const device of devices) {
    await prisma.deviceHeartbeat.create({
      data: {
        deviceId: device.id,
        batteryLevel: device.batteryLevel,
        charging: device.charging,
        networkType: device.networkType,
        managedModeEnabled: device.managedModeEnabled,
        ipAddress: "192.168.1.10"
      }
    });
    await prisma.deviceEvent.create({
      data: {
        deviceId: device.id,
        severity: EventSeverity.INFO,
        eventType: "DEVICE_SYNC",
        message: `${device.name} zsynchronizował status z backendem.`,
        metadataJson: { source: "seed" }
      }
    });
  }

  await prisma.command.createMany({
    data: [
      {
        deviceId: devices[0].id,
        type: CommandType.REQUEST_HEARTBEAT,
        status: CommandStatus.SUCCESS,
        createdByUserId: admin.id,
        resultJson: { received: true },
        executedAt: new Date()
      },
      {
        deviceId: devices[1].id,
        type: CommandType.ENABLE_MANAGED_MODE,
        status: CommandStatus.PENDING,
        createdByUserId: admin.id,
        payloadJson: { targetUrl: "https://example.com/environment" }
      }
    ]
  });

  await prisma.auditLog.createMany({
    data: [
      { userId: admin.id, action: "login", targetType: "auth", metadataJson: { seed: true } },
      { userId: admin.id, action: "create command", targetType: "command", targetId: devices[1].id }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
