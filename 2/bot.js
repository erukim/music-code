// 콘피그 선언
const config = require('../setting/config')

// 클라이언트 선언
const { Routes, REST, ActivityType, Events } = require('discord.js')
const Client = require('../setting/Client_Bot')
const client = new Client(config.options)
client.start(config.music2.token)

// 모듈 선언
const consoleErrorManager = require('../setting/utils/consoleErrorManager')
const commandErrorManager = require('../setting/utils/ErrorManager')
const Log = require('../setting/utils/Logger')
const wait = require('node:timers/promises').setTimeout;
const fs = require('fs')
const Embed = require('../setting/utils/Embed')
const { getVoiceConnection } = require('@discordjs/voice');
const { format } = require('../setting/function/format')
const { musicbuttons } = require('../setting/function/Music_ActionRow')

// 로그 선언
const ConsoleError = new consoleErrorManager(client)
const CommandError = new commandErrorManager(client)
const logger = new Log('Music-2')

{ // 에러 종료 방지
    process.on('unhandledRejection', (reason) => { ConsoleError.report(reason, client) });
    process.on("uncaughtException", (err) => { ConsoleError.report(err, client) });
    process.on('uncaughtExceptionMonitor', (err) => { ConsoleError.report(err, client) });
    process.on('multipleResolves', () => { });
}

{ // 상태메세지
    client.on('ready', async () => {
        logger.info(`${client.user.tag} | 정상 로그인`)
        setInterval(async () => {
            client.user.setActivity(`${client.music.players.size}개의 서버에서 노래가 재생되고 있습니다!`, { type: ActivityType.Playing })
        }, 5000)
        await wait(5000)
        logger.log(`로그인시 API Ping | ${client.ws.ping}`)
    })
}

{ // 메세지 커맨드 핸들
    const cmdfile = fs.readdirSync(`../setting/code/message/`).filter(file => file.endsWith('.js'))
    for (const file of cmdfile) {
        const command = require(`../setting/code/message/${file}`)
        client.message.set(command.name, command)
    }
}

{ // 슬래쉬 커맨드 핸들
    const rest = new REST({ version: '10' }).setToken(config.music2.token)
    const commands = []
    const cmdfile = fs.readdirSync(`../setting/code/slash`).filter(file => file.endsWith(".js"))
    for (const file of cmdfile) {
        const command = require(`../setting/code/slash/${file}`)
        commands.push(command.data.toJSON());
        client.slash.set(command.data.name, command)
    }
    client.once('ready', async () => {
        logger.info(`❓ | 커맨드 푸쉬중 . . .`)
        try {
            await rest.put(Routes.applicationCommands(client.user?.id), { body: commands, });
            logger.info(`✅ | 커맨드 푸쉬 완료`)
        } catch (error) {
            ConsoleError.report(error, client)
        }
    })
}

{ // 버튼 커맨드 핸들
    const cmdfile = fs.readdirSync(`../setting/code/buttons`);
    for (const commandFile of cmdfile) {
        const command = require(`../setting/code/buttons/${commandFile}`);
        client.buttons.set(command.id, command);
    }
}

{ // 뮤직 이벤트
    client.music.on(`trackStart`, async (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        if (!channel) return
        const playl = new Embed(client, 'success')
            .setTitle("🎶 노래를 재생합니다! 🎶")
            .setURL(`${track.uri}`)
            .setDescription(`${config.emoji.체크}` + `\`${track.title}\`` + `(이)가 지금 재생되고 있습니다!`)
            .setFields(
                { name: `길이`, value: `\`${format(track.duration).split(" | ")[0]}\` | \`${format(track.duration).split(" | ")[1]}\``, inline: true },
                { name: `게시자`, value: `${track.author}`, inline: true },
            )
            .setThumbnail(`${track.thumbnail}`)
        channel.send({ embeds: [playl], components: [musicbuttons] })
    }).on(`queueEnd`, async (player) => {
        const channel = client.channels.cache.get(player.textChannel);
        const playl = new Embed(client, 'info')
            .setTitle("끝!")
            .setDescription(`노래가 끝났어요!`)
        try {
            await channel.send({ embeds: [playl] })
        } catch (err) { }
        const connection = getVoiceConnection(player.guild);
        try {
            await client.music.players.delete(player.guild)
            await connection.destroy();
        } catch (err) { }
    })
    client.on(Events.VoiceStateUpdate, async (oldState) => {
        setTimeout(async () => {
            const queue = client.music.get(oldState.guild.id)
            if (!queue) return
            if (oldState.channel?.id !== queue.voiceChannel) return
            if (oldState.channel?.members.size && oldState.channel?.members.size < 2) {
                await queue.stop()
                await queue.queue.clear()
                const voice = new Embed(client, 'default')
                    .setDescription("음성채널이 일정시간동안 비어 플레이어를 종료했어요!")
                const channel = client.channels.cache.get(queue.textChannel);
                if (!channel) return;
                try {
                    return await channel.send({ embeds: [voice] })
                } catch (err) { }
            }
        }, 15 * 1000)
    }).on(Events.ClientReady, async () => {
        client.music.init(client.user?.id);
        client.on(Events.Raw, (d) => client.music.updateVoiceState(d));
    })
}

