const { Events, Message } = require('discord.js')
const BotClient = require('../../Client_Bot')
const logger = new (require('../../utils/Logger'))('')
const Embed = require('../../utils/Embed')
const config = require('../../config')

module.exports = {
    name: Events.MessageCreate,
    /**
     * @param {BotClient} client 
     * @param {Message} message 
     */
    async run(message, client) {
    }
}