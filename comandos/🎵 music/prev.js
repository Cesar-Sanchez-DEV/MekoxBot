const Discord = require('discord.js');
const distube = require('distube');

module.exports = {
    name: "prev",
    alias: ["anterior","previous"],

    execute (mekox, message, args,playsong){
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
        
        const serverQueue = mekox.distube.getQueue(message);

        if(!serverQueue) {
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setDescription(`No hay canciones reproduciendose ahora, agrega una canción con: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }
        if(serverQueue.previousSongs?.length===0){
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setDescription(`Error al retroceder de canción, no exiten canciones previas.`)
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000));
            }else{
                message.reply(`\`Reproduciendo la cancion anteior⏪\``).then(y => setTimeout(() => y.delete(), 10000))
            }
        mekox.distube.previous(message);
    }
}