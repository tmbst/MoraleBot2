const { Events, EmbedBuilder } = require("discord.js");
const moment = require("moment");

/*
	Event: guildMemberAdd
	Uses Database?: No
	Description: Emitted whenever a user joins a guild.
*/

module.exports = {
    name: Events.GuildMemberAdd,

    execute(member) {
        // getting user join date
        const userJoinedDate = moment(member.user.createdAt).format(
            "MMMM DD, YYYY"
        );

        // getting channel info
        const channel = member.guild.channels.cache.get(
            process.env.WELCOME_CHANNEL_ID
        );

        // creating welcome embed
        const welcomeEmbed = new EmbedBuilder()
            .setColor("00FF00")
            .setTitle("Member Joined")
            .setThumbnail(member.user.displayAvatarURL())
            .setAuthor({
                name: member.user.username + "#" + member.user.discriminator,
                iconURL: member.user.displayAvatarURL(),
            })
            .setDescription("Welcome to Team Morale Boost!")
            .addFields({
                name: "User Registered",
                value: userJoinedDate,
            })
            .setTimestamp();

        channel.send({ embeds: [welcomeEmbed] });
    },
};
