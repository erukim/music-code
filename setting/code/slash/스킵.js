const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("스킵")
        .setDescription("노래를 스킵해요.")
    ,
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        const musicbase = client.music.get(interaction.guild.id)
        musicbase.stop();
        return interaction.reply({
            embeds: [
                new Embed(client, 'success')
                    .setTitle("🔃 스킵 🔃")
                    .setDescription(`${emoji.체크} \`${musicbase.queue.current.title}\` (을)를 건너뛰었어요!`)
                    .setFields(
                        { name: `요청자`, value: `${interaction.user}`, inline: true }
                    )
            ]
        });
    }
}