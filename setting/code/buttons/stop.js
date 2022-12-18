const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji

module.exports = {
    id: "music_stop",
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        if (musicbase) {
            musicbase.stop()
            musicbase.queue.clear()
        }
        interaction.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("정지")
                    .setDescription(`${emoji.체크} 노래를 정지했어요`)
                    .addFields(
                        { name: `요청자`, value: `${interaction.member.user}`, inline: true }
                    )
            ]
        })
    },
};