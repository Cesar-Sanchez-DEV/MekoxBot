const Discord = require('discord.js');

module.exports = {
   name: "avatar", 
  alias: ["av"],

async execute (mekox, message, args){
    let usuario = message.mentions.users.first() || mekox.users.cache.get(args[0]) || 
    mekox.users.cache.find(e => (e.username === args.slice(0).join(" ") || (e.tag === args.slice(0).join(" ")))) ||  
    (message.guild ? (message.guild.members.cache.find(e => (e.nickname === args.slice(0).join(" ")))) : undefined) ||  
    (args[0] ? await mekox.users.fetch(args[0]).catch(() => {}) : undefined) || message.author;
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Mekox | Avatar`, mekox.user.avatarURL())
    .setDescription(`${usuario.username} ****[|](https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley)**** Avatar`)
   //  .setTitle(`Avatar de: ${usuario.username}`)
    .setImage(usuario.displayAvatarURL({ dynamic:true, size: 1024}))
    .setColor("#ccb494")
    .setTimestamp();
    message.channel.send({ embeds: [embed] })
 }
}