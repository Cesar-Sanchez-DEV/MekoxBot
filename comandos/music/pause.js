const Discord = require('discord.js');
const distube = require('distube');

module.exports = {
    name: "pause",
    alias: ["pausa","pausar"],

    execute (mekox, message, args,playsong){
        if(!message.member.voice?.channel) return message.reply(`❌ \`Tienes que estar en un canal de voz para ejecutar este comando!\``);
        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ \`Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!\``);

        const serverQueue = mekox.distube.getQueue(message);

        if(!serverQueue) return message.reply("No hay canciones reproduciendose ahora pampu.");
        if(serverQueue.paused) return message.reply("La musica ya está pausada.")
        mekox.distube.pause(message);

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Mekox | Music`, mekox.user.avatarURL())
        .setTitle("Musica pausada⏸")
        .setDescription(`Pausada por ${message.author}`)
        .setColor("#ccb494")
        .setTimestamp()
        message.channel.send({ embeds: [embed] })


        
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