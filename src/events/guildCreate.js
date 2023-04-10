const { Events } = require("discord.js");

/*
	Event: guildCreate
	Uses Database?: No
	Description: Emitted whenever the client joins a guild.
*/

module.exports = {
  name: Events.GuildCreate,

  async execute(guild) {
    const channel = guild.channels.cache.get(process.env.GENERAL_CHANNEL_ID);
    let message = "Thanks for inviting me to the server! I am the MoraleBot2.";
    channel.send(message);
  },
};
