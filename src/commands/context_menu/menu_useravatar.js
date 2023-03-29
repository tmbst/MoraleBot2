const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
} = require("discord.js");

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("useravatar")
		.setType(ApplicationCommandType.User),

	async execute(interaction) {
		const avatar = interaction.targetUser.displayAvatarURL();

		await interaction.reply(avatar);
	},
};
