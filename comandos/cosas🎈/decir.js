const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
   name: "say", 
  alias: ["decir"],

execute (mekox, message, args){
    let texto = args.join(" ");
    if(!texto) return message.channel.send("Define un texto.")
    message.delete(texto)
    message.channel.send({ content:texto})
 }
}