import { Injectable } from '@nestjs/common';
import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';
import {
  CommandAccessLevel,
  Role,
} from '../../../common/decoratos/role.decorator';

@Injectable()
export class CoinflipCommand extends ACommand {
  data = new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Bingus flips a coin for you');

  // @Role(CommandAccessLevel.member)
  async execute(interaction) {
    return this.run(async () => {
      await interaction.reply(this.coinflip());
    });
  }

  coinflip() {
    const randomValue: number = Math.random();

    // Determine the outcome based on probabilities
    if (randomValue <= 0.48) {
      return 'the coin landed on tails';
    } else if (randomValue <= 0.96) {
      return 'the coin landed on heads';
    } else {
      return "the coin landed on its edge. what do I do now? I wasn't made for this...";
    }
  }
}
