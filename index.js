const { Client, GatewayIntentBits, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('/help | Unknown');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	switch (commandName) {
		case "help":
			const helpEmbed = new EmbedBuilder()
			.setColor(0xFFFFFF)
			.setTitle('ヘルプ')
			.setDescription('このボットが使用できるコマンドは以下の通りです。\nパートナーの宣伝目的で作られたボットです。')
			.addFields(
				{
					name: "コマンド",
					value: "</help:1023155684554047550> ボットのヘルプを表示します。\n\t"
					+ "</ping:1023155684554047551> APIの応答速度を表示します。\n\t"
					+ "</panel:1023155684554047552> 宣伝パネルを送信します。"
				},
				{
					name: "使い方",
					value: "宣伝パネルを作成したいチャンネルで`/panel unknown`コマンドを送信します。\n\t"
					+ "`/panel custom`コマンドを使用することで、オリジナルのパネルを作成できます。\n\t"
					+ "カスタムパネル作成フォームのキャンセルボタンを押してもデータは消えません。"
				}
			)

			const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('ボットを導入')
					.setStyle(ButtonStyle.Link)
					.setURL("https://discord.com/api/oauth2/authorize?client_id=972395858781929503&permissions=8&scope=bot%20applications.commands")
			)
			.addComponents(
				new ButtonBuilder()
					.setLabel('サポートサーバー')
					.setStyle(ButtonStyle.Link)
					.setURL("https://discord.gg/QF3n85dr4P")
			);


			await interaction.reply({ embeds: [helpEmbed], components: [button] });//1023155684554047552
		break;
		case "ping":
			await interaction.reply(`Ping: ${client.ws.ping}ms`);
			break;
		case "panel":
			if (interaction.options._subcommand === "unknown") {
				const unknownEmbed = new EmbedBuilder()
				.setColor(0xFFFFFF)
				.setTitle('Unknown')
				.setURL('https://discord.gg/QF3n85dr4P')
				.setAuthor({ name: `${interaction.member.guild.name} パートナー`, iconURL: `https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.webp?size=96` })
				.setDescription('主に雑談サーバーとして使用されているサーバーです。\nUnknown Gamesのサポートサーバーでもあります。')
				.setThumbnail('https://cdn.discordapp.com/attachments/961976284232167445/1023144847458177074/unknown-new-icon.png')
				.addFields(
					{ name: 'カテゴリー', value: '雑談, ゲーム全般', inline: true },
					{ name: 'オーナー', value: '<@836575170306768967>', inline: true },
					{ name: 'サイト', value: 'https://mee6.gg/unk', inline: true },
				)
				.addFields({ name: '永久リンク', value: 'https://discord.gg/QF3n85dr4P', inline: false })
			
				client.channels.cache.get(interaction.channelId).send({ embeds: [unknownEmbed] });
				interaction.reply({ content: "送信しました。", ephemeral: true });
				console.info(interaction)
			} else if (interaction.options._subcommand === "custom") {
				const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('customEmbedModal_A_button')
						.setLabel('ステップ１')
						.setStyle(ButtonStyle.Primary),
				);
	
				await interaction.reply({ content: "キャンセルしてもデータは保存されます。", components: [row], ephemeral: true });	
			}
		break;
		case "bot":
			const botEmbed = new EmbedBuilder()
			.setColor(0xFFFFFF)
			.setTitle('Unknown運営ボット')
			.setURL('https://discord.gg/QF3n85dr4P')
			.setDescription('Unknownが運営しているボットです。公開されている他のボットよりも優秀かつカスタマイズできるものが採用されています。')
			.setThumbnail('https://cdn.discordapp.com/attachments/961976284232167445/1023144847458177074/unknown-new-icon.png');
			const embed_music_1 = new EmbedBuilder()
			.setColor(0xFFFFFF)
			.setTitle('Unknown Music ①')
			.setDescription('・直感的なコマンドを組み込んだ音楽ボット\n・多くのサポートされているソースとフォーマット\n・スピーディーな音楽のロード\n・多くのカスタマイズ');
			const button_music_1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Unknown Music ①を導入')
					.setStyle(ButtonStyle.Link)
					.setURL("https://discord.com/oauth2/authorize?client_id=975280244825141269&scope=bot&permissions=70642768&guild_id=0")
			);
			const embed_music_2 = new EmbedBuilder()
			.setColor(0xFFFFFF)
			.setTitle('Unknown Music ②')
			.setDescription('・直感的なコマンドを組み込んだ音楽ボット\n・多くのサポートされているソースとフォーマット\n・スピーディーな音楽のロード\n・多くのカスタマイズ');
			const button_music_2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Unknown Music ②を導入')
					.setStyle(ButtonStyle.Link)
					.setURL("https://discord.com/oauth2/authorize?client_id=975302687895719946&scope=bot&permissions=70642768&guild_id=0")
			);
			const embed_ticket = new EmbedBuilder()
			.setColor(0xFFFFFF)
			.setTitle('Unknown Tickets')
			.setDescription('・多くのカスタマイズ\n・日本語対応\n・チャットの記録（[ここで申請](https://discord.com/channels/848856541456105483/976877962249007164/976877963037519893)）');
			const button_ticket = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Unknown Ticketsを導入')
					.setStyle(ButtonStyle.Link)
					.setURL("https://discord.com/api/oauth2/authorize?client_id=975033771105591346&permissions=1514312035577&scope=bot%20applications.commands")
			);
			const embed_publicity = new EmbedBuilder()
			.setColor(0xFFFFFF)
			.setTitle('Unknown Publicity')
			.setDescription('・連携サーバー宣伝専用\n・日本語対応\n・多くのカスタマイズ');
			const button_publicity = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Unknown Publicityを導入')
					.setStyle(ButtonStyle.Link)
					.setURL("https://discord.com/api/oauth2/authorize?client_id=972395858781929503&permissions=8&scope=applications.commands%20bot")
			);
			try {
				client.channels.cache.get(interaction.channelId).send({ embeds: [botEmbed] });
				client.channels.cache.get(interaction.channelId).send({ embeds: [embed_music_1], components: [button_music_1] });
				client.channels.cache.get(interaction.channelId).send({ embeds: [embed_music_2], components: [button_music_2] });
				client.channels.cache.get(interaction.channelId).send({ embeds: [embed_ticket], components: [button_ticket] });
				client.channels.cache.get(interaction.channelId).send({ embeds: [embed_publicity], components: [button_publicity] });
				interaction.reply({ content: "送信しました。", ephemeral: true });
			} catch {
				interaction.reply({ content: "送信できませんでした。", ephemeral: true });
			}
			
			
			break;
		default:
			interaction.reply("ERR");
			console.error(interaction);
		break;
	}
});

