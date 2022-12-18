const Client = require('../setting/Client_Bot')
const config = require('../setting/config')
const fs = require('node:fs')
const client = new Client(config.options)
client.start(config.music_manager.token)
fs.readdirSync(`./events`).filter(file => file.endsWith('.js')).forEach(file => {
    const event = require(`./events/${file}`);
    client.on(event.name, async (...args) => await event.run(...args, client));
})