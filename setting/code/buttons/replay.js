const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    id: "music_replay",
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        musicbase.pause(false);
        await interaction.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("⏯️ 재개 ⏯️")
                    .setDescription(`${emoji.체크} \`${musicbase.queue.current.title}\`(이)가 재개 되고 있습니다`)
                    .addFields(
                        { name: `요청자`, value: `${interaction.member.user}`, inline: true }
                    )
            ]
        })
    },
};