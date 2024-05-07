import { Inject, Injectable } from '@nestjs/common';
import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';
import { VersionService } from '../../models/version/service/version.service';

@Injectable()
export class VersionCommand extends ACommand {
  constructor(
    @Inject(VersionService) private readonly versionService: VersionService,
  ) {
    super();
  }
  data = new SlashCommandBuilder()
    .setName('version')
    .setDescription(
      'show the version of the currently running bingus instance',
    );

  async execute(interaction) {
    const version = await this.versionService.getVersion();
    return this.run(async () => {
      if (version && version.length > 0) {
        return await interaction.reply(`The current version is: ${version}`);
      }
      return await interaction.reply('Failed to get version');
    });
  }
}
