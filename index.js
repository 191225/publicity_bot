const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const GlobalCommands = [
	new SlashCommandBuilder()
		.setName('help')
		.setDescription('ボットのヘルプを表示します。'),
	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('APIの応答速度を返します。'),
	new SlashCommandBuilder()
		.setName('panel')
		.setDescription('パネルを作成します。')
		.addSubcommand(subcommand => 
			subcommand
				.setName('Unknown Panel')
				.setDescription('Unknownサーバーのパネルを作成します。')
			)
		.addSubcommand(subcommand => 
			subcommand
				.setName('Costom Panel')
				.setDescription('カスタムパネルを作成します。')
			)
		
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);


rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);

rest.put(Routes.applicationCommands(clientId), { body: GlobalCommands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
