import { CommandInteraction } from 'discord.js';

// Role decorator factory
export function Role(requiredRole: CommandAccessLevel) {
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const interaction: CommandInteraction = args[0];
      const roles = interaction.member.roles as any;
      if (
        !roles?.cache?.has(requiredRole) &&
        requiredRole !== CommandAccessLevel.member
      ) {
        await interaction.reply({
          content: 'You do not have the required role to execute this command.',
          ephemeral: true,
        });
        return false;
      }
      return originalMethod.apply(this, args);
    };
  };
}
//we have to refactor this with actual access levels
export enum CommandAccessLevel {
  Developer = '1265375756637180027',
  vip = '484479705148293120',
  member = '484479403817173002',
}
