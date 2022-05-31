const Discord = require('discord.js');
const distube = require('distube');

module.exports = {
    name: "continue",
    alias: ["continuar","resume","resumir"],

    execute (mekox, message, args){
        if(!message.member.voice?.channel) return message.reply(`❌ \`Tienes que estar en un canal de voz para ejecutar este comando!\``);
        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ \`Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!\``);

        const serverQueue = mekox.distube.getQueue(message);

        if(!serverQueue) return message.reply("No hay canciones reproduciendose ahora pampu.");
        if(!serverQueue.pause) return message.reply("La musica no está pausada.")
        mekox.distube.resume(message);

        //message.reply(`⏯\`A seguir con las rolas compañere🥵\``);

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Mekox | Music`, mekox.user.avatarURL())
        .setDescription(`⏯Reanudando la musica pampu🥵`)
        .setColor("#ccb494")
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }
}