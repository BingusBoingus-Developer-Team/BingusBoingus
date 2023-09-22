import { Injectable } from '@nestjs/common';
import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';

@Injectable()
export class CBDCommand extends ACommand {
  data = new SlashCommandBuilder()
    .setName('cbd')
    .setDescription('der hurensohn!');

  async execute(interaction) {
    return this.run(async () => {
      await interaction.reply('Wenn der Hurenohn nur wüsste...');
    });
  }
}
