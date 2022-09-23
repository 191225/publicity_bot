const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const GuildCommands = [
	new SlashCommandBuilder()
		.setName('error')
		.setDescription('Displays errors that have occurred.'),
	new SlashCommandBuilder()
		.setName('test')
		.setDescription('test')
]
	.map(command => command.toJSON());

const GlobalCommands = [
	new SlashCommandBuilder()
		.setName('help')
		.setDescription('ボットのヘルプを表示します。'),
	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('APIの応答速度を返します。'),
	new SlashCommandBuilder()
		.setName('panel')
		.setDescription('パネルを作成します。'),
	new SlashCommandBuilder()
		.setName('createInvitePanel')
		.setDescription('宣伝用のカスタムパネルを作成します。'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: GuildCommands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);

rest.put(Routes.applicationCommands(clientId), { body: GlobalCommands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
