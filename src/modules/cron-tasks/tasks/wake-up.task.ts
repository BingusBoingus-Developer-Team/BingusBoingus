import { EmbedBuilder, TextChannel } from 'discord.js';
import { ITask } from './interfaces/task.interface';
import { Logger } from '@nestjs/common';

export default class WakeUpTask implements ITask {
  private channel: TextChannel;

  constructor(channel: TextChannel) {
    this.channel = channel;
  }

  async execute(): Promise<void> {
    Logger.log(`First of the month for Channel: ${this.channel}`);
    const embed = new EmbedBuilder()
      .setTitle(`🚨 WAKE UP 🚨`)
      .setColor('Random')
      .setDescription(`🎉 it's the first of the month 🎉`)
      .setTimestamp(new Date())
      .setImage(
        'https://raw.githubusercontent.com/Blvckleg/BingusBoingus/master/src/assets/wakeup.gif',
      )
      .setFooter({ text: 'party bingus' });

    await this.channel.send({ embeds: [embed] });
  }
}
