const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
    name: "saler",
    alias: ["salir"],

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
            if (!memberVoice) {
              message.client.distube.voices.leave(memberVoice)
                let thing = new Discord.MessageEmbed()
                .setDescription(`Me Salí del canal de voz`)
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
    }
}