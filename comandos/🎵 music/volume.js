const Discord = require('discord.js');
const distube = require('distube');

module.exports = {
    name: "volume",
    alias: ["volumen","v","vol"],
    desc: "Establece el volumen de la musica",

    execute (mekox, message, args){
        const serverQueue = mekox.distube.getQueue(message)
        var links = ['https://media.giphy.com/media/l0NgQgSHKlhCyQYDu/giphy.gif','https://media.giphy.com/media/dVus71KYMNmJnq6jWz/giphy.gif','https://media.giphy.com/media/PqQIVXwPWkcMg/giphy.gif','https://media.giphy.com/media/mINpPleXaAqgSw54lA/giphy.gif']
        const linkfinal = links[Math.floor(Math.random() * links.length)]

        if(!message.member.voice?.channel){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`Tienes que estar en un \`canal de voz\` para ejecutar este comando`)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] }).then(y => setTimeout(() => y.delete(), 10000));
        }
        
        else if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id){ 
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`Unete al mismo \`canal de voz que yo\` para ejecutar este comando`)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] }).then(y => setTimeout(() => y.delete(), 10000));
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
        .setDescription(`No hay canciones reproduciendose ahora, agrega una canción con: \`\`\`js\nm-p <songName>\n\`\`\``)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }

        const volume = (args[0])
        if(!volume) {
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`Debes definir el volúmen`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        if(volume=="max"){
            let volumen = 100;
            mekox.distube.setVolume(message, parseInt(volumen))
    
            const embed = new Discord.MessageEmbed()
            .setAuthor("Mekox | Música ", mekox.user.avatarURL())
            .setDescription(` El volumen se ha establecido al máximo`)
            .setThumbnail(`${linkfinal}`)
            .setColor("#ccb494")
    
            return message.channel.send({ embeds: [embed] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        if(volume=="min"){
            let volumen = 1;
            mekox.distube.setVolume(message, parseInt(volumen))
    
            const embed = new Discord.MessageEmbed()
            .setAuthor("Mekox | Música ", mekox.user.avatarURL())
            .setDescription(` El volumen se ha establecido al mínimo`)
            .setThumbnail(`${linkfinal}`)
            .setColor("#ccb494")
    
            return message.channel.send({ embeds: [embed] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        if(volume=="default"||volume=="medium"||volume=="medio"){
            let volumen = 50;
            mekox.distube.setVolume(message, parseInt(volumen))
    
            const embed = new Discord.MessageEmbed()
            .setAuthor("Mekox | Música ", mekox.user.avatarURL())
            .setDescription(` El volumen se estableció al predeterminado`)
            .setThumbnail(`${linkfinal}`)
            .setColor("#ccb494")
    
            return message.channel.send({ embeds: [embed] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        // if(volume==volume||volume=="max"||volume=="min"||volume=="default"||volume=="medium"||volume=="medio"){
        //     const error = new Discord.MessageEmbed()
        //     .setAuthor("Mekox | Música ", mekox.user.avatarURL())
        //     .setDescription(`El volumen ya es ${volume}%, debes definir otro número`)
        //     .setColor("#ccb494")
        //     return message.channel.send({ embeds : [error] })
        // }
        if(serverQueue.volume==parseInt(args[0])||serverQueue.volume=="max"||serverQueue.volume=="medium"||serverQueue.volume=="default"||serverQueue.volume=="medio"||serverQueue.volume=="min"){
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setDescription(`El volumen ya está establecído al \`${serverQueue.volume? `${parseInt(args[0])}`:`${volume}`}%\``)
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        if(isNaN(volume)) {
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`Dime el volumen en numeros`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }

        if(volume.includes(".")) {
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`❌\`|\` No puedes usar decimales`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }

        if(volume < 1) {
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`Dime el volumen que sea mayor que 0`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        if(volume > 100) {
        const error = new Discord.MessageEmbed()
        .setAuthor("Mekox | Error ", mekox.user.avatarURL())
        .setDescription(`Dime el volumen que sea menor que 100`)
        .setColor("#ccb494")
        return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        mekox.distube.setVolume(message, parseInt(volume))


        const embed = new Discord.MessageEmbed()
        .setAuthor("Mekox | Música ", mekox.user.avatarURL())
        .setDescription(` El volumen se ha establecido al **${volume}%** correctamente`)
        .setThumbnail(`${linkfinal}`)
        .setColor("#ccb494")

        message.channel.send({ embeds: [embed] }).then(y => setTimeout(() => y.delete(), 10000))

    }
}