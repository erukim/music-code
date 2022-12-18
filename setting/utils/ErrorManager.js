const Discord = require('discord.js')
const BaseManager = require('./BaseManager')
const Embed = require('./Embed')
const Logger = require('./Logger')
const uuid = require('uuid')

let config = require('../config')

/**
 * @extends BaseManager
 */
class ErrorManager extends BaseManager {
  /**
   * ErrorManager constructor
   * @param {import('../bot')} client Bot client
   */
  constructor(client) {
    super(client)
    this.logger = new Logger('bot')
  }

  /**
   * Report error in Discord Channel
   * @param {Error} error Error object
   * @param {Discord.Message|Discord.CommandInteraction} executer
   * @param {boolean} [userSend=false] If the error is send to the user
   */
  report(error, client, executer, userSend = true) {
    const date = new Date()
    const time = Math.round(date.getTime() / 1000)
    let errorCode = uuid.v4()
    let errorEmbed = new Embed(client, 'error')
      .setTitle('오류가 발생했습니다.')
      .setDescription('명령어에서 오류가 발생하여 정상적으로 작동되지 않았습니다.\n공식 서버로 알려주세요!')
      .addFields(
        { name: `오류 코드`, value: `${errorCode}`, inline: true },
      )
    userSend ? executer?.reply({ embeds: [errorEmbed] }) : null
    let webhook = new Discord.WebhookClient({
      url: config.log.command_log,
    })
    webhook.send({
      username: `Command Error`,
      avatarURL: config.log.log_img,
      embeds: [
        new Embed(client, 'default')
          .setTitle(`[<t:${time}:T> ERROR]`)
          .setDescription(`${error.stack}`)
          .addFields(
            { name: `에러코드`, value: `${errorCode}` },
          )
      ]
    })
  }
}

module.exports = ErrorManager