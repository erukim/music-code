const { Client, Collection } = require('discord.js')
const Logger = require('./utils/Logger')
const { Manager } = require("erela.js")
const config = require('./config')
const Dokdo = require('dokdo');

const logger = new Logger('bot')

/**
 * @typedef {Object} Command
 * @property {string} name
 * @property {string} description
 * @property {string} usage
 * @property {string[]} aliases
 * @property {boolean} [isSlash]
 * @property {import('@discordjs/builders').SlashCommandBuilder} [data]
 * @property {void} execute
 * @property {Object} [slash]
 * @property {string} slash.name
 * @property {string} slash.description
 * @property {import('@discordjs/builders').SlashCommandBuilder} slash.data
 * @property {void} slash.execute
 */

/**
 * @typedef {Object} Event
 * @property {string} name
 * @property {boolean} [once]
 * @property {void} execute
 */

/**
 * @typedef {string} Error
 */

/**
 * Discord Bot Client
 * @extends {Client}
 */
class BotClient extends Client {
    /**
     * BotClient constructor
     * @param {import('discord.js').ClientOptions} options Discord client options
     */
    constructor(options = { parse: ['users', 'roles'], repliedUser: false }) {
        super(options)

        /**
         * @type {Collection<string, Command>}
         */
        this.message = new Collection()

        /**
         * @type {Collection<string, Command>}
         */
        this.slash = new Collection()

        /**
         * @type {Collection<string, Command>}
         */
        this.buttons = new Collection()

        /**
         * @type {Collection<string, Command>}
         */
        this.Select = new Collection()

        /**
         * @type {Collection<string, Command>}
         */
        this.modal = new Collection()

        /**
         * @type {Collection<string, Command>}
         */
        this.ContextMenu = new Collection()

        /**
         * @type {Collection<string, Command>}
         */
        this.Autocomplete = new Collection()

        /**
         * @type {Collection<string, Error>}
         */
        this.errors = new Collection()

        /**
         * @type {Collection<string, Event>}
         */
        this.events = new Collection()

        /**
         * @type {Dokdo}
         */
        this.dokdo = new Dokdo(this, { aliases: config.setup.dokdo.aliases, prefix: config.setup.dokdo.prefix, owners: config.setup.dokdo.devid })

        /**
         * @type {music}
         */
        this.music = new Manager({
            nodes: config.setup.lavalink,
            autoPlay: true,
            send(id, payload) {
                const guild = this.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            }
        })
        this._maxListeners = Infinity
    }

    /**
     * Loggin in the bot
     * @param {string} token Discord bot token
     */
    async start(token = process.env.TOKEN) {
        logger.info('Logging in bot...')
        await this.login(token)
    }
    /**
     * Setting status
     * @param {'dev1'|'dev2'|'online'} status 
     */
    async setStatus(status = 'online') {
        if (status.includes('dev1')) {
            logger.warn('?????? ????????? ?????????????????????.')
            this.user?.setPresence({
                activities: [
                    { name: `???????????? ??????????????????!` }
                ],
                status: 'dnd'
            })
        } else if (status.includes('dev2')) {
            logger.warn('?????? ????????? ????????? ?????????????????????.')
            this.user?.setPresence({
                activities: [
                    { name: `?????? ????????? ????????? ?????? ?????? ????????? ???????????? ????????? ????????????.` }
                ],
                status: 'dnd'
            })
        } else if (status.includes('online')) {
            logger.info('???????????? ????????? ?????????????????????.')
            this.user?.setPresence({
                activities: [
                    { name: `??????????????? ??????????????? ???????????? ????????????.` }
                ],
                status: 'online'
            })
        }
    }
}

module.exports = BotClient