const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    id: "music_volume_up",
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        const embed = new Embed(client, 'success')
            .setTitle("🎧 볼륨 🎧")
        if (musicbase.volume == "150") {
            embed.setDescription(`소리가 최대치입니다.`)
            return interaction.reply({ embeds: [embed] })
        } else {
            const arg1 = musicbase.volume + 10;
            musicbase.setVolume(Number(arg1));
            embed.setDescription(`${arg1}%`)
            return interaction.reply({ embeds: [embed] })
        }
    },
};