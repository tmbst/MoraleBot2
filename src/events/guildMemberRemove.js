const { Events, EmbedBuilder } = require("discord.js");
const moment = require("moment");

/*
	Event: guildMemberRemove
	Uses Database?: No
	Description: Emitted whenever a member leaves a guild, or is kicked.
*/

module.exports = {
    name: Events.GuildMemberRemove,

    execute(member) {
        // Ignore bots.
        if (member.user.bot) {
            return;
        }

        // getting channel info
        const channel = member.guild.channels.cache.get(
            process.env.BOT_CHANNEL_ID
        );

        // creating leaving embed
        const leavingEmbed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Member Left the Server")
            .setThumbnail(member.user.displayAvatarURL())
            .setAuthor({
                name: `${member.user.username}#${member.user.discriminator}`,
                iconURL: member.user.displayAvatarURL(),
            })
            .setDescription(
                `${member.user.username}#${member.user.discriminator} is no longer a member of Team Morale Boost.`
            )
            .setTimestamp();

        channel.send({ embeds: [leavingEmbed] });
    },
};
