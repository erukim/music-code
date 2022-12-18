const { Events, GuildMember } = require('discord.js')
const BotClient = require('../../setting/Client_Bot')
const logger = new (require('../../setting/utils/Logger'))('')
const Embed = require('../../setting/utils/Embed')
const config = require('../../setting/config')

module.exports = {
    name: Events.GuildMemberAdd,
    /**
     * @param {BotClient} client 
     * @param {GuildMember} member 
     */
    async run(member, client) {
        client.channels.cache.get('1053909788288880640').send({
            embeds: [
                new Embed(client, 'success')
                    .setDescription(`${member.user} (\`${member.user.tag}\`)님이 서버에 입장하셨습니다.`)
            ]
        })
    }
}