const { Events, ChatInputCommandInteraction } = require('discord.js')
const BotClient = require('../../Client_Bot')
const logger = new (require('../../utils/Logger'))('')
const Embed = require('../../utils/Embed')
const config = require('../../config')

module.exports = {
    name: Events,
    /**
     * @param {BotClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async run(interaction, client) {
        interaction.customId
        interaction.fields.getTextInputValue
    }
}