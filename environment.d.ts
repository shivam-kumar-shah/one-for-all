declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION_URL: string;
    }
  }
}

export {};
