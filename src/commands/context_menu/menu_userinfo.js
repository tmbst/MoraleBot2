const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
} = require("discord.js");
const moment = require("moment");

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("userinfo")
		.setType(ApplicationCommandType.User),

	async execute(interaction) {
		const user = interaction.targetUser;
		const guildMember = interaction.targetMember;

		// Extract various data from the User and GuildMember Classes
		const userRegistered = moment(user.createdAt).format("MMMM DD, YYYY");
		const userName = user.username;
		const userDiscrim = user.discriminator;
		const userAvatar = user.displayAvatarURL();

		const guildMemberJoined = moment(guildMember.joinedAt).format(
			"MMMM DD, YYYY"
		);
		const guildMemberNickname = guildMember.nickname;
		const guildMemberColor = guildMember.displayColor;

		let guildMemberPremium;
		if (guildMember.premiumSince) {
			guildMemberPremium = moment(guild.Member.premiumSince).format(
				"MMMM DD, YYYY"
			);
		}

		// Grab all the guild member's roles
		const guildMemberRolesSize = guildMember.roles.cache.size - 1;
		const guildMemberRoles = guildMember.roles.cache.sort(
			(r1, r2) => r2.rawPosition - r1.rawPosition
		);
		const guildMemberRolesText = guildMemberRoles
			.map((r) => r)
			.slice(0, -1)
			.join(", ");

		const userInfoEmbed = new EmbedBuilder()
			.setColor(guildMemberColor)
			.setThumbnail(userAvatar)
			.setAuthor({
				name: userName + "#" + userDiscrim,
				iconURL: userAvatar,
			})
			.addFields({
				name: "🏷 Nickname",
				value: guildMemberNickname
					? guildMemberNickname
					: "No nickname set",
			})
			.addFields(
				{
					name: "✅ Registered",
					value: userRegistered,
					inline: true,
				},
				{
					name: "📆 Joined Server",
					value: guildMemberJoined,
					inline: true,
				},
				{
					name: "💎 Booster",
					value: guildMemberPremium
						? guildMemberPremium
						: "Not a booster",
					inline: true,
				}
			)
			.addFields({
				name: `🎭 All Roles (${guildMemberRolesSize})`,
				value: guildMemberRolesText
					? guildMemberRolesText
					: "No roles assigned",
			});

		await interaction.reply({ embeds: [userInfoEmbed] });
	},
};
