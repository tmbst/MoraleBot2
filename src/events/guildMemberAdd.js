const { Events, EmbedBuilder } = require("discord.js");
const { DateTime } = require("luxon");

/*
	Event: guildMemberAdd
	Uses Database?: No
	Description: Emitted whenever a user joins a guild.
*/

module.exports = {
  name: "guildMemberAdd",

  execute(member) {
    // getting user join date
    const userJoinedDate = DateTime.fromJSDate(member.user.createdAt);
    const userAccountAge = DateTime.now()
      .diff(userJoinedDate, ["years", "months", "days"])
      .toObject();

    let msg = "";

    // creates msg for userAccountAge
    if (userAccountAge.years == 0 && userAccountAge.months == 0) {
      msg = "Fresh Account: ";
    } else if (userAccountAge.years > 0) {
      msg = msg + userAccountAge.years + " years";
    }
    if (userAccountAge.months > 0) {
      if (msg != "") {
        msg = msg + " ,";
      }
      msg = msg + userAccountAge.months + "months";
    }
    if (userAccountAge.days > 0) {
      if (msg != "" && msg != "Fresh Account: ") {
        msg = msg + " ,";
      }
      msg = msg + Math.floor(userAccountAge.days) + " days";
    }

    // getting channel info
    const channel = member.guild.channels.cache.get(
      process.env.GENERAL_CHANNEL_ID
    );
    // getting user info
    const userName = member.user.username;
    const userDiscrim = member.user.discriminator;
    const userAvatar = member.user.displayAvatarURL();

    // creating welcome embed
    const welcomeEmbed = new EmbedBuilder()
      .setColor("00FF00")
      .setTitle("Member Joined")
      .setAuthor({ name: userName + "#" + userDiscrim, iconURL: userAvatar })
      .setDescription("Welcome to Team Morale Boost!")
      .addFields({
        name: "Account Age",
        value: msg,
      })
      .setTimestamp();

    channel.send({ embeds: [welcomeEmbed] });
  },
};
