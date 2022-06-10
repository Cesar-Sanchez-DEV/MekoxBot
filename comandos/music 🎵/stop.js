const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
    name: "stop",
    alias: ["parar"],
    execute(mekox, message, args) {
        //comprobaciones previas
        const queue = mekox.distube.getQueue(message);
        if(!queue) {
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setDescription(`No hay canciones reproduciendose ahora, agrega una canción con: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] })
        }
        
        if(!message.member.voice?.channel){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`Tienes que estar en un \`canal de voz\` para ejecutar este comando`)
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
        
        else if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id){ 
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`Unete al mismo \`canal de voz que yo\` para ejecutar este comando`)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] });
        }
        mekox.distube.stop(message);
        
    }
}