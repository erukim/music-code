const { Events } = require('discord.js')
const BotClient = require('../../setting/Client_Bot')
const logger = new (require('../../setting/utils/Logger'))('Manager')
module.exports = {
    name: Events.ClientReady,
    /**
     * @param {BotClient} client 
     */
    async run(client) {
        logger.info(`${client.user?.tag} 정상가동완료`)
    }
}