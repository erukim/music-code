const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    name: "정지",
    music: true,
    /**
     * @param {Discord.Message} message
     */
    async run(message, args, client) {
        const musicbase = client.music.get(message.guild.id)
        if (musicbase) {
            musicbase.stop()
            musicbase.queue.clear()
        }
        message.channel.send({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("정지")
                    .setDescription(`${emoji.체크} 노래를 정지했어요`)
                    .addFields(
                        { name: `요청자`, value: `${message.author}`, inline: true }
                    )
            ]
        })
    }
}