import {
  CacheType,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { ACommand } from '../command.abstract';
import { SomeoneOnceSaidService } from '../../someone-once-said/service/someone-once-said.service';
import { Inject } from '@nestjs/common';
import { SomeoneOnceSaid } from '../../../schemas/someone-once-said.schema';

export default class SomeoneOnceSaidCommand extends ACommand {
  constructor(
    @Inject(SomeoneOnceSaidService)
    private readonly someoneonceSaidService: SomeoneOnceSaidService,
  ) {
    super();
  }
  data = new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Make it a quote')
    .addStringOption((option) =>
      option.setName('phrase').setDescription('What was said'),
    );

  async execute(arg: CommandInteraction<CacheType>): Promise<boolean> {
    let phrase = arg.options.get('phrase');
    if (!phrase) {
      await arg.reply({
        content: 'ok but what did he say 4head ?XP',
        ephemeral: true,
      });
      return;
    }
    let phraseValue = (phrase.value as unknown as string).replaceAll(
      '\\n',
      '\n',
    );
    const instance = new SomeoneOnceSaid({
      phrase: phraseValue,
      username: arg.user.username,
      secName: arg.user.displayName,
    });
    const created = await this.someoneonceSaidService.create(instance);
    const quoteEmbed = new EmbedBuilder()
      .setTitle('Someone once said 🤓')
      .setDescription(created.phrase)
      .setFooter({
        text: created?.secName ?? created.username,
      })
      .setTimestamp(created.createdAt);
    arg.channel.send({ embeds: [quoteEmbed] });
    return true;
  }
}
