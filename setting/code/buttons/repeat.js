const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    id: "music_repeat",
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        const embed = new Embed(client, 'success')
            .setTitle('🔁 반복재생 🔁')
            .setFields(
                { name: `요청자`, value: `${interaction.member.user}`, inline: true }
            )
        if (musicbase.queueRepeat === false) {
            musicbase.setQueueRepeat(true)
            embed.setDescription(`${emoji.체크} 모든 노래가 반복재생 됩니다.`)
            await interaction.reply({ embeds: [embed] })
        } else if (musicbase.queueRepeat === true) {
            musicbase.setQueueRepeat(false)
            embed.setDescription(`${emoji.체크} 반복재생 모드가 비활성화 되었어요`)
            await interaction.reply({ content: `${interaction.user}`, embeds: [embed] })
        }
    },
};