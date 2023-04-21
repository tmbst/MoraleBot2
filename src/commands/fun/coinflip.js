const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("Heads or tails? Only one way to find out.")
        .addIntegerOption((option) =>
            option
                .setName("betting")
                .setDescription(
                    "Are you willing to back up your guess with some Morale?"
                )
        ),

    async execute(interaction) {
        const bet = interaction.options.getInteger("betting");
        let msg = "";
        if (bet != null) {
            msg = `You bet ${bet} Morale! `;
        }
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("heads")
                    .setLabel("Heads!")
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("tails")
                    .setLabel("Tails!")
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setLabel("❌ Cancel!")
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({
            content: msg + "\n What will you choose? Heads or tails?",
            components: [button],
        });

        // fetches the reply and creates a collector for user's response
        const message = await interaction.fetchReply();
        const collector = message.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 10000,
        });

        // simulates flipping a coin through rng
        let rng = Math.floor(Math.random() * 2);

        let results = "heads";
        if (rng == 1) {
            results = "tails";
        }

        // Collection event: Handles game logic
        collector.on("collect", async (collected) => {
            // checks for a win
            const choice = collected.customId;
            const isWin = results == choice;

            // user chooses cancel button
            if (choice == "cancel") {
                return await interaction.editReply({
                    content: `
						> __**Game Cancelled**__
						> Any bets have been refunded.`,
                    components: [],
                });
            }

            // Set colors and disable all buttons according touser response
            button.components.forEach((component) => {
                if (component.data.custom_id == choice) {
                    if (isWin) {
                        component.setStyle("Success");
                    } else {
                        component.setStyle("Danger");
                    }
                }
                component.setDisabled(true);
            });

            // Win/lose response
            if (collected.user.id === interaction.user.id) {
                if (isWin) {
                    if (bet != null) {
                        collected.update({
                            content: `The coin landed on ${results}! \nCongratulations, you won ${bet} Morale!`,
                            components: [button],
                        });
                    } else {
                        collected.update({
                            content: `The coin landed on ${results}! \nExcellent guess!`,
                            components: [button],
                        });
                    }
                } else {
                    if (bet != null) {
                        collected.update({
                            content: `The coin landed on ${results}! \nUnfortunately, you lost ${bet} Morale!\nBetter luck next time...`,
                            components: [button],
                        });
                    } else {
                        collected.update({
                            content: `The coin landed on ${results}! \nBetter luck next time!`,
                            components: [button],
                        });
                    }
                }
            }
        });

        // Collector End Event
        collector.on("end", async (collected) => {
            console.log(`Collected ${collected.size} interactions.`);
            // user took too longer than 10 seconds to respond
            if (collected.size == 0) {
                return await interaction.editReply({
                    content: `
						> __**Game Cancelled**__
						> Any bets have been refunded.
						> Please click on the Heads or Tails buttons. The time limit is 10 seconds.`,
                    components: [],
                });
            }
        });
    },
};
