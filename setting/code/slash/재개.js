const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("재개")
        .setDescription("노래를 재개해요.")
    ,
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        musicbase.pause(false);
        interaction.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("⏯️ 재개 ⏯️")
                    .setDescription(`${emoji.체크} \`${musicbase.queue.current?.title || '알수없음'}\`(이)가 재개 되고 있습니다`)
                    .setFields(
                        { name: `요청자`, value: `${interaction.member.user}`, inline: true }
                    )
            ]
        })
    }
}