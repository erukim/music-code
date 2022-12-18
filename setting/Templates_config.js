module.exports = {
    log: {
        log_img: ``, // 로그 이미지
        console_log: ``, // 웹훅
        command_log: ``, // 웹훅
    },
    options: {
        intents: [131071],
        allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
    },
    setup: {
        lavalink: [
            {
                host: "127.0.0.1",
                password: "password",
                port: 2333
            },
        ],
        dokdo: {
            prefix: "!",
            devid: [
                "", // 디버깅 유저
            ],
            aliases: ["dok", "d"]
        },
        progress_bar: {
            style: "simple",
            __comment__: "styles: 'simple', 'comlex'",
            leftindicator: "[",
            rightindicator: "]",
            slider: "🔘",
            size: 25,
            line: "▬",
            ___comment___: "those are for the complex style",
            empty_left: "<:left_empty:909415753265086504>",
            filled_left: "<:left_filled:909415753692897300>",
            empty_right: "<:right_empty:909415753416056832>",
            filled_right: "<:right_filled:909415753135042562>",
            emptyframe: "<:middle_empty:909415753059545139>",
            filledframe: "<:middle_filled:909415753462218792>"
        },
    },
    emoji: {
        체크: ``,
        엑스: ``,
    },
    music_manager: {
        token: ``,
        prefix: `!`,
    },
    music1: {
        token: ``,
        prefix: `p1`,
    },
    music2: {
        token: ``,
        prefix: `p2`,
    },
    music3: {
        token: ``,
        prefix: `p3`,
    },
}