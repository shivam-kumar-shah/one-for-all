declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION_URL: string;
      JWT_SECRET: string;
      HASH_SECRET: number;
    }
  }
}

export {};
