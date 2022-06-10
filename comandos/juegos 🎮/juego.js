const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
    name: "juego",
    alias: ["game","jugar"],

execute (mekox, message, args){
    /*message.reply("Hola, que juego quieres jugar? \n"+
    "Te tengo estas opciones:\n"+
    "1.Escoge un numero del 1 al 10."
    );*/
    const embed = new Discord.MessageEmbed()
    .setTitle('😎')
    .setDescription(`${message.author} Entraste al juego, escoge un número:\n`+"1.Escoge un numero del 1 al 10")
    //.setDescription("1.Escoge un numero del 1 al 10.")
    .setColor("#ccb494")
    op= args.join(" ")
    if (op=="1"){
      message.channel.send("Eres una zorra")
    }
  
    message.channel.send({ embeds: [embed] })
 }
}