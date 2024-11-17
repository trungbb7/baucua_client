import { config } from "dotenv";

config();

export default {
  env: {
    API_URL: process.env.API_URL,
    HOST: process.env.HOST,
  },
};
