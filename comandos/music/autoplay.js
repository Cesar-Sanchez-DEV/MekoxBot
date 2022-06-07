// const Discord = require('discord.js');
// const distube = require('distube');

// module.exports = {
//     name: "autoplay",
//     alias: ["Autoplay"],
//     desc: "Establece la reproduccion automatica de la musica",

//     execute (mekox, message, args){
//         const serverQueue = mekox.distube.getQueue(message)

//         if(!message.member.voice.channel) {
//         const error = new Discord.MessageEmbed()
//         .setAuthor("Mekox | Error ", mekox.user.avatarURL())
//         .setDescription(`Debes estar en un canal de voz para usar esto`)
//         .setColor("#ccb494")
//         return message.channel.send({ embeds : [error] })
//         }

//         if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
//         const error = new Discord.MessageEmbed()
//         .setAuthor("Mekox | Error ", mekox.user.avatarURL())
//         .setDescription(`Unete al mismo canal de voz que yo`)
//         .setColor("#ccb494")

//         return message.channel.send({ embeds : [error] })
//         }

//         if(!serverQueue) {
//         const error = new Discord.MessageEmbed()
//         .setAuthor("Mekox | Error ", mekox.user.avatarURL())
//         .setDescription(`No hay canciones reproduciendose ahora`)
//         .setColor("#ccb494")
//         return message.channel.send({ embeds : [error] })
//         }

//         const autoplay = (args[0])

//         if(![autoplay]=="autoplay"||![autoplay]=="Autoplay"){
//         const error = new Discord.MessageEmbed()
//         .setAuthor("Mekox | Música ", mekox.user.avatarURL())
//         .setDescription(` El volumen se ha establecido al **${volume}%** correctamente`)
//         .setColor("#ccb494")
//         return message.channel.send({ embeds : [error] })
//         }
        
//         if(autoplay=="autoplay"||autoplay=="autoplay"){
//         const embed = new Discord.MessageEmbed()
//         .setAuthor("Mekox | Música ", mekox.user.avatarURL())
//         .setDescription(`La música se reproducirá automáticamente`)
//         .setColor("#ccb494")
//         return message.channel.send({ embeds : [embed] })
//         }
//         mekox.distube.toggleAutoplay(message, autoplay)
//     }
// }