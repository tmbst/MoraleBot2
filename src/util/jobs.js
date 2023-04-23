const cron = require("cron");

module.exports = {
    async fumoWeekly(client) {
        // obtaining channel to send fumo message to
        const channel = await client.channels.fetch(
            process.env.FUMO_CHANNEL_ID
        );

        let scheduledMessage = new cron.CronJob("0 8 * * Fri", () => {
            // This runs every Friday at 8:00AM
            channel.send("https://www.youtube.com/watch?v=TJw9e5hcYRk");
        });

        fumoSchedule.start();
    },
};
