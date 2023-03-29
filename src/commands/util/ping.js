const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {

	//Creating the command and description.
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
	
	//Functionality of the command.
	async execute(interaction) {
		await interaction.reply({ 
			content: 'Calculating Ping...' 
		});

		const reply = await interaction.fetchReply();
		const botLatency = reply.createdTimestamp - interaction.createdTimestamp;
		const apiLatency = Math.round(interaction.client.ws.ping);
		
		const pingEmbed = new EmbedBuilder()
			.setColor('#4fffa4')
			.setTitle('🏓 Pong!')
			.addFields(
				{name: 'Bot Latency', value: `**${botLatency}ms**`},
				{name: 'API Latency', value: `**${apiLatency}ms**`},
			)

		await interaction.editReply({
			content : 'Ping Calculated.', 
			embeds: [pingEmbed] 
		});
	},
};
