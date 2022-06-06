const Discord = require('discord.js');
const { parse } = require("twemoji-parser")

module.exports = {
  name: "jumbo",
  alias: ["j"],

  execute(mekox, message, args){

  let emoji = args[0];
  if(!emoji) {
   const aemoji = new Discord.MessageEmbed()
   .setTitle("Debes colocar un emoji!")
   .setDescription(`Hey <${message.author}> Lee lo qué te dije!`)
   .setColor("#ccb494")
   return message.reply({embeds: [aemoji]})
  }

  let custom = Discord.Util.parseEmoji(emoji);

  if(custom.id) {
    return message.channel.send(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? 'gif' : 'png' }`)
  }
  else {
    let parsed = parse(emoji, { assetType: 'png' })
    const noemojiembed = new Discord.MessageEmbed()
    
    .setTitle("Emoji invalido!")
    .setDescription("Debes ingresar un emoji personalizado!")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor("RED")

    message.lineReply({embeds: [noemojiembed]})
  }

 }

} 