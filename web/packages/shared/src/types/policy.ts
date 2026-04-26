export type Policy = {
  id: string;
  name: string;
  description: string;
  configJson: {
    managedModeEnabled: boolean;
    targetUrl: string;
    allowedApps: string[];
    lockTaskEnabled: boolean;
  };
  createdAt: string;
  updatedAt: string;
};
