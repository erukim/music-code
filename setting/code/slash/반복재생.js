const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("반복재생")
        .setDescription("노래를 반복재생해요.")
        .addStringOption(options => options
            .setName("mode")
            .setDescription("모드를 선택해주세요")
            .setRequired(true)
            .addChoices(
                { name: "켜기", value: "1" },
                { name: "끄기", value: "0" }
            )
        )
    ,
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const 옵션값 = interaction.options.getString("mode")
        const musicbase = client.music.get(interaction.guild.id)
        const embed = new Embed(client, 'success')
            .setTitle('🔁 반복재생 🔁')
            .setFields(
                { name: `요청자`, value: `${interaction.member.user}`, inline: true }
            )
        if (옵션값 == '1') {
            musicbase.setQueueRepeat(true)
            embed.setDescription(`${emoji.체크} 반복재생 모드가 활성화 되었어요`)
            interaction.reply({ embeds: [embed] })
        } else if (옵션값 == '0') {
            musicbase.setQueueRepeat(false)
            embed.setDescription(`${emoji.체크} 반복재생 모드가 비활성화 되었어요`)
            interaction.reply({ embeds: [embed] })
        } else {
            return interaction.reply({
                embeds: [
                    new Embed(client, 'error')
                        .setDescription(`${emoji.엑스} 잘못된 경로로 접근하셨습니다`)
                ]
            })
        }
    }
}