const Discord = require('discord.js')

/**
 * @typedef {'success'|'error'|'warn'|'info'|'default'} EmbedType
 */

/**
 * @extends {Discord.EmbedBuilder}
 */
class Embed extends Discord.EmbedBuilder {
    /**
     * Custom embed constructor
     * @param {Discord.Client} client 
     * @param {EmbedType} type 
     */
    constructor(client, type) {
        let EmbedJSON = {
            timestamp: new Date(),
            footer: {
                text: client.user?.username,
                icon_url: client.user?.avatarURL()
            }
        }

        if (type === 'success') {
            EmbedJSON = {
                ...EmbedJSON,
                color: 0x57F287,
            }
        } else if (type === 'error') {
            EmbedJSON = {
                ...EmbedJSON,
                color: 0xED4245,
            }
        } else if (type === 'warn') {
            EmbedJSON = {
                ...EmbedJSON,
                color: 0xFEE75C,
            }
        } else if (type === 'info') {
            EmbedJSON = {
                ...EmbedJSON,
                color: 0x5865F2,
            }
        } else if (type === 'default') {
            EmbedJSON = {
                ...EmbedJSON,
                color: 0x2f3136,
            }
        }


        super(EmbedJSON)
        this.client = client

    }

    /**
     * Change the embed color
     * @param {EmbedType} type 
     */
    setType(type) {
        if (type === 'success') {
            this.color = 0x57F287
        } else if (type === 'error') {
            this.color = 0xED4245
        } else if (type === 'warn') {
            this.color = 0xFEE75C
        } else if (type === 'info') {
            this.color = 0x5865F2
        } else if (type === 'default') {
            this.color = 0x2f3136
        }
    }
}

module.exports = Embed