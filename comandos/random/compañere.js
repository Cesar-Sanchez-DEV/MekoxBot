const Discord = require('discord.js');

module.exports = {
    name: "mitzy",
    alias: ["mecse"],

    execute (mekox, message, args){
        message.delete("mitzy","mecse")
        message.channel.send("https://cdn.discordapp.com/emojis/839355078443925524.webp?size=80&quality=lossless")
    }
}