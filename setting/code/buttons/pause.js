const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    id: "music_pause",
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        musicbase.pause(true);
        await interaction.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("⏸️ 일시정지 ⏸️")
                    .setDescription(`${emoji.체크} \`${musicbase.queue.current.title}\`(이)가 일시정지 되었습니다`)
                    .addFields(
                        { name: `요청자`, value: `${interaction.member.user}`, inline: true }
                    )
            ]
        })
    },
};