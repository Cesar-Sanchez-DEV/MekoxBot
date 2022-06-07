const Discord = require('discord.js');
const distube = require('distube');

module.exports = {
    name: "continue",
    alias: ["continuar","resume","resumir"],

    execute (mekox, message, args){
        if(!message.member.voice?.channel){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`Tienes que estar en un \`canal de voz\` para ejecutar este comando`)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] });
        }
        
        else if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id){ 
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`Unete al mismo \`canal de voz que yo\` para ejecutar este comando`)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] });
        }

        else if(!message.guild.me.voice?.channel){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`No estoy en un \`canal de voz\` pampu, invócame con: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] });
        }
        
        const serverQueue = mekox.distube.getQueue(message);

        if(!serverQueue) {
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setDescription(`No hay canciones reproduciendose ahora, agrega una canción con: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] })
        }else{
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Music`, mekox.user.avatarURL())
            .setDescription(`⏯Reanudando la musica pampu🥵`)
            .setColor("#ccb494")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        }
        // if(!serverQueue.pause) return message.reply("La musica no está pausada.")
        mekox.distube.resume(message);

        //message.reply(`⏯\`A seguir con las rolas compañere🥵\``);
    }
}