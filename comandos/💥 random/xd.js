const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
   name: "xd", 
  alias: ["XD"],

execute (mekox, message, args){
   var links = ['https://cdn.discordapp.com/attachments/834634327597645826/961269952713748500/unknown.png','https://cdn.discordapp.com/attachments/887737260554977311/960560389286948904/unknown.png']

   const linkfinal = links[Math.floor(Math.random() * links.length)]
   message.channel.send(`${linkfinal}`)
   message.delete("xd","XD")
 }
}