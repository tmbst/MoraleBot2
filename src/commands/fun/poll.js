const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Creates a poll.")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Your Poll Title")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("entries")
        .setDescription("Enter your poll entries seperated by a comma")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Construct the poll list and extract details
    let polltitle = interaction.options.getString("title");
    let pollEntries = interaction.options.getString("entries");
    const pollOptions = pollEntries.split(",");
    const choices = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

    // Checks to see if the numbers of entry is within the range of use (2-9)
    if (pollOptions.length > 9) {
      return await interaction.reply(
        "At this time you can only have 9 options."
      );
    } else if (pollOptions.length < 2) {
      return await interaction.reply(
        "Please enter at least 2 options for the poll"
      );
    }

    // Create the poll embed description (all of the poll options)
    let str = "";
    let i = 0;
    for (const pollItem of pollOptions) {
      str = str + `${choices[i]} ${pollItem}\n\n`;
      i++;
    }

    // Build the poll embed and send to channel. Build reactions for each choice.
    const pollEmbed = new EmbedBuilder()
      .setColor("#7851a9")
      .setTitle(polltitle)
      .setDescription(str)
      .setFooter({
        text: `${interaction.member.user.username}'s poll.`,
        iconURL: interaction.member.user.avatarURL(),
      })
      .setTimestamp();

    // Replies to user with the poll in an embed
    await interaction.reply({ embeds: [pollEmbed] });

    // Fetches the reply so we can later react to it
    const message = await interaction.fetchReply();

    // Add reacts to the Poll Embed
    for (let i = 0; i < pollOptions.length; i++) {
      message.react(choices[i]);
    }
  },
};
