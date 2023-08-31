/* eslint-disable no-unused-vars */
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      CLIENT_URL: string;
      PORT: string;
    }
  }
}
