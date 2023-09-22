import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.APP_PORT,
  botToken: process.env.BOT_TOKEN,
  publicKey: process.env.APP_PUBLIC_KEY,
  clientId: process.env.CLIENT_ID,
  serverId: process.env.SERVER_ID,
}));
