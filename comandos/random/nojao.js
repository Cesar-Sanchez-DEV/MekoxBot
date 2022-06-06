const Discord = require('discord.js');

module.exports = {
    name: "nojao",
    alias: ["asao"],

    execute (mekox, message, args){
        message.delete("nojao","asao")
        var links = ['https://cdn.discordapp.com/attachments/887737260554977311/982371083946709102/885540652639719466.png','https://cdn.discordapp.com/attachments/887737260554977311/982370289084149770/unknown.png','https://cdn.discordapp.com/attachments/887737260554977311/982370480612859954/857727511454810183.png']

        const linkfinal = links[Math.floor(Math.random() * links.length)]
        message.channel.send(`${linkfinal}`)
    }
}