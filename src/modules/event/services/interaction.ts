import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Events,
} from 'discord.js';
import { AEvent } from '../event.abstract';
import { CommandService } from '../../command/command.service';
import { Inject, Injectable } from '@nestjs/common';
import { PollService } from '../../poll/service/poll.service';

@Injectable()
export class Interaction extends AEvent {
  event: Events = Events.InteractionCreate;
  once: boolean = false;

  constructor(
    private readonly commandService: CommandService,
    private readonly pollService: PollService,
  ) {
    super();
  }

  async execute(interaction: any) {
    return await this.run(async () => {
      if (interaction.isCommand()) {
        const { commandName } = interaction;
        var command = this.commandService.getCommand(commandName);
        command?.execute(interaction);
      } else if (interaction.isButton()) {
        const data = await this.pollService.get(interaction.message.id);
        if (!data) return;
        const msg = await interaction.channel.messages.fetch(data.msg);
        if (interaction?.customId === 'up') {
          if (data.upMembers.includes(interaction.user.id)) {
            return await interaction.reply({
              content: `${interaction.user} you already voted for this`,
              ephermal: true,
            });
          }
          if (data.downMembers.includes(interaction.user.id)) {
            data.downvotes--;
            data.downMembers = data.downMembers.filter(
              (member) => member != interaction.user.id,
            );
          }
          data.upvotes++;
          data.upMembers.push(interaction.user.id);
          await this.pollService.update(data);

          const embed = EmbedBuilder.from(msg.embeds[0]).setFields(
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
          return await msg.edit({ embeds: [embed], components: [buttons] });
        } else if (interaction?.customId === 'down') {
          if (data.downMembers.includes(interaction.user.id)) {
            return await interaction.reply({
              content: `${interaction.user} you already voted for this`,
              ephermal: true,
            });
          }
          if (data.upMembers.includes(interaction.user.id)) {
            data.upvotes--;
            data.upMembers = data.upMembers.filter(
              (member) => member != interaction.user.id,
            );
          }
          data.downvotes++;
          data.downMembers.push(interaction.user.id);
          await this.pollService.update(data);

          const embed = EmbedBuilder.from(msg.embeds[0]).setFields(
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
          return await msg.edit({ embeds: [embed], components: [buttons] });
        } else if (interaction?.customId === 'close') {
          data.active = false;
          await this.pollService.update(data);
          await msg.edit({components: []})
          return await interaction.channel.send({content: 'The Poll has been closed!'})
        }
      } else return false;
    });
  }
}
