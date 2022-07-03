const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
    name: "nowplaying",
    alias: ["np","now","nowplay"],
    desc: "Sirve para ver la canción actual",
    execute (mekox, message, args, playsong){
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

        const serverQueue = mekox.distube.getQueue(message);

        if(!serverQueue) {
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setDescription(`No hay canciones reproduciendose ahora, agrega una canción con: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] }).then(y => setTimeout(() => y.delete(), 10000))
        }

        let song = args.join(" ");
        let currentSong = serverQueue.songs[0];
        if (!song && currentSong) song = currentSong.name;
            let embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Music `, mekox.user.avatarURL())
            .setTitle(`Reproduciendo`+"<a:DiscordCD:926985065030885457>")
            .setDescription(` > [${currentSong.name}](${currentSong.url})`)
            .setThumbnail(currentSong.thumbnail)
            .setColor("#ccb494")
            .setFooter({text: `Añadida por ${currentSong.user.tag}`, iconURL: currentSong.user.displayAvatarURL({dynamic: true})})
            
            if(serverQueue.autoplay){
                embed.addField("Duración",`> \`${currentSong.formattedDuration}\`
                \n**Volúmen**\n> \`${serverQueue.volume}\``,true)
                .addField("Autoplay",`\` Activado \`
                \n**Filtro**\n\` ${serverQueue.filters.join(", ") || `Sin filtros`} \``,true)
                // .addFields(
                //     {name: 'Volúmen', value: `> \`${serverQueue.volume}\``, inline: false},
                //     {name: 'Filtro', value: `\`${serverQueue.filters.join(", ") || `Sin filtros`}\``, inline: true}
                // )
            }else{
                embed.addField("Duración",`> \`${currentSong.formattedDuration}\`
                **Volúmen**\n> \`${serverQueue.volume}\``,true)
                .addField("Autoplay",`\` Desactivado \`
                **Filtro**\n\` ${serverQueue.filters.join(", ") || `Sin filtros`} \``,true)
                // .addField(`Filtro:`, `\`${serverQueue.filters.join(", ") || ` Sin filtros `}\``, false)
                // .addFields(
                //     {name: 'Volúmen', value: `> \`${serverQueue.volume}\``, inline: false},
                //     {name: 'Filtro', value: `\`${serverQueue.filters.join(", ") || `Sin filtros`}\``, inline: true}
                // )
            }
        message.channel.send({ embeds: [embed] }).then(y => setTimeout(() => y.delete(), 30000));
        
    }
}