const { Events } = require("discord.js");
const cron = require("cron");
const jobs = require("../util/jobs");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        jobs.fumoWeekly(client);
    },
};
