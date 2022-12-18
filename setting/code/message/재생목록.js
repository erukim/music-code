const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;
const { format } = require('../../function/format')

module.exports = {
    name: "재생목록",
    music: true,
    /**
     * @param {Discord.Message} message
     */
    async run(message, args, client) {
        const musicbase = client.music.get(message.guild.id)
        const tracks = musicbase.queue;
        var maxTracks = 10;
        var songs = tracks.slice(0, maxTracks);
        const embed = new Embed(client, 'default')
            .setTitle(`재생목록 \`${message.guild.name}\``)
            .addFields(
                { name: `**\` N. \` *${musicbase.queue.length > maxTracks ? musicbase.queue.length - maxTracks : musicbase.queue.length} 개의 노래가 대기중 ...***`, value: `\u200b`, },
                { name: `**\` 0. \` __재생중인 노래__**`, value: `**${musicbase.queue.current?.uri ? `[${musicbase.queue.current.title.substring(0, 60).replace(/\[/giu, '\\[').replace(/\]/giu, '\\]')}](${musicbase.queue.current.uri})` : musicbase.queue.current?.title}** - \`${musicbase.queue.current?.isStream ? `LIVE STREAM` : format(musicbase.queue.current?.duration).split(` | `)[0]}\`\n> 신청자: __${musicbase.queue.current.requester.tag}__`, }
            )
            .setDescription(String(songs.map((track, index) => `**\` ${++index}. \` ${track.uri ? `[${track.title.substring(0, 60).replace(/\[/giu, '\\[').replace(/\]/giu, '\\]')}](${track.uri})` : track.title}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n> 신청자: __${(track.requester).tag}__`).join(`\n`)).substring(0, 2000).length ? String(songs.map((track, index) => `**\` ${++index}. \` ${track.uri ? `[${track.title.substring(0, 60).replace(/\[/giu, '\\[').replace(/\]/giu, '\\]')}](${track.uri})` : track.title}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n> 신청자: __${(track.requester).tag}__`).join(`\n`)).substring(0, 2000) : '** **');
        return void message.channel.send({ embeds: [embed] });
    }
}