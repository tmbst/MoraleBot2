const { Events } = require("discord.js");
const cron = require("cron");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        let scheduledMessage = new cron.CronJob("0 8 * * Fri", () => {
            // This runs every Friday at 8:00AM
            // Specifing your channel
            const channel = client.channels.cache.get(
                process.env.FUMO_CHANNEL_ID
            );
            // Sends fumofriday link
            channel.send("https://www.youtube.com/watch?v=TJw9e5hcYRk");
        });

        // When you want to start it, use:
        scheduledMessage.start();
    },
};
