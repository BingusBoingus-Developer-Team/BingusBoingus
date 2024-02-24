import { Inject, Injectable } from '@nestjs/common';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { ACommand } from '../command.abstract';
import { PollService } from '../../poll/service/poll.service';
import { PollEntity } from '../../../schemas/poll-entity.model';

@Injectable()
export class PollCommand extends ACommand {
  constructor(
    @Inject(PollService)
    private readonly pollService: PollService,
  ) {
    super();
  }
  data = new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Start a poll in your channel!')
    .addStringOption((option) =>
      option
        .setName('topic')
        .setDescription('the topic of your poll')
        .setMinLength(5)
        .setMaxLength(200)
        .setRequired(true),
    );

  public execute(arg: any /*Interaction<CacheType>*/): Promise<boolean> {
    return this.run(async () => {
      const author = arg.user.displayName ?? arg.user.username;
      await arg.reply({
        content: `${author} has started a new poll!`,
        ephemeral: true,
      });

      const topic = await arg.options.getString('topic');

      const embed = new EmbedBuilder()
        .setColor('Aqua')
        .setAuthor({ name: author })
        .setFooter({ text: 'poll started 🤚' })
        .setTimestamp()
        .setTitle('📍 vote now!')
        .setDescription(`> ${topic}`)
        .addFields({
          name: 'Upvotes 👍',
          value: '> **No votes**',
          inline: true,
        })
        .addFields({
          name: 'Downvotes 👎',
          value: '> **No votes**',
          inline: true,
        })
        .addFields({
          name: 'Author',
          value: `> ${arg.user}`,
          inline: true,
        });

      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('up')
          .setLabel('⬆️')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('down')
          .setLabel('⬇️')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('close')
          .setLabel('⚠️ close')
          .setStyle(ButtonStyle.Danger),
      );

      const message = await arg.channel.send({ embeds: [embed], components: [buttons]});

      message.createMessageComponentCollector();
      
      let pollentity: PollEntity = {
        msg: message.id,
        upvotes: 0,
        downvotes: 0,
        upMembers: [],
        downMembers: [],
        active: true,
        ownerName: arg.user.username,
        createdAt: new Date()
      }
      await this.pollService.create(pollentity);
      return true;
    });
  }
}
