/// <reference types="vite/client" />
// global.d.ts or any suitable file where type declarations are placed

interface ImportMeta {
    readonly env: {
      VITE_API_URL: string; // Define the type of your VITE_API_URL variable
      // Add other environment variables if needed
    };
  }
  