const { SlashCommandBuilder } = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;
const Discord = require('discord.js');
const { format } = require('../../function/format')
const voiceget = require('../../function/voice')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("재생")
        .setDescription("노래를 재생해요.")
        .addStringOption(options => options
            .setName("search")
            .setDescription("노래 제목 또는 링크를 적어주세요")
            .setRequired(true))
    ,
    music: true,
    /**
    * @param {Discord.CommandInteraction} interaction
    */
    async run(interaction, client) {
        await interaction.deferReply();
        const search = interaction.options.getString("search")
        const musicbase = client.music.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
        });
        if (!search) return interaction.followUp({
            embeds: [
                new Embed(client, 'default')
                    .setDescription(`${emoji.엑스} 음악의 제목이나 유튜브 링크를 알려주세요!`)
            ]
        })
        let res;
        try {
            res = await client.music.search(search, interaction.user);
            if (res.loadType === "LOAD_FAILED") throw res.exception;
        } catch (err) {
            return interaction.followUp(`검색중 오류가 발생했습니다.: ${err.message}`);
        }
        voiceget(interaction, client)
        if (res.loadType === "PLAYLIST_LOADED") {
            for (let i = 0; i < res.tracks.length; i++) {
                musicbase.queue.add(res.tracks[i])
            }
            if (!musicbase.playing && !musicbase.paused && musicbase.queue.size == res.tracks.length - 1) musicbase.play()
            const embed = new Embed(client, 'success')
                .setTitle("🎶 노래를 재생목록에 추가합니다! 🎶")
                .setURL(`${res.tracks[0].uri}`)
                .setDescription(`${emoji.체크} \`${res.tracks[0].title}\` (이)가 재생목록에 추가되었습니다!`)
                .addFields(
                    { name: `길이`, value: `\`${format(res.tracks[0].duration).split(" | ")[0]}\` | \`${format(res.tracks[0].duration).split(" | ")[1]}\``, inline: true },
                    { name: `게시자`, value: `${res.tracks[0].author}`, inline: true },
                    { name: `링크`, value: `[유튜브](${res.tracks[0].uri})`, inline: true },
                    { name: `추가된 노래수`, value: `${res.tracks.length} 개의 노래가 추가되었습니다.` },
                )
                .setThumbnail(`${res.tracks[0].thumbnail}`)
                .setFooter({ text: `신청자 : ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            await interaction.followUp({ embeds: [embed] });
        } else {
            musicbase.queue.add(res.tracks[0]);
            if (!musicbase.playing && !musicbase.paused && !musicbase.queue.size) musicbase.play()
            const embed = new Embed(client, 'success')
                .setTitle("🎶 노래를 재생목록에 추가합니다! 🎶")
                .setURL(`${res.tracks[0].uri}`)
                .setDescription(`${emoji.체크} \`${res.tracks[0].title}\` (이)가 재생목록에 추가되었습니다!`)
                .addFields(
                    { name: `길이`, value: `\`${format(res.tracks[0].duration).split(" | ")[0]}\` | \`${format(res.tracks[0].duration).split(" | ")[1]}\``, inline: true },
                    { name: `게시자`, value: `${res.tracks[0].author}`, inline: true },
                    { name: `링크`, value: `[유튜브](${res.tracks[0].uri})`, inline: true },
                )
                .setThumbnail(`${res.tracks[0].thumbnail}`)
                .setFooter({ text: `신청자 : ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            await interaction.followUp({ embeds: [embed] });
        }
    }
}