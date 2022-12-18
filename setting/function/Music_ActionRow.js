const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js')

const musicbuttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId("music_replay")
        .setLabel("재개")
        .setEmoji('<:music_1:1053921068588482620>')
        .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
        .setCustomId("music_repeat")
        .setLabel("반복재생")
        .setEmoji('<:music_2:1053921070241038368>')
        .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
        .setCustomId("music_skip")
        .setLabel("스킵")
        .setEmoji('<:music_3:1053921071323152395>')
        .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
        .setCustomId("music_stop")
        .setLabel("정지")
        .setEmoji('<:music_5:1053921074972196965>')
        .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
        .setCustomId("music_pause")
        .setLabel("일시정지")
        .setEmoji('<:music_4:1053921073298673766>')
        .setStyle(ButtonStyle.Secondary),
);
const musicvolume = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("music_volume_menu")
            .setPlaceholder("볼륨 선택")
            .setMaxValues(1)
            .setMinValues(1)
            .setOptions([
                {
                    label: "볼륨 10%",
                    value: "m_v_10"
                },
                {
                    label: "볼륨 20%",
                    value: "m_v_20"
                },
                {
                    label: "볼륨 30%",
                    value: "m_v_30"
                },
                {
                    label: "볼륨 40%",
                    value: "m_v_40"
                },
                {
                    label: "볼륨 50%",
                    value: "m_v_50"
                },
                {
                    label: "볼륨 60%",
                    value: "m_v_60"
                },
                {
                    label: "볼륨 70%",
                    value: "m_v_70"
                },
                {
                    label: "볼륨 80%",
                    value: "m_v_80"
                },
                {
                    label: "볼륨 90%",
                    value: "m_v_90"
                },
                {
                    label: "볼륨 100%",
                    value: "m_v_100"
                },
                {
                    label: "볼륨 110%",
                    value: "m_v_110"
                },
                {
                    label: "볼륨 120%",
                    value: "m_v_120"
                },
                {
                    label: "볼륨 130%",
                    value: "m_v_130"
                },
                {
                    label: "볼륨 140%",
                    value: "m_v_140"
                },
                {
                    label: "볼륨 150%",
                    value: "m_v_150"
                },
            ])
    )
const musicvolume2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
        .setCustomId("music_volume_up")
        .setLabel("⬆볼륨UP")
        .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
        .setCustomId("music_volume_down")
        .setLabel("⬇볼륨DOWN")
        .setStyle(ButtonStyle.Secondary),
);
module.exports.musicbuttons = musicbuttons;
module.exports.musicvolume = musicvolume;
module.exports.musicvolume2 = musicvolume2;