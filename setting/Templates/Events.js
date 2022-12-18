const { Events } = require('discord.js')
const BotClient = require('../../setting/Client_Bot')
const logger = new (require('../../setting/utils/Logger'))('')
const Embed = require('../../setting/utils/Embed')
const config = require('../../setting/config')

module.exports = {
    name: Events,
    /**
     * @param {BotClient} client 
     */
    async run(client) {
    }
}