const resultDB = new Map();

client.on('interactionCreate', async interaction => {
	if (!interaction.isModalSubmit()) return;
	console.log(interaction);
	if (interaction.customId === "customEmbedModal_A") {
		const result = {
			serverName: interaction.fields.getTextInputValue('serverName'),
			inviteLink: interaction.fields.getTextInputValue('inviteLink'),
			serverOutline: interaction.fields.getTextInputValue('serverOutline'),
			serverIcon: interaction.fields.getTextInputValue('serverIcon'),
			serverCategory: interaction.fields.getTextInputValue('serverCategory')
		}

		resultDB.set(String(interaction.user.id), result);

		

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('customEmbedModal_B_button')
					.setLabel('ステップ２')
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.reply({ components: [row], ephemeral: true });

	} else if (interaction.customId === "customEmbedModal_B") {
		if (!resultDB.has(String(interaction.user.id))) return interaction.reply({ content: "期限切れです。もう一度やり直してください。", ephemeral: true });
		const result_ = resultDB.get(String(interaction.user.id));
		const result = {
			serverName: result_.serverName || null,
			inviteLink: result_.inviteLink || null,
			serverOutline: result_.serverOutline || null,
			serverIcon: result_.serverIcon || null,
			serverCategory: result_.serverCategory || null,
			serverOwner: interaction.fields.getTextInputValue('serverOwner'),
			serverSite: interaction.fields.getTextInputValue('serverSite'),
			embedColor: ("0x" + interaction.fields.getTextInputValue('embedColor')),
			sendChannel: interaction.fields.getTextInputValue('sendChannel')
		}
		console.log(result)
		const customEmbed = new EmbedBuilder()
		.setColor(result.embedColor)
		.setTitle(result.serverName)
		.setURL(result.inviteLink)
		.setAuthor({ name: `${interaction.member.guild.name} パートナー`, iconURL: `https://cdn.discordapp.com/icons/${interaction.member.guild.id}/${interaction.member.guild.icon}.webp?size=96` })
		.setDescription(result.serverOutline)
		.setThumbnail(result.serverIcon)
		.addFields(
			{ name: 'カテゴリー', value: result.serverCategory, inline: true },
			{ name: 'オーナー', value: `<@${result.serverOwner}>`, inline: true },
			{ name: 'サイト', value: result.serverSite, inline: true },
		)
		.addFields({ name: '永久リンク', value: result.inviteLink, inline: false })
	
		client.channels.cache.get(result.sendChannel).send({ embeds: [customEmbed] });
		interaction.reply({ content: "送信しました。", ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	if (interaction.customId === "customEmbedModal_A_button") {
		const customEmbedModal_A = new ModalBuilder()
		.setCustomId('customEmbedModal_A')
		.setTitle('カスタムパネル\nステップ１');

		const serverName = new TextInputBuilder()
		.setCustomId('serverName')
		.setLabel("サーバー名")
		.setStyle(TextInputStyle.Short)
		.setPlaceholder('ex: Unknown')
		.setRequired(true);
		
		const inviteLink = new TextInputBuilder()
		.setCustomId('inviteLink')
		.setLabel("招待リンク(永久&無限)")
		.setStyle(TextInputStyle.Short)
		.setPlaceholder('ex: https://discord.gg/QF3n85dr4P')
		.setRequired(true);
		
		const serverOutline = new TextInputBuilder()
		.setCustomId('serverOutline')
		.setLabel("概要")
		.setStyle(TextInputStyle.Paragraph)
		.setRequired(true);
		
		const serverIcon = new TextInputBuilder()
		.setCustomId('serverIcon')
		.setLabel("サーバーアイコン(URL)")
		.setStyle(TextInputStyle.Short)
		.setPlaceholder('ex: https://cdn.discordapp.com/...')
		.setRequired(true);

		const serverCategory = new TextInputBuilder()
		.setCustomId('serverCategory')
		.setLabel("サーバーカテゴリー(カンマで区切る)")
		.setStyle(TextInputStyle.Short)
		.setPlaceholder('ex: 雑談,マインクラフト,VC')
		.setRequired(true);

		const serverNameRow = new ActionRowBuilder().addComponents(serverName);
		const inviteLinkRow = new ActionRowBuilder().addComponents(inviteLink);
		const serverOutlineRow = new ActionRowBuilder().addComponents(serverOutline);
		const serverIconRow = new ActionRowBuilder().addComponents(serverIcon);
		const serverCategoryRow = new ActionRowBuilder().addComponents(serverCategory);
		

		customEmbedModal_A.addComponents(serverNameRow, inviteLinkRow, serverOutlineRow, serverIconRow, serverCategoryRow);

		await interaction.showModal(customEmbedModal_A);
	}
	if (interaction.customId === "customEmbedModal_B_button") {
		const customEmbedModal_B = new ModalBuilder()
		.setCustomId('customEmbedModal_B')
		.setTitle('カスタムパネル\nステップ２');

		const serverOwner = new TextInputBuilder()
		.setCustomId('serverOwner')
		.setLabel("サーバーオーナー(ID)")
		.setStyle(TextInputStyle.Short)
		.setPlaceholder('ex: 972395858781929503')
		.setRequired(true);

		const serverSite = new TextInputBuilder()
		.setCustomId('serverSite')
		.setLabel("サイト(URL)")
		.setStyle(TextInputStyle.Short)
		.setPlaceholder('ex: https://github.com/191225')
		.setMinLength(11)
		.setRequired(true);

		const embedColor = new TextInputBuilder()
		.setCustomId('embedColor')
		.setLabel("埋め込みカラー(カラーコード)")
		.setStyle(TextInputStyle.Short)
		.setPlaceholder('ex: FFFFFF')
		.setMinLength(6)
		.setMaxLength(6)
		.setRequired(true);

		const sendChannel = new TextInputBuilder()
		.setCustomId('sendChannel')
		.setLabel("送信チャンネル(ID)")
		.setStyle(TextInputStyle.Short)
		.setValue(interaction.channelId)
		.setRequired(true);

		const serverOwnerRow = new ActionRowBuilder().addComponents(serverOwner);
		const serverSiteRow = new ActionRowBuilder().addComponents(serverSite);
		const embedColorRow = new ActionRowBuilder().addComponents(embedColor);
		const sendChannelRow = new ActionRowBuilder().addComponents(sendChannel);

		customEmbedModal_B.addComponents(serverOwnerRow, serverSiteRow, embedColorRow, sendChannelRow);

		await interaction.showModal(customEmbedModal_B);
	}
});

// Login to Discord with your client's token
client.login(token);