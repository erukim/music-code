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
            .setTitle('π λ°λ³΅μ¬μ π')
            .setFields(
                { name: `μμ²­μ`, value: `${interaction.member.user}`, inline: true }
            )
        if (musicbase.queueRepeat === false) {
            musicbase.setQueueRepeat(true)
            embed.setDescription(`${emoji.μ²΄ν¬} λͺ¨λ  λΈλκ° λ°λ³΅μ¬μ λ©λλ€.`)
            await interaction.reply({ embeds: [embed] })
        } else if (musicbase.queueRepeat === true) {
            musicbase.setQueueRepeat(false)
            embed.setDescription(`${emoji.μ²΄ν¬} λ°λ³΅μ¬μ λͺ¨λκ° λΉνμ±ν λμμ΄μ`)
            await interaction.reply({ content: `${interaction.user}`, embeds: [embed] })
        }
    },
};