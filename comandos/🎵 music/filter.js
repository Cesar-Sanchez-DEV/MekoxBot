const Discord = require('discord.js');
const distube = require('distube');
const filter = [
    "3d",
    "lowbass",
    "bassboost",
    "echo",
    "flanger",
    "gate",
    "haas",
    "karaoke",
    "nightcore",
    "reverse",
    "vaporwave",
    "mcompand",
    "phaser",
    "tremolo",
    "surround",
    "earwax"
]
module.exports = {
    name: "filter",
    alias: ["set-filter"],
    desc: "Establece filtros para tus canciones c:",

    execute (mekox, message, args, prefix){
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
        if(!args[0]) {
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setTitle(`Filtro no definido`)
            .setDescription(`Usa \`${prefix}filter <nameFilter>\`| Tengo estos filtros:\n> - \`${filter.join("`\n> - `")}\``.substring(0, 2048))
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 40000))
        }
        if(!filter.join(" ").toLowerCase().split(" ").includes(args[0].toLowerCase())) {
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setTitle(`Filtro no definido`)
            .setDescription(`Usa \`${prefix}filter <nameFilter>\`| Tengo estos filtros:\n> - \`${filter.join("`\n> - `")}\``.substring(0, 2048))
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 40000))
        }
        if(args[0]==serverQueue.filters){
            const embed = new Discord.MessageEmbed()
            .setAuthor("Mekox | Music ", mekox.user.avatarURL())
            .setDescription(`Se eliminó el filtro \`${args[0]}\``)
            .setColor("#ccb494")
            mekox.distube.setFilter(message, args[0]);    
            return message.channel.send({ embeds : [embed] }).then(y => setTimeout(() => y.delete(), 10000))
            
        }
        mekox.distube.setFilter(message, args[0]);
        const embed = new Discord.MessageEmbed()
        .setAuthor("Mekox | Music ", mekox.user.avatarURL())
        .setDescription(`Se agregó el filtro \`${args[0]}\``)
        .setColor("#ccb494")
        message.channel.send({ embeds : [embed] }).then(y => setTimeout(() => y.delete(), 10000))
    }
}