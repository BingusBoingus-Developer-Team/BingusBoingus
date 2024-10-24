import {
  CacheType,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { ACommand } from '../command.abstract';
import { Inject } from '@nestjs/common';
import { SomeoneOnceSaidService } from '../../models/someone-once-said/service/someone-once-said.service';
import {
  CommandAccessLevel,
  Role,
} from '../../../common/decoratos/role.decorator';

export default class GetRandomQuote extends ACommand {
  constructor(
    @Inject(SomeoneOnceSaidService)
    private readonly someoneonceSaidService: SomeoneOnceSaidService,
  ) {
    super();
  }
  data = new SlashCommandBuilder()
    .setName('randomquote')
    .setDescription('get a random quote of a user');

  // @Role(CommandAccessLevel.member)
  async execute(arg: CommandInteraction<CacheType>): Promise<boolean> {
    const someoneOnceSaid = await this.someoneonceSaidService.getRandomQuote(
      arg.guildId,
    );
    if (!someoneOnceSaid) return;
    const quoteEmbed = new EmbedBuilder()
      .setTitle(
        `${someoneOnceSaid.secName ?? someoneOnceSaid.username} once said 🤓`,
      )
      .setDescription(someoneOnceSaid.phrase)
      .setFooter({
        text: someoneOnceSaid?.secName ?? someoneOnceSaid.username,
      })
      .setTimestamp(someoneOnceSaid.createdAt);
    arg.reply({ embeds: [quoteEmbed] });
  }
}
