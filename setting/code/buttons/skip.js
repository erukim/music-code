const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    id: "music_skip",
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        musicbase.stop();
        await interaction.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("🔃 스킵 🔃")
                    .setDescription(`${emoji.체크} \`${musicbase.queue.current.title}\` (을)를 건너뛰었어요!`)
                    .addFields(
                        { name: `요청자`, value: `${interaction.user}`, inline: true }
                    )
            ]
        });
    },
};