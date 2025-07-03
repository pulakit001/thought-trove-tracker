
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.718bd76ec7894cc6b58ddfcfba1fa8cd',
  appName: 'Sparky',
  webDir: 'dist',
  server: {
    url: 'https://718bd76e-c789-4cc6-b58d-dfcfba1fa8cd.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    captureInput: true
  }
};

export default config;
