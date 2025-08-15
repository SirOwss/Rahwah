import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.98458dba19ae4d47847aabde6c0d9840',
  appName: 'naqqsh-ai-architect',
  webDir: 'dist',
  server: {
    url: 'https://98458dba-19ae-4d47-847a-abde6c0d9840.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;