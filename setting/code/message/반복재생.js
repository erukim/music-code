const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    name: "반복재생",
    music: true,
    /**
     * @param {Discord.Message} message
     */
    async run(message, args, client) {
        const musicbase = client.music.get(message.guild.id)
        if (args[0] == '켜기' || args[0] == 'ㅋㄱ') {
            musicbase.setQueueRepeat(true)
            const embed = new Embed(client, 'success')
                .setTitle('🔁 반복재생 🔁')
                .setDescription(`${emoji.체크} 반복재생 모드가 활성화 되었어요`)
                .addFields(
                    { name: `요청자`, value: `${message.author}`, inline: true }
                )
            message.channel.send({ embeds: [embed] })
        } else if (args[0] == '끄기' || args[0] == 'ㄲㄱ') {
            musicbase.setQueueRepeat(false)
            const embed = new Embed(client, 'success')
                .setTitle('🔁 반복재생 🔁')
                .setDescription(`${emoji.체크} 반복재생 모드가 비활성화 되었어요`)
                .addFields(
                    { name: `요청자`, value: `${message.author}`, inline: true }
                )
            message.channel.send({ embeds: [embed] })
        } else {
            return message.reply({
                embeds: [
                    new Embed(client, 'error')
                        .setDescription(`${emoji.엑스} 명령어가 올바르지 않아요!`)
                        .setFooter({ text: '켜기 or 끄기' })
                ]
            })
        }
    }
}