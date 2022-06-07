const Distube = require('distube');
//const { SpotifyPlugin } = require('@distube/spotify');
//const SoundCloudPlugin = require('@distube/soundcloud');

module.exports = (mekox, Discord) => {
    mekox.distube = new Distube.default(mekox, {
        emitNewSongOnly: true,
        searchSongs: 0,
        leaveOnStop: true,
        leaveOnFinish: false,
        nsfw: false,
        leaveOnEmpty: true,
        savePreviousSongs: true,
        emitAddSongWhenCreatingQueue: false,
        // emptyCooldown: 25,
        // ytdlOptions: {
        //     highWaterMark: 1024 * 1024 * 64,
        //     quality: "highestaudio",
        //     format: "audioonly",
        //     liveBuffer: 60000,
        //     dlChunkSize: 1024 * 1024 * 4,
        // },
        // youtubeDL: false,
        // plugins: [
        //     new SpotifyPlugin({
        //         parallel: true,
        //         emitEventsAfterFetching: true,
        //     })
        //     //new SoundCloudPlugin()
        // ],
    });
    //escuchamos los eventos de DisTube

    mekox.distube.on("playSong", (queue, playsong) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setAuthor(`Mekox | Music `, mekox.user.avatarURL())
            .setTitle("Reproduciendo💽")
            .setDescription(` > [${playsong.name}](${playsong.url}) 
            **Duracion**
            \`${playsong.formattedDuration}\``)
            .setThumbnail(playsong.thumbnail)
            .setColor("#ccb494")
            .setFooter({text: `Añadida por ${playsong.user.tag}`, iconURL: playsong.user.displayAvatarURL({dynamic: true})})
            ]
        })
    })

    mekox.distube.on("addSong", (queue, playsong) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setAuthor(`Mekox | Music `, mekox.user.avatarURL())
            .setTitle("✅ Añadido a la lista:")
            .setDescription(`[${playsong.name}](${playsong.url}) 
            \`${playsong.formattedDuration}\``)
            .setThumbnail(playsong.thumbnail)
            .setColor("#ccb494")
            .setFooter({text: `Añadida por ${playsong.user.tag}`, iconURL: playsong.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            ]
        })
    });

    mekox.distube.on("finish", (queue, playsong) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setDescription("Terminó la rola pampu")
            .setColor("#ccb494")
            ]
        })
    });

    mekox.distube.on("disconnect", (queue, playsong) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setAuthor(`Mekox | Music`, mekox.user.avatarURL())
            .setDescription(`Alamos, bot desconectado. `, "> "+ `Para seguir con las canciones debes agregar una usando: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setColor("#ccb494")
            .setTimestamp()
            ]
        })
    });
    // mekox.distube.on("searchNoResult", (queue, query) => {
    //     queue.textChannel.send({
    //         embeds: [new Discord.MessageEmbed()
    //         .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
    //         .setDescription(`Url inválido ${query}`)
    //         .setColor("#ccb494")
    //         .setTimestamp()
    //         ]
    //     })
    // });
    mekox.distube.on("searchNoResult",(message, query) => {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
        .setDescription(`Url o cancion inválida  \`${query}\``)
        .setThumbnail("https://cdn.discordapp.com/attachments/887737260554977311/979805792351961088/Gatito-mekox-llorar.png")
        .setColor("#ccb494")
        .setTimestamp()

        message.channel.send({ embeds: [embed] })

    });

    mekox.distube.on("searchResult", (message, results) => {
        message.channel.send(`**Choose an option from below**${
        results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join(" ")
        }*Enter anything else or wait 60 seconds to cancel*`);
    });

    /*mekox.distube.on("initQueue", (queue) => {
        queue.autoplay = true;
    });*/
};