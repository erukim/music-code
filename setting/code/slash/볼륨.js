const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("볼륨")
        .setDescription("노래 볼륨을 설정해요.")
        .addIntegerOption(options => options
            .setName("볼륨")
            .setDescription("설정할 볼륨을 적어주세요")
            .setRequired(true)
        )
    ,
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        const arg1 = interaction.options.getInteger("볼륨")
        if ((arg1) < 0 || (arg1) > 150) return void interaction.reply({
            embeds: [
                new Embed(client, 'warn')
                    .setDescription(`${emoji.엑스} 볼륨은 0~150까지만 조절 할 수 있습니다`)
            ]
        });
        musicbase.setVolume(Number(arg1));
        return interaction.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("🎧 볼륨 🎧")
                    .setDescription(`${arg1}%`)
                    .setFields(
                        { name: `요청자`, value: `${interaction.user}`, inline: true }
                    )
            ]
        })
    }
}