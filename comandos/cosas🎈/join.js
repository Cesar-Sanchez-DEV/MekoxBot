const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
    name: "join",
    alias: ["ingresar"],

    execute (mekox, message, args){
        // const cancion = args.join(" ");
        // mekox.distube.play(message.member.voice?.channel, cancion, {
        //     member: message.member,
        //     textChannel: message.channel,
        //     message
        // });
        const embed = new Discord.MessageEmbed()
      .setTitle("Lo siento, este comando está en mantenimiento, vuelva pronto")
      .setImage("https://cdn.discordapp.com/emojis/881905666447523850.webp?size=80&quality=lossless")
      .setColor("#ccb494");
      message.channel.send({ embeds: [embed]})
    }
}