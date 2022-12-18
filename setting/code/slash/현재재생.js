const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;
const Discord = require('discord.js');
const { format } = require('../../function/format')
const { createBar } = require('../../function/createBar')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("현재재생")
        .setDescription("현재 재생중인 곡을 표시해요.")
    ,
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        const embed = new Embed(client, 'success')
            .setAuthor({ name: `${client.user.tag}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setThumbnail(`https://img.youtube.com/vi/${musicbase.queue.current.identifier}/mqdefault.jpg`)
            .setURL(musicbase.queue.current.uri)
            .setTitle(`${musicbase.queue.current.title}`)
            .addFields(
                { name: `재생률`, value: `${createBar(musicbase)}` },
                { name: `노래시간`, value: `\`${format(musicbase.queue.current.duration).split(" | ")[0]}\` | \`${format(musicbase.queue.current.duration).split(" | ")[1]}\``, inline: true },
                { name: `제작자`, value: `\`${musicbase.queue.current.author}\``, inline: true },
                { name: `남은 노래`, value: `\`${musicbase.queue.length} 개\``, inline: true },
            )
            .setFooter({ text: `${musicbase.queue.current.requester.tag}`, iconURL: musicbase.queue.current.requester.displayAvatarURL({ dynamic: true }) })
        return void interaction.reply({ embeds: [embed] });
    }
}