const Discord = require('discord.js');

module.exports = {
   name: "mine", 
  alias: ["main","minecraft"],

execute (mekox, message, args){
    const texto = args.join(" ")
    const texto_logro = texto.replace(/( )/g,'+');
    const imagen = Math.floor(Math.random() * 38) + 1;
    if(!texto){
      message.channel.send("Debes ingresar un texto.")
   }else{
      const embed = new Discord.MessageEmbed()
      .setImage(`https://minecraftskinstealer.com/achievement/${imagen}/%C2%A1Logro+obtenido%21/${texto_logro}`)
      .setColor("#ccb494");
      message.channel.send({ embeds: [embed]})
   }
 }
}