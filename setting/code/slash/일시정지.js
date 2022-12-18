const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("일시정지")
        .setDescription("노래를 일시정지해요.")
    ,
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        musicbase.pause(true);
        interaction.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("⏸️ 일시정지 ⏸️")
                    .setDescription(`${emoji.체크} \`${musicbase.queue.current.title}\`(이)가 일시정지 되었습니다`)
                    .addFields(
                        { name: `요청자`, value: `${interaction.member.user}`, inline: true }
                    )
            ]
        })
    }
}