const { Message, Client, MessageActionRow, MessageButton } = require("discord.js");
const randomExt = require("random-ext");
const Discord = require('discord.js')
const { inspect } = require("util");
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
  name: "evaluar",
  alias: ["eval","e"],

async execute (mekox, message, args){
    // ID:giorgio = 857610509632012368;
    // if(["857610509632012368"].includes(message.author.id)){
    //   const embed = new MessageEmbed()
    //   .setTitle("Lo siento, tu estas estás en la lista negra, safa safa nomas")
    //   .setColor("RED")
    //   return message.channel.send({ embeds: [embed] })
    // }
    if (!["750847741483286549","751983555890118789"].includes(message.author.id)){
    const embed = new MessageEmbed()
    .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
    .setTitle("WTF y este random?, no tienes permiso para usar este comando pampu. `|` :pouting_cat:")
    .setThumbnail("https://cdn.discordapp.com/attachments/887737260554977311/983576351447580712/unknown.png")
    .setColor("#ccb494")
    .setTimestamp()
    return message.channel.send({ embeds: [embed] })
}
    if(["957720942639972383"].includes(message.author.id)){
      const embed = new MessageEmbed()
      .setTitle("WTF eres un bot wn ;-;")
      .setColor("#ccb494")
      return message.reply({ embeds: [embed] })
    }
    let cosa = args.join(" ");

    if (!cosa){
    const embedErrorCod = new Discord.MessageEmbed()
    .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
    .setDescription(`Debes ingresar un código a evaluar.`)
    .setColor("#ccb494")
    message.reply({ embeds:[embedErrorCod] })
    return;
    }

    if(args.join(" ").startsWith("-exec")){
      let run = args.slice(1).join(" ");

      if(!run) return message.channel.send(`Escribe un código a ejecutar en la terminal.`)

      require("child_process").exec(run, (error, stdout, stderr) => {
        if(error) return message.channel.send(`\`\`\`js\n${error}\n\`\`\``)

        if(stderr) return message.channel.send(`\`\`\`js\n${stderr}\n\`\`\``)

        message.channel.send(
          `\`\`\`js\n${stdout}\n\`\`\``
        );
      })

      return;
    }

    if(["mekox.token", "process.exit","config.token","mekox.destroy()","process.env"].includes(cosa)) return message.channel.send(`Eso esta prohibido hp`)
    if(args.join(" ").includes("mekox.token")) return message.channel.send(`wtf?, eso no puedes usar`)
    if(args.join(" ").includes("process.exit")) return message.channel.send(`wtf?, eso no puedes usar`)
    if(args.join(" ").includes("config.token")) return message.channel.send(`wtf?, eso no puedes usar`)
    if(args.join(" ").includes("mekox.destroy()")) return message.channel.send(`wtf?, eso no puedes usar`)
    if(args.join(" ").includes("process.env")) return message.channel.send(`wtf?, eso no puedes usar`)

    const start = Date.now();

    message.channel.sendTyping();

    try {
      let id = randomExt.string(5,5)
      let row = new MessageActionRow()
        .setComponents(
          new MessageButton()
            .setEmoji(`❌`)
            .setStyle("SECONDARY")
            .setCustomId(id)
      )

      let code;

      code = await eval(cosa);
      code = inspect(code, { depth: 0 });
      const type = typeof code;
      
      const msgEmbed = new MessageEmbed()
      .setAuthor(`Mekox | Eval`, mekox.user.avatarURL())
      .setTitle(`Tipo ${type}`)
      .setDescription(`\`\`\`js\n${code}\n\`\`\``)
      .setThumbnail("https://cdn.discordapp.com/attachments/887737260554977311/983576007640494120/unknown.png")
      .setColor("#ccb494")

      const msg = await message.channel.send({
        // content: `Tipo ${type} \n\n\`\`\`js\n${code}\n\`\`\``,
        components: [row],
        embeds:[msgEmbed]
      });
      const collector = msg.createMessageComponentCollector({ componentType: "BUTTON"});

      collector.on("collect", async (i) => {
        if(!i.user.equals(message.author)) return i.deferUpdate();

        if(i.customId == id){
          await i.deferUpdate();

          await msg.delete()
        }
      })
    } catch (e) {
       let a = new MessageActionRow()
        .setComponents(
          new MessageButton()
            .setEmoji(`❌`) 
            .setStyle("SECONDARY")
            .setCustomId("1")
      )
      const peo = await message.channel.send({ content:`\`\`\`js\n${e}\n\`\`\``, components: [a] });
      const collector = peo.createMessageComponentCollector({ componentType: "BUTTON"});

      collector.on("collect", async (i) => {
        if(!i.user.equals(message.author)) return i.deferUpdate();

        if(i.customId == "1"){
          await i.deferUpdate();

          await peo.delete()
        }
    })
    }
  }
}