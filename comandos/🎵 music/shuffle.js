const Discord = require('discord.js');
const distube = require('distube');

module.exports = {
    name: "shuffle",
    alias: ["aleatorio","fiesta"],
    desc: "Establece la reproduccion automatica de la musica",

    execute (mekox, message, args){
        const serverQueue = mekox.distube.getQueue(message)

        if(!message.member.voice.channel) {
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`Debes estar en un canal de voz para usar esto`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] })
        }

        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`Unete al mismo canal de voz que yo`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] })
        }

        else if(!message.guild.me.voice?.channel){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`No estoy en un \`canal de voz\` pampu, invócame con: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] });
        }

        if(!serverQueue) {
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`No hay canciones reproduciendose ahora`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] })
        }

        // const autoplay = (args[0])

        // if(autoplay=="autoplay"){
        // const embed = new Discord.MessageEmbed()
        // .setAuthor("Mekox | Música ", mekox.user.avatarURL())
        // .setDescription(`La música se reproducirá automáticamente`)
        // .setColor("#ccb494")
        // message.channel.send({ embeds : [embed] })
        // }
        // if(serverQueue.autoplay){
        //     const error = new Discord.MessageEmbed()
        //     .setAuthor("Mekox | Music ", mekox.user.avatarURL())
        //     .setDescription(`La reproducción ya no será aleatoriamente.`)
        //     .setColor("#ccb494")
        //     message.channel.send({ embeds : [error] })
        //     return;
        // }else{}
        const embed = new Discord.MessageEmbed()
        .setAuthor("Mekox | Música ", mekox.user.avatarURL())
        .setDescription(`La música ahora se reproduce aleatoriamente.`)
        .setColor("#ccb494")
        message.channel.send({ embeds : [embed] })
        mekox.distube.shuffle(message)
    }
}