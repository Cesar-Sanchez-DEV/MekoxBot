const Discord = require('discord.js');

module.exports = {
   name: "jumbo", 
  alias: ["j"],

execute (mekox, message, args){
    if(!args[0]) return message.channel.send('debes decirme un emoji')

    let emoji = message.guild.emojis.cache.find(x => x.name === args[0].split(':')[1])
    if(!emoji) return message.channel.send('Ese no es un emoji valido!')
  
    const embed = new Discord.MessageEmbed()
  
    .setTitle('Emoji')
    .setImage(emoji.url)
    .setColor("#ccb494")
  
    message.channel.send({ embeds: [embed] })
 }
}