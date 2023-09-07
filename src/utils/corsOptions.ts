import { CorsCallback } from '../types/CorsCallback';

const whitelist = ['http://localhost:3000', 'https://funny-shop.netlify.app'];

export const corsOptions = {
  origin: *
  //   (origin: string, callback: CorsCallback) => {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
};
