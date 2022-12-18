const { Events, Message } = require('discord.js')
const BotClient = require('../../setting/Client_Bot')
const logger = new (require('../../setting/utils/Logger'))('Manager')
module.exports = {
    name: Events.MessageCreate,
    /**
     * @param {BotClient} client 
     * @param {Message} message 
     */
    async run(message, client) {
        await client.dokdo.run(message)
    }
}