const config = require('../config')
function createBar(player) {
    let { size, line, slider, leftindicator, rightindicator, style } = config.setup.progress_bar;
    if (style == "simple") {
        //player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", "🔷")
        if (!player.queue.current) return `**[${slider}${line.repeat(size - 1)}${rightindicator}**\n**00:00:00 / 00:00:00**`;
        let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
        let total = player.queue.current.duration;

        let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
        if (!String(bar).includes(slider)) return `**${leftindicator}${slider}${line.repeat(size - 1)}${rightindicator}**\n**00:00:00 / 00:00:00**`;
        return `**${leftindicator}${bar[0]}${rightindicator}**\n**${new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
    } else {
        try {
            if (!player.queue.current) return `**${emoji.msg.progress_bar.empty_left}${emoji.msg.progress_bar.filledframe}${emoji.msg.progress_bar.emptyframe.repeat(size - 1)}${emoji.msg.progress_bar.empty_right}**\n**00:00:00 / 00:00:00**`;
            let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
            let total = player.queue.current.duration;
            size -= 10;
            let rightside = size - Math.round(size * (current / total));
            let leftside = Math.round(size * (current / total));
            let bar;
            if (leftside < 1) bar = String(emoji.msg.progress_bar.empty_left) + String(emoji.msg.progress_bar.emptyframe).repeat(rightside) + String(emoji.msg.progress_bar.empty_right);
            else bar = String(emoji.msg.progress_bar.filled_left) + String(emoji.msg.progress_bar.filledframe).repeat(leftside) + String(emoji.msg.progress_bar.emptyframe).repeat(rightside) + String(size - rightside !== 1 ? emoji.msg.progress_bar.empty_right : emoji.msg.progress_bar.filled_right);
            return `**${bar}**\n**${new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
        } catch (e) {
            //if problem, then redo with the new size
            if (!player.queue.current) return `**[${slider}${line.repeat(size - 1)}${rightindicator}**\n**00:00:00 / 00:00:00**`;
            let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
            let total = player.queue.current.duration;

            let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
            if (!String(bar).includes(slider)) return `**${leftindicator}${slider}${line.repeat(size - 1)}${rightindicator}**\n**00:00:00 / 00:00:00**`;
            return `**${leftindicator}${bar[0]}${rightindicator}**\n**${new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
        }
    }
}
module.exports.createBar = createBar;