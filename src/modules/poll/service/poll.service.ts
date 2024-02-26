import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CacheType,
  CommandInteraction,
  Embed,
  EmbedBuilder,
  Message,
} from 'discord.js';
import { DbPollService } from './db-poll.service';
import { Inject } from '@nestjs/common';
import { PollDocument } from 'src/schemas/poll.schema';

export class PollService {
  constructor(
    @Inject(DbPollService)
    private readonly dbPollService: DbPollService,
  ) {}

  async create(arg: CommandInteraction<CacheType>) {
    const author = arg.user.displayName ?? arg.user.username;
    await arg.reply({
      content: `${author} has started a new poll!`,
      ephemeral: true,
    });
    const topic = arg.options.get('topic', true).value;
    // const topic2 = await arg.options.getString('topic');

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
    const buttons = this.getPollButtons();
    const message = await arg.channel.send({
      embeds: [embed],
      components: [buttons] as any,
    });
    message.createMessageComponentCollector();

    await this.dbPollService.create({
      msg: message.id,
      upvotes: 0,
      downvotes: 0,
      upMembers: [],
      downMembers: [],
      active: true,
      ownerName: arg.user.username,
      createdAt: new Date(),
    });
  }

  private async update(
    interaction: ButtonInteraction<CacheType>,
    msg: Message<boolean>,
    data: PollDocument,
  ) {
    await this.dbPollService.update(data);
    await this.updatePollMessage(interaction, msg, data);
  }

  public async upVote(interaction: ButtonInteraction<CacheType>) {
    const data = await this.dbPollService.get(interaction.message.id);
    if (!data) return;

    const msg = await interaction.channel.messages.fetch(data.msg);

    if (data.upMembers.includes(interaction.user.id)) {
      return await interaction.reply({
        content: `${interaction.user} you already voted for this`,
        // ephemeral: true,
      });
    }
    if (data.downMembers.includes(interaction.user.id)) {
      data.downvotes--;
      data.downMembers = data.downMembers.filter(
        (member) => member != interaction.user.id,
      );
    }
    // await interaction.deferUpdate();
    data.upvotes++;
    data.upMembers.push(interaction.user.id);
    await this.update(interaction, msg, data);
  }

  public async downVote(interaction: ButtonInteraction<CacheType>) {
    const data = await this.dbPollService.get(interaction.message.id);
    if (!data) return;

    const msg = await interaction.channel.messages.fetch(data.msg);

    if (data.downMembers.includes(interaction.user.id)) {
      return await interaction.reply({
        content: `${interaction.user} you already voted for this`,
        // ephemeral: true,
      });
    }
    if (data.upMembers.includes(interaction.user.id)) {
      data.upvotes--;
      data.upMembers = data.upMembers.filter(
        (member) => member != interaction.user.id,
      );
    }
    //await interaction.deferUpdate();
    data.downvotes++;
    data.downMembers.push(interaction.user.id);
    await this.update(interaction, msg, data);
  }

  public async closePoll(interaction: ButtonInteraction<CacheType>) {
    const data = await this.dbPollService.get(interaction.message.id);
    if (!data) return;
    const msg = await interaction.channel.messages.fetch(data.msg);
    if (interaction.user.username == data.ownerName) {
      data.active = false;
      await this.dbPollService.update(data);
      await interaction.update({ components: [] });
      await interaction.channel.send({
        content: 'The Poll has been closed!',
      });
    } else {
      await interaction.channel.send({
        content: `${interaction.user} you don\'t own this poll!`,
      });
    }
  }

  private getPollButtons() {
    return new ActionRowBuilder().addComponents(
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
  }

  private setPollCounter(embed: Embed, data: PollDocument) {
    return EmbedBuilder.from(embed).setFields(
      {
        name: 'Upvotes 👍',
        value: `> **${data.upvotes}** votes`,
        inline: true,
      },
      {
        name: 'Downvotes 👎',
        value: `> **${data.downvotes}** votes`,
        inline: true,
      },
      { name: 'Author', value: `> @${data.ownerName}` },
    );
  }

  private async updatePollMessage(
    interaction: ButtonInteraction<CacheType>,
    msg: Message<boolean>,
    data: PollDocument,
  ) {
    const buttons = this.getPollButtons();
    const embed = this.setPollCounter(msg.embeds[0], data);
    await interaction.update({
      embeds: [embed],
      components: [buttons] as any,
    });
  }
}
