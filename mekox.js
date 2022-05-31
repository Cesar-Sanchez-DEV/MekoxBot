const Discord = require("discord.js");
const mekox = new Discord.Client({ intents: 32767 });
const fs = require('fs');
let { readdirSync } = require('fs');
require('colors')

let nick = "mekoxBot"

console.log(`╔═════════════════════════════════════════════════════╗`.red)
console.log(`║ `.red + `            Conectando como ${nick}`.red + " ".repeat(`Conectando como `.length) + "║".red)
console.log(`╚═════════════════════════════════════════════════════╝`.red)

process.on("unhandledRejection", async (rej) => {
  console.error(rej)
})

mekox.commands = new Discord.Collection()
let carpetas = fs.readdirSync('./comandos/').map((subCarpetas) => {
  const archivos = fs.readdirSync(`./comandos/${subCarpetas}`).map((comandos) => {
    let comando = require(`./comandos/${subCarpetas}/${comandos}`)
    mekox.commands.set(comando.name, comando)
  })
})

function requerirhandlers() {
  ["distube"].forEach(handler => {
      try {
          require(`./handlers/${handler}`)(mekox, Discord)
      } catch (e) {
          console.warn(e)
      }
  })
}

requerirhandlers();

mekox.on("ready", () => {
    console.log("Hola idiota ya estoy funcionando xd");
    const time = (1000*5)

    let status = [
      [{
        name: `Con tus sentimientos espera khe?`,
        type: 'PLAYING'
      }],
      [{
        name: `unos cuantos servidores jijiji`,
        type: 'WATCHING'
      }],
      [{
        name: `Musica p`,
        type:'LISTENING'
      }]
    ]
    setInterval(() => {
      function randomStatus() {
        let rstatus = status[Math.floor(Math.random() * status.length)];
        mekox.user.setPresence({ activities: rstatus, status: 'online'})
      }
      randomStatus();
    }, time)
 });

mekox.on("messageCreate", (message)=> {
  if(message.author.bot)return;
  if(message.content.startsWith("uwu")){
    //message.reply("https://cdn.discordapp.com/emojis/895331993431179305.webp?size=80&quality=lossless");
    message.channel.send("https://media.discordapp.net/attachments/834634362300661760/966008892888842310/unknown.png?width=196&height=152");
  }
  if(message.content.includes("quepro")){
     //message.reply("https://cdn.discordapp.com/emojis/889365393712488489.webp?size=80&quality=lossless");
     //message.reply("https://cdn.discordapp.com/emojis/889365433017335808.webp?size=80&quality=lossless");
     message.channel.send("https://cdn.discordapp.com/attachments/906313204022513734/909918706912600064/unknown.png");
  }
  
  if(message.content.startsWith("tst")){
    message.reply("Hola, estoy funcionando :D")
  }

  let prefix = "m-"
  if(!message.content.startsWith(prefix)) return;
    
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let cmd = mekox.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  comandos = cmd;
  /*if(message.content.includes(prefix+"love")){
    message.reply("https://cdn.discordapp.com/attachments/834634327597645826/958765249375387768/lv_0_20220303125155.mp4");
  }*/
  if (cmd) {
    try {
      cmd.execute(mekox, message, args)
    } catch (e) {
      return;
    }
  }
  // #ccb494 
  if(!cmd){
    if(message.content === prefix) return;
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
    .setTitle('❌`|`Comando no encontrado')
    .setDescription(`El comando \`${command}\` no está definido, consulta con @Rasec_moreno#1316 si quieres agregar un comando :)`)
    .setThumbnail("https://cdn.discordapp.com/attachments/887737260554977311/979805792351961088/Gatito-mekox-llorar.png")
    .setTimestamp()
    .setColor("#ccb494")
    message.reply({ embeds:[embed] })
  }
});

mekox.login("OTU3NzIwOTQyNjM5OTcyMzgz.YkC5Ig.yv4bpJpVmSd9qGOPwjtsasNo_Lg");