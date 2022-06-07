const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
    name: "play",
    alias: ["p"],
    desc: "Sirve para reproducir una canción",
    owner: true,
    execute (mekox, message, args){
        //comprobaciones previas
        const cancion = args.join(" ");

        // const regex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi.test(message.content)

        // const embed = new Discord.MessageEmbed()
        // .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
        // .setDescription(`Url o cancion inválida \`${cancion}\``)
        // .setThumbnail("https://cdn.discordapp.com/attachments/887737260554977311/979805792351961088/Gatito-mekox-llorar.png")
        // .setColor("#ccb494")
        // .setTimestamp()

        // if(regex) return message.reply({ embeds: [embed] })

        if(!cancion){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`\`Tienes que especificar el nombre de una canción!❌ \` \`\`\`js\n m-e <songName> \n\`\`\``)
            .setThumbnail("https://cdn.discordapp.com/attachments/887737260554977311/979805792351961088/Gatito-mekox-llorar.png")
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] })
        }
        if(!message.member.voice?.channel){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`\`Tienes que estar en un canal de voz para ejecutar este comando!❌\``)
            .setThumbnail("https://cdn.discordapp.com/attachments/887737260554977311/979805792351961088/Gatito-mekox-llorar.png")
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] });
        }
        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id){ 
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`\`Tienes que estar en el mismo canal de voz que yo para ejecutar este comando!❌\``)
            .setThumbnail("https://cdn.discordapp.com/attachments/887737260554977311/979805792351961088/Gatito-mekox-llorar.png")
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] });
        }
        mekox.distube.play(message.member.voice?.channel, cancion, {
            member: message.member,
            textChannel: message.channel,
            message
        });
        // message.reply(`🔎 Buscando \`${cancion}\``);
        
    }
}