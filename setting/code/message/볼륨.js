const Discord = require('discord.js');
const Embed = require('../../utils/Embed');
const emoji = require('../../config').emoji;

module.exports = {
    name: "볼륨",
    music: true,
    // music: true,
    /**
     * @param {Discord.Message} message
     */
    async run(message, args, client) {
        const arg1 = args.join(' ')
        const musicbase = client.music.get(message.guild.id)
        if (isNaN(arg1)) return message.reply({
            embeds: [
                new Embed(client, 'warn')
                    .setDescription(`${emoji.엑스} 올바르지 않는 볼륨 입니다.`)
            ],
        });
        if ((arg1) < 0 || (arg1) > 150) return void message.reply({
            embeds: [
                new Embed(client, 'warn')
                    .setDescription(`${emoji.엑스} 볼륨은 최대 150까지만 가능합니다.`)
            ]
        })
        if (arg1) {
            musicbase.setVolume(arg1);
            message.reply({
                embeds: [
                    new Embed(client, 'success')
                        .setTitle("🎧 볼륨 🎧")
                        .setDescription(`${arg1}%`)
                        .addFields(
                            { name: `요청자`, value: `${message.author}`, inline: true }
                        )
                ]
            })
        } else {
            message.reply({
                embeds: [
                    new Embed(client, 'success')
                        .setTitle("🎧 볼륨 🎧")
                        .setDescription(`지금 재생중인 볼륨은 ${musicbase.volume}% 입니다.`)
                ]
            })
        }
    }
}