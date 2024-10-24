import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';
import { Inject } from '@nestjs/common';
import { BirthdayEntryService } from '../../models/birthday/service/birthday-entry.service';
import { CreateOrUpdateBirthdayEntryDto } from '../../models/birthday/dto/create-or-update-birthday-entry.dto';
import {
  CommandAccessLevel,
  Role,
} from '../../../common/decoratos/role.decorator';

export default class DeactivateBirthdayEntryShoutoutCommand extends ACommand {
  constructor(
    @Inject(BirthdayEntryService)
    private readonly birthdayEntryService: BirthdayEntryService,
  ) {
    super();
  }
  data = new SlashCommandBuilder()
    .setName('deactivate-birthday-shoutout')
    .setDescription(
      "Use this if you don't want Bingus to shout you out on your birthday!",
    );

  // @Role(CommandAccessLevel.member)
  async execute(arg: CommandInteraction<CacheType>): Promise<boolean> {
    await arg.deferReply();
    const instance: CreateOrUpdateBirthdayEntryDto = {
      username: arg.user.username,
      secName: arg.user.displayName,
      serverId: arg.guildId,
      active: false,
    };
    const inactive =
      await this.birthdayEntryService.updateBirthdayEntry(instance);
    if (!inactive) {
      await arg.editReply({
        content:
          'You are already not receiving a birthday shoutout from Bingus! 🎉',
      });
    } else {
      await arg.editReply({
        content:
          'You will no longer receive a birthday shoutout from Bingus! 🎉',
      });
    }
    return true;
  }
}
