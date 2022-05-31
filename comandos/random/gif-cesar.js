const Discord = require('discord.js');

module.exports = {
    name: "gif",
    alias: [""],

    execute (mekox, message, args){
        message.delete("gif")
        message.channel.send("https://media.discordapp.net/attachments/887737260554977311/958377454257463326/makesweet-lw03nm.gif")
    }
}