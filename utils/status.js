module.exports = (bot) => {

    bot.status({
      text: "sus mentiras :'(", 
      type: "LISTENING", //PLAYING, WATCHING, LISTENING
      time: 2
    })
  
    bot.status({
      text: " en $serverCount Servidores..!", 
      type: "WATCHING",
      time: 2
    })
  
  }