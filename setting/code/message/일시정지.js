const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    name: "일시정지",
    music: true,
    /**
     * @param {Discord.Message} message
     */
    async run(message, args, client) {
        const musicbase = client.music.get(message.guild.id)
        musicbase.pause(true);
        message.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("⏸️ 일시정지 ⏸️")
                    .setDescription(`${emoji.체크} \`${musicbase.queue.current.title}\`(이)가 일시정지 되었습니다`)
                    .setFields(
                        { name: `요청자`, value: `${message.author}`, inline: true }
                    )
            ]
        })
    }
}