const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
   name: "dance", 
  alias: ["baile","bailar"],

  //"https://tenor.com/view/dog-toy-twerk-gif-11120890"
  //"https://cdn.discordapp.com/emojis/894976138584158249.gif?size=80&quality=lossless"

execute (mekox, message, args){
   var links = ['https://tenor.com/view/dog-toy-twerk-gif-11120890','https://cdn.discordapp.com/emojis/894976138584158249.gif?size=80&quality=lossless']

   const linkfinal = links[Math.floor(Math.random() * links.length)]
 
   message.channel.send(`${linkfinal}`)
   message.delete("dance","baile","bailar")
   /*const embed = new Discord.MessageEmbed()
   .setTitle('😎')
   .setDescription(`**${message.author}** esta bailando`)
   .setImage(linkfinal)
   .setColor('RANDOM')
   message.channel.send({ embeds: [embed] })*/
 }
}

/*const  generateRandomString = (num) => {
   const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let result1= ' ';
   const charactersLength = characters.length;
   for ( let i = 0; i < num; i++ ) {
       result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result1;
}

const displayRandomString = () =>{
  let randomStringContainer = document.getElementById('random_string'); 
   randomStringContainer.innerHTML =  generateRandomString(8);    
}

console.log(generateRandomString(5));*/