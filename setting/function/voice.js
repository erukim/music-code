const { joinVoiceChannel } = require('@discordjs/voice');
const Embed = require('../utils/Embed')
const emoji = require('../config').emoji;
const Discord = require('discord.js')

/**
 * @param {Discord.CommandInteraction} interaction
 * @param {Discord.Message} message
 */
module.exports = async (interaction, message, client) => {
    if (interaction) {
        if (!interaction.member.voice.channel) return await interaction.reply({ embeds: [new Embed(client, 'default').setDescription(`${emoji.엑스} | 음성채널에 먼저 참여해주세요!`)] })
        try { await joinVoiceChannel({ channelId: interaction.member.voice.channel.id, guildId: interaction.guild.id, adapterCreator: interaction.guild.voiceAdapterCreator }) } catch (err) { }
    } else if (message) {
        if (!message.member.voice.channel) return await message.reply({ embeds: [new Embed(client, 'default').setDescription(`${emoji.엑스} | 음성채널에 먼저 참여해주세요!`)] })
        try { await joinVoiceChannel({ channelId: message.member.voice.channel.id, guildId: message.guild.id, adapterCreator: message.guild.voiceAdapterCreator }) } catch (err) { }
    }
}