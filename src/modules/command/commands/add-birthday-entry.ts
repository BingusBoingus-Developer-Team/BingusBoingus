import {
  CacheType,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { ACommand } from '../command.abstract';
import { Inject } from '@nestjs/common';
import { BirthdayEntryService } from '../../birthday/service/birthday-entry.service';
import { BirthdayEntry } from '../../../schemas/birthday-entry.schema';

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
    let day = arg.options.get('day');
    let month = arg.options.get('month');
    let year = arg.options.get('year');
    if (!day || !month || !year) {
      await arg.reply({
        content: 'yo listen you need to provide a day, month and year! 🤓',
        ephemeral: true,
      });
      return;
    }
    await arg.deferReply();
    let dayValue = day.value as unknown as number;
    let monthValue = month.value as unknown as number;
    let yearValue = year.value as unknown as number;
    let dateValue = new Date(yearValue, monthValue - 1, dayValue, 0, 0, 0, 0);
    const instance = new BirthdayEntry({
      birthDate: dateValue,
      username: arg.user.username,
      secName: arg.user.displayName,
      active: true,
    });
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
