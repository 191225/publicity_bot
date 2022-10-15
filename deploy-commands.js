const { SlashCommandBuilder, Routes, PermissionFlagsBits } = require('discord.js');
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
                .setName('unknown')
                .setDescription('Unknownパネルを送信します。'))
                
        .addSubcommand(subcommand =>
            subcommand
                .setName('custom')
                .setDescription('カスタムパネルを送信します。'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	new SlashCommandBuilder()
		.setName('bot')
		.setDescription('ボットパネルを作成します。')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);


rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);

rest.put(Routes.applicationCommands(clientId), { body: GlobalCommands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
