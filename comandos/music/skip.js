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
        if(!queue.songs[1]){
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`Error al skipear la cancion, no quedan más canciones, agrega una canción con \`\`\`js\nm-e <songName>\n\`\`\``)
        .setThumbnail("https://cdn.discordapp.com/attachments/887737260554977311/983576007640494120/unknown.png")
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] });
        }else{
            message.reply(`\`Saltando a la siguiente canción⏭\``)
        }
        mekox.distube.skip(message);
    }
}