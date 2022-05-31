const Discord = require('discord.js');
const distube = require('distube');

module.exports = {
    name: "prev",
    alias: ["anterior","previous"],

    execute (mekox, message, args,playsong){
        if(!message.member.voice?.channel) return message.reply(`❌ \`Tienes que estar en un canal de voz para ejecutar este comando!\``);
        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ \`Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!\``);

        const serverQueue = mekox.distube.getQueue(message);

        if(!serverQueue) return message.reply("No hay canciones reproduciendose ahora pampu.");
        mekox.distube.previous(message);

        message.reply(`\`Reproduciendo la cancion anteior⏪\``)

        // const embed = new Discord.MessageEmbed()
        // .setTitle("Musica pausada⏸")
        // .setDescription(`Pausada por ${message.author}`)
        //.setDescription(`${playsong.name}${playsong.url}`)
        // .setColor("RED")
        //message.reply(`⏸\`La música se ha pausado pampu\``)
        // message.channel.send({ embeds: [embed] })
    }
}