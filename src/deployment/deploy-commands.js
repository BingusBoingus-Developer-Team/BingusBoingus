const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

dotenv.config();

const commands = [
  new SlashCommandBuilder().setName('hello').setDescription('Hello World!'),
].map((cmd) => cmd.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
rest
  .put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_CLIENT_ID,
      process.env.DISCORD_GUILD_QQT_ID,
    ),
    {
      body: commands,
    },
  )
  .then(() => console.log('deployed'))
  .catch(console.error('something went wrong!'));
