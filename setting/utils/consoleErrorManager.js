const Discord = require('discord.js')
const BaseManager = require('./BaseManager')
const Embed = require('../utils/Embed')
const Logger = require('../utils/Logger')

let config = require('../config')

/**
 * @extends BaseManager
 */
class consoleErrorManager extends BaseManager {
  /**
   * consoleErrorManager constructor
   * @param {import('../bot')} client Bot client
   */
  constructor(client) {
    super(client)

    this.logger = new Logger('bot')
  }

  /**
   * Report consoleError in Discord Channel
   * @param {consoleError} consoleError consoleError object
   * @param {Discord.Message|Discord.CommandInteraction} executer
   * @param {boolean} [userSend=false] If the consoleError is send to the user
   */
  report(consoleError, client, executer, userSend = true) {


    const date = new Date()
    const time = Math.round(date.getTime() / 1000)

    let webhook = new Discord.WebhookClient({
      url: config.log.console_log,
    })

    webhook.send({
      username: `Console Error`,
      avatarURL: config.log.log_img,
      embeds: [
        new Embed(client, 'default')
          .setTitle(`[<t:${time}:T> ERROR]`)
          .setDescription(`${consoleError.stack}`)
      ]
    })
  }
}

module.exports = consoleErrorManager