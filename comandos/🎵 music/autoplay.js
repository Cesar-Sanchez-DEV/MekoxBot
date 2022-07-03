const Discord = require('discord.js');
const distube = require('distube');

module.exports = {
    name: "autoplay",
    alias: ["Autoplay"],
    desc: "Establece la reproduccion automatica de la musica",

    execute (mekox, message, args){
        const serverQueue = mekox.distube.getQueue(message)

        if(!message.member.voice.channel) {
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`Debes estar en un canal de voz para usar esto`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }

        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`Unete al mismo canal de voz que yo`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        
        else if(!message.guild.me.voice?.channel){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`No estoy en un \`canal de voz\` pampu, invócame con: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] }).then(y => setTimeout(() => y.delete(), 10000));
        }

        if(!serverQueue) {
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`No hay canciones reproduciendose ahora`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        
        if(serverQueue.autoplay){
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Music ", mekox.user.avatarURL())
            .setDescription(`La reproduccion automática de la musica está \`Desactivado\`.`)
            .setColor("#ccb494")
            message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
            return mekox.distube.toggleAutoplay(message)
        }else{
            const embed = new Discord.MessageEmbed()
            .setAuthor("Mekox | Música ", mekox.user.avatarURL())
            .setDescription(`La reproduccion automática de la musica está \`Activado\`.`)
            .setColor("#ccb494")
            message.channel.send({ embeds : [embed] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        mekox.distube.toggleAutoplay(message)
    }
}