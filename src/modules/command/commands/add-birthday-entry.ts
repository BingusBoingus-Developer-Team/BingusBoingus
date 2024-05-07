import {
  CacheType,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { ACommand } from '../command.abstract';
import { Inject } from '@nestjs/common';
import { BirthdayEntryService } from '../../models/birthday/service/birthday-entry.service';
import { CreateOrUpdateBirthdayEntryDto } from '../../models/birthday/dto/create-or-update-birthday-entry.dto';

export default class AddBirthdayEntryCommand extends ACommand {
  constructor(
    @Inject(BirthdayEntryService)
    private readonly birthdayEntryService: BirthdayEntryService,
  ) {
    super();
  }
  data = new SlashCommandBuilder()
    .setName('addbirthday')
    .setDescription(
      'Add your Birhtday to receive a special message on your day!',
    )
    .addNumberOption((option) =>
      option.setName('day').setDescription('your day of birth'),
    )
    .addNumberOption((option) =>
      option.setName('month').setDescription('your month of birth'),
    )
    .addNumberOption((option) =>
      option.setName('year').setDescription('your year of birth'),
    );

  async execute(arg: CommandInteraction<CacheType>): Promise<boolean> {
    const day = arg.options.get('day');
    const month = arg.options.get('month');
    const year = arg.options.get('year');
    if (!day || !month || !year) {
      await arg.reply({
        content: 'yo listen you need to provide a day, month and year! 🤓',
        ephemeral: true,
      });
      return false;
    }
    await arg.deferReply();
    const dayValue = day.value as unknown as number;
    const monthValue = month.value as unknown as number;
    const yearValue = year.value as unknown as number;
    const dateValue = new Date(yearValue, monthValue - 1, dayValue, 0, 0, 0, 0);
    const instance: CreateOrUpdateBirthdayEntryDto = {
      birthDate: dateValue,
      username: arg.user.username,
      secName: arg.user.displayName,
      active: true,
    };
    const created =
      await this.birthdayEntryService.createOrUpdateBirthdayEntry(instance);
    const quoteEmbed = new EmbedBuilder()
      .setTitle('Your Birthday was added or updated! 🤓')
      .setDescription('🎂')
      .setFooter({
        text: created?.secName ?? created.username,
      })
      .setTimestamp(created.createdAt);
    await arg.editReply({ embeds: [quoteEmbed] });
    return true;
  }
}
