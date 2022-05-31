const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
    name: "skip",
    alias: ["s"],
    desc: "Sirve para saltar una canción",
    execute(mekox, message, args){
        //comprobaciones previas
        const queue = mekox.distube.getQueue(message);
        if(!queue) return message.reply(`❌ \`No hay ninguna canción reproduciéndose!\``);
        if(!message.member.voice?.channel) return message.reply(`❌ \`Tienes que estar en un canal de voz para ejecutar este comando!\``);
        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ \`Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!\``);
        mekox.distube.skip(message);
        message.reply(`\`Saltando a la siguiente canción⏭\``)
    }
}