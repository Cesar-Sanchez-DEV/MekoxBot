const Discord = require('discord.js');

module.exports = {
    name: "ping",
    alias: [""],

    execute (mekox, message, args){
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Mekox | Ping `, mekox.user.avatarURL())
        .setThumbnail("https://images-ext-1.discordapp.net/external/qZwfTW5TZ0wih24zg9LLf2eSa5klfnGyYYbM9ZSrPEM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/957720942639972383/a98dbc322d6da17e3a2a7f8a3a813330.webp?width=683&height=683")
        .addField("Ping", `${mekox.ws.ping}` + "ms <:ping:901864024529076234> ")
        .addField("Latencia", `${Date.now() - message.createdTimestamp}` + "ms <:ping:901864024529076234> ")
        .setFooter(`${message.author.tag}`)
        .setTimestamp()
        .setColor("#ccb494")
        message.reply({ embeds: [embed] })
        // const embed = Discord.MessageEmbed()
        // .setTitle(`Ping de \`Mekox\``)
        // .setDescription(`\`${ping}ms\``)
        // .setTimestamp()
        // message.channel.send({ embeds:[embed] })
        // message.reply(`El ping del bot es: \`${mekox.ws.ping}ms\``)
    }
}