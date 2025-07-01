import { cleanEnv, str, port } from 'envalid';

export default function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    PORT: port(),
    DB_HOST: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),
    JWT_SECRET: str(),
    JWT_EXPIRES_IN: str(),
  });
}
