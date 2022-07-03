const Discord = require('discord.js');

module.exports = {
    name: "khe",
    alias: [""],

    execute (mekox, message, args){
        message.delete("khe");
        message.channel.send("https://cdn.discordapp.com/attachments/887737260554977311/960566291280846888/unknown.png");
    }
}