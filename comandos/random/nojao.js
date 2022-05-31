const Discord = require('discord.js');

module.exports = {
    name: "nojao",
    alias: ["asao"],

    execute (mekox, message, args){
        message.delete("nojao","asao")
        var links = ['https://cdn.discordapp.com/attachments/887737260554977311/960566151866351626/unknown.png','https://cdn.discordapp.com/attachments/887737260554977311/979200777627250758/unknown.png','https://cdn.discordapp.com/attachments/887737260554977311/979200863803432980/unknown.png']

        const linkfinal = links[Math.floor(Math.random() * links.length)]
        message.channel.send(`${linkfinal}`)
    }
}