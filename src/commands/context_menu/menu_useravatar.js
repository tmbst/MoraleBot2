const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	cooldown: 2,

    data: new ContextMenuCommandBuilder()
        .setName('useravatar')
        .setType(ApplicationCommandType.User),
        
    async execute(interaction) {
		const avatar = interaction.targetUser.displayAvatarURL();
		return await interaction.reply(avatar);
    },
};