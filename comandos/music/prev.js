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

        const serverQueue = mekox.distube.getQueue(message);

        if(!serverQueue) {
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setDescription(`No hay canciones reproduciendose ahora, agrega una canción con: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] })
        }else{
            message.reply(`\`Reproduciendo la cancion anteior⏪\``)
        }
        mekox.distube.previous(message);


        // const embed = new Discord.MessageEmbed()
        // .setTitle("Musica pausada⏸")
        // .setDescription(`Pausada por ${message.author}`)
        //.setDescription(`${playsong.name}${playsong.url}`)
        // .setColor("RED")
        //message.reply(`⏸\`La música se ha pausado pampu\``)
        // message.channel.send({ embeds: [embed] })
    }
}