// import 'dotenv/config';
import { verifyKey } from 'discord-interactions';
// import('node-fetch');

export class Utils {
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Simple method that returns a random emoji from list
  static getRandomEmoji(): string {
    const emojiList = [
      '😭',
      '😄',
      '😌',
      '🤓',
      '😎',
      '😤',
      '🤖',
      '😶‍🌫️',
      '🌏',
      '📸',
      '💿',
      '👋',
      '🌊',
      '✨',
    ];
    return emojiList[Math.floor(Math.random() * emojiList.length)];
  }

  static async installGlobalCommands(appId, commands) {
    // API endpoint to overwrite global commands
    const endpoint = `applications/${appId}/commands`;

    // try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await this.discordRequest(endpoint, { method: 'PUT', body: commands });
    // } catch (err) {
    //   console.error(err);
    // }
  }

  static async discordRequest(
    endpoint: string,
    options: { method: string; body: any },
  ) {
    // append endpoint to root API URL
    const url = 'https://discord.com/api/v10/' + endpoint;
    // Stringify payloads
    if (options.body) options.body = JSON.stringify(options.body);
    // Use node-fetch to make requests
    const res = await fetch(url, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent':
          'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
      },
      ...options,
    });
    return res;
  }

  static verifyDiscordRequest(clientKey) {
    return function (req, res, buf, encoding) {
      const signature = req.get('X-Signature-Ed25519');
      const timestamp = req.get('X-Signature-Timestamp');

      const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
      if (!isValidRequest) {
        res.status(401).send('Bad request signature');
        throw new Error('Bad request signature');
      }
    };
  }
}
