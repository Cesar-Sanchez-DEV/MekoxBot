const Discord = require('discord.js');
const distube = require('distube');

module.exports = {
    name: "pause",
    alias: ["pausa","pausar"],

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
        }

        if(serverQueue.paused){
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setDescription(`La musica ya está pausada.`)
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] })
        }else{
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Music`, mekox.user.avatarURL())
            .setTitle("Musica pausada⏸")
            .setDescription(`Pausada por ${message.author}`)
            .setColor("#ccb494")
            .setTimestamp()
            message.channel.send({ embeds: [embed] })
        }
        mekox.distube.pause(message);



        
                /*const queue = mekox.distube.getQueue(message);

                if(!message.member.voice.channel) {
                    return;
                }
                
                if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
                    return;
                }

                if(!queue) {
                    return;
                }
                mekox.distube.pause(message);
                let song = args.join(" ");
                let currentSong = queue.songs[0];
                if (!song && currentSong) song = currentSong.name;
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Musica Pausada")
                        .setDescription(` > [${currentSong.name}](${currentSong.url}) 
                        **Duracion**
                        \`${currentSong.formattedDuration}\``)
                        .setThumbnail(currentSong.thumbnail)
                        .setColor("RED")
                message.channel.send({ embeds: [embed] })*/
    }
}