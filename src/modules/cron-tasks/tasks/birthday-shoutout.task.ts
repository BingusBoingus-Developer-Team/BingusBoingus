import { EmbedBuilder, TextChannel } from 'discord.js';
import { ITask } from './interfaces/task.interface';
import { BirthdayEntryService } from '../../models/birthday/service/birthday-entry.service';

export default class BirthdayShoutoutTask implements ITask {
  private channel: TextChannel;

  constructor(
    channel: TextChannel,
    private readonly birthdayService: BirthdayEntryService,
  ) {
    this.channel = channel;
  }

  async execute(): Promise<void> {
    const birthDayEntries = await this.birthdayService.getEntryForToday();

    if (!birthDayEntries || birthDayEntries.length < 1) {
      return;
    }

    birthDayEntries.forEach((entry) => {
      const creator = this.channel.members.find(
        (member) =>
          member.user.username === entry.username ||
          member.user.displayName === entry.secName,
      );

      const embed = new EmbedBuilder()
        .setTitle(`🚨 Birthday Alert!! 🚨`)
        .setColor('Random')
        .setDescription(
          `${entry.username ?? entry.secName} is turning **${
            new Date().getFullYear() - entry.birthDate.getFullYear()
          }** years old today! 🎉🎂🎈`,
        )
        .setFooter({
          text: creator?.user.username ?? 'bingus',
          iconURL: creator?.displayAvatarURL() ?? undefined,
        })
        .setTimestamp(new Date());

      this.channel.send({ embeds: [embed] });
    });
  }
}
