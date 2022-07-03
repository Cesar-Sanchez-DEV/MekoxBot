const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
   name: "triste", 
  alias: ["pipipi","sad"],

execute (mekox, message, args){
   var links = ['https://cdn.discordapp.com/attachments/887737260554977311/960047047443095623/unknown.png','https://cdn.discordapp.com/attachments/887737260554977311/958451387929346088/unknown.png']

   const linkfinal = links[Math.floor(Math.random() * links.length)]
   message.channel.send(`${linkfinal}`)
   message.delete("triste","pipipi")
 }
}