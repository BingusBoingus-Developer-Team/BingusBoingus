import {
    CacheType,
    CommandInteraction,
    SlashCommandBuilder,
  } from 'discord.js';
  import { ACommand } from '../command.abstract';
  import { Inject } from '@nestjs/common';
  import { BirthdayEntryService } from '../../birthday/service/birthday-entry.service';
  import { BirthdayEntry } from '../../../schemas/birthday-entry.schema';
  
  export default class ActivateBirthdayEntryShoutoutCommand extends ACommand {
    constructor(
      @Inject(BirthdayEntryService)
      private readonly birthdayEntryService: BirthdayEntryService,
    ) {
      super();
    }
    data = new SlashCommandBuilder()
      .setName('activate-birthday-shoutout')
      .setDescription(
        'Use this if you want Bingus to shout you out on your birthday (default)!',
      );
  
    async execute(arg: CommandInteraction<CacheType>): Promise<boolean> {
      await arg.deferReply();
      const instance = new BirthdayEntry({
        username: arg.user.username,
        secName: arg.user.displayName,
        active: true
      });
      const inactive =
        await this.birthdayEntryService.updateBirthdayEntry(instance);
        if (!inactive) {
            await arg.editReply({ content: 'I don\'t know your birthday yet! 🎉'});
        } else {
            await arg.editReply({ content: 'You will now receive a birthday shoutout from Bingus! 🎉'});
        }
      return true;
    }
  }
  