import { Injectable } from '@nestjs/common';
import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';

@Injectable()
export class HelloCommand extends ACommand {
  data = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Hello World!');

  async execute(interaction) {
    return this.run(async () => {
      await interaction.reply('moin!');
    });
  }
}
