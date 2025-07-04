
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
    captureInput: true,
    webContentsDebuggingEnabled: false,
    appendUserAgent: 'Sparky-Native-App',
    overrideUserAgent: 'Sparky/1.0 (Android; Mobile; TWA)',
    backgroundColor: '#0026FF'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0026FF',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0026FF',
      overlaysWebView: false
    }
  }
};

export default config;
