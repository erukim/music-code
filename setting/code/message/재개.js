const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    name: "재개",
    music: true,
    async run(message, args, client) {
        const musicbase = client.music.get(message.guild.id)
        musicbase.pause(false);
        message.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("⏯️ 재개 ⏯️")
                    .setDescription(`${emoji.체크} \`${musicbase.queue.current.title}\`(이)가 재개 되고 있습니다`)
                    .addFields(
                        { name: `요청자`, value: `${message.author}`, inline: true }
                    )
            ]
        })
    }
}