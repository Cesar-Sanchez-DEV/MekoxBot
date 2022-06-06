const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
    name: "join",
    alias: ["ingresar"],

    execute (mekox, message, args){
    if(!message.member.voice.channel){
        return;
    }   
    const clientVoice = message.guild.me.voice.channel;
    const memberVoice = message.member.voice.channel;
      
    if (clientVoice) {
        if (clientVoice !== memberVoice) {
            return;
        }else{
            return;
        }
    }else{
        if (memberVoice) {
          message.client.distube.voices.join(memberVoice)
            let thing = new Discord.MessageEmbed()
            .setDescription(`Me uní al canal de voz`)
            .setColor("#ccb494")
            return message.channel.send({ embeds: [thing] });
        }
        if(!message.member.voice?.channel){
            let thing = new Discord.MessageEmbed()
            .setDescription(`Debes estar en un canal de voz`)
            .setColor("#ccb494")
            return message.channel.send({ embeds: [thing] });
        }
    }
        // const cancion = args.join(" ");
        // mekox.distube.play(message.member.voice?.channel, cancion, {
        //     member: message.member,
        //     textChannel: message.channel,
        //     message
        // });
      //   const embed = new Discord.MessageEmbed()
      // .setTitle("Lo siento, este comando está en mantenimiento, vuelva pronto")
      // .setImage("https://cdn.discordapp.com/emojis/881905666447523850.webp?size=80&quality=lossless")
      // .setColor("#ccb494");
      // message.channel.send({ embeds: [embed]})
    }
}