{ // 코드실행 핸들러
    client.on(Events.InteractionCreate, async (interaction) => {
        try {
            if (!interaction.guild) return await interaction.reply({
                embeds: [
                    new Embed(client, 'warn')
                        .setDescription(`${interaction.user}님 버튼/명령어는 서버에서만 사용이 가능합니다.`)
                ]
            })
            if (interaction.isChatInputCommand()) {
                const command = await client.slash.get(interaction.commandName)
                if (!command) return
                if (command.music == true) {
                    if (!interaction.member.voice.channel) return await interaction.reply({
                        embeds: [
                            new Embed(client, 'default')
                                .setDescription(`${config.emoji.엑스} 음성채널에 먼저 참여해주세요!`)
                        ]
                    })
                    const musicbase = client.music.get(interaction.guild.id)
                    if (interaction.commandName !== '정지' && interaction.commandName !== '재개' && interaction.commandName !== '재생') {
                        if (!musicbase || !musicbase.playing) return await interaction.reply({
                            embeds: [
                                new Embed(client, 'default')
                                    .setDescription(`${config.emoji.엑스} 현재 재생되고 있는 음악이 없습니다.`)
                            ]
                        })
                    }
                    if (interaction.commandName !== '재생') {
                        if (!interaction.guild.members.me.voice.channel) return await interaction.reply({
                            embeds: [
                                new Embed(client, 'default')
                                    .setDescription(`${config.emoji.엑스} | ${client.user}봇이 지금 음성채널에 참여중이지 않습니다.`)
                            ]
                        })
                        if (interaction.member.voice.channel.id == interaction.guild.members.me.voice.channel.id == false) return await interaction.reply({
                            embeds: [
                                new Embed(client, 'default')
                                    .setDescription(`${config.emoji.엑스} | 명령어를 사용하시려면 ${client.user} 봇이랑 같은 음성채널에 참여해야됩니다!`)
                            ]
                        })
                    }
                }
                try {
                    await command.run(interaction, client)
                } catch (err) {
                    CommandError.report(err, client, interaction)
                }
            } else if (interaction.isButton()) {
                const button = await client.buttons.get(interaction.customId)
                if (!button) return
                if (button.music == true) {
                    if (!interaction.member.voice.channel) return await interaction.reply({
                        embeds: [
                            new Embed(client, 'default')
                                .setDescription(`${config.emoji.엑스} 음성채널에 먼저 참여해주세요!`)
                        ]
                    })
                    const musicbase = client.music.get(interaction.guild.id)
                    if (interaction.customId !== 'music_stop' && interaction.customId !== 'music_replay') {
                        if (!musicbase || !musicbase.playing) return await interaction.reply({
                            embeds: [
                                new Embed(client, 'default')
                                    .setDescription(`${config.emoji.엑스} 현재 재생되고 있는 음악이 없습니다.`)
                            ]
                        })
                    }
                    if (!interaction.guild.members.me.voice.channel) return await interaction.reply({
                        embeds: [
                            new Embed(client, 'default')
                                .setDescription(`${config.emoji.엑스} | ${client.user}봇이 지금 음성채널에 참여중이지 않습니다.`)
                        ]
                    })
                    if (interaction.member.voice.channel.id == interaction.guild.members.me.voice.channel.id == false) return await interaction.reply({
                        embeds: [
                            new Embed(client, 'default')
                                .setDescription(`${config.emoji.엑스} | 명령어를 사용하시려면 ${client.user} 봇이랑 같은 음성채널에 참여해야됩니다!`)
                        ]
                    })
                }
                try {
                    await button.run(interaction, client)
                } catch (err) {
                    CommandError.report(err, client, interaction)
                }
            }
        } catch (err) { }
    })
    client.on(Events.MessageCreate, async (message) => {
        try {
            if (!message.guild) return
            if (message.author.bot) return
            if (!message.content.startsWith(config.music2.prefix)) return
            const args = await message.content.slice(config.music2.prefix.length).trim().split(/ +/)
            const commandName = await args.shift()
            const command = await client.message.get(commandName)
            if (!command) return
            if (command.music == true) {
                if (!message.member.voice.channel) return await message.reply({
                    embeds: [
                        new Embed(client, 'default')
                            .setDescription(`${config.emoji.엑스} 음성채널에 먼저 참여해주세요!`)
                    ]
                })
                const musicbase = await client.music.get(message.guild.id)
                if (commandName !== '정지' && commandName !== '재개' && commandName !== '재생') {
                    if (!musicbase || !musicbase.playing) return await message.reply({
                        embeds: [
                            new Embed(client, 'default')
                                .setDescription(`${config.emoji.엑스} 현재 재생되고 있는 음악이 없습니다.`)
                        ]
                    })
                }
                if (commandName !== '재생') {
                    if (!message.guild.members.me.voice.channel) return await message.reply({
                        embeds: [
                            new Embed(client, 'default')
                                .setDescription(`${config.emoji.엑스} | ${client.user}봇이 지금 음성채널에 참여중이지 않습니다.`)
                        ]
                    })
                    if (message.member.voice.channel.id == message.guild.members.me.voice.channel.id == false) return await message.reply({
                        embeds: [
                            new Embed(client, 'default')
                                .setDescription(`${config.emoji.엑스} | 명령어를 사용하시려면 ${client.user} 봇이랑 같은 음성채널에 참여해야됩니다!`)
                        ]
                    })
                }
            }
            try {
                await command.run(message, args, client)
            } catch (err) {
                CommandError.report(err, client, message)
            }
        } catch (err) { }
    })
}