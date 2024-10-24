import {
  CacheType,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { ACommand } from '../command.abstract';
import { Inject } from '@nestjs/common';
import { ServerConfigService } from '../../models/config/service/server-config.service';
import { CreateOrUpdateServerConfigDto } from '../../models/config/dto/create-or-update-server-config.dto';

export default class ConfigureServerChannelCommand extends ACommand {
  constructor(
    @Inject(ServerConfigService)
    private readonly configService: ServerConfigService,
  ) {
    super();
  }
  data = new SlashCommandBuilder()
    .setName('configure')
    .setDescription(
      'set the channel id where the bot will send all scheduled messages',
    )
    .addStringOption((option) =>
      option.setName('channelid').setDescription('the Id of the text-channel'),
    );

  // @Role(CommandAccessLevel.member)
  async execute(arg: CommandInteraction<CacheType>): Promise<boolean> {
    const channelId = arg.options.get('channelid');
    if (!channelId) {
      await arg.reply({
        content: 'you need to provide a valid channel Id! 🤓',
        ephemeral: true,
      });
      return false;
    }
    await arg.deferReply();
    const channelIdValue = channelId.value as unknown as string;
    const instance: CreateOrUpdateServerConfigDto = {
      channelId: channelIdValue,
      serverId: arg.guildId,
    };
    const created =
      await this.configService.createOrUpdateServerConfig(instance);
    const quoteEmbed = new EmbedBuilder()
      .setTitle('Your scheduled messages textchannel was configured! 🤓')
      .setDescription('🤓')
      .setFooter({
        text: 'scheduled messages activated',
      })
      .setTimestamp(new Date());
    await arg.editReply({ embeds: [quoteEmbed] });
    return true;
  }
}

