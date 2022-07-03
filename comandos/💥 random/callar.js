const Discord = require('discord.js');

module.exports = {
    name: "callar",
    alias: ["calla"],

    execute (mekox, message, args){
        message.delete("callar","calla")
        message.channel.send("https://cdn.discordapp.com/attachments/834634327597645826/961268014697820201/unknown.png")
    }
}