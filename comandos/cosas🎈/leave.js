const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
    name: "saler",
    alias: ["salir"],

    execute (mekox, message, args){
        Discord.ThreadChannel.leave()
    }
}