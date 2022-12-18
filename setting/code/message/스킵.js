const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    name: "스킵",
    music: true,
    /**
     * @param {Discord.Message} message
     */
    async run(message, args, client) {
        const musicbase = client.music.get(message.guild.id)
        musicbase.stop();
        return message.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("🔃 스킵 🔃")
                    .setDescription(`${emoji.체크} \`${musicbase.queue.current.title}\` (을)를 건너뛰었어요!`)
                    .addFields(
                        { name: `요청자`, value: `${message.author}`, inline: true }
                    )
            ]
        });
    }
}