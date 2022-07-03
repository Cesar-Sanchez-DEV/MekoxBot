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
        customFilters:{
            "3d": "apulsator=hz=0.125",
            lowbass: "bass=g=6",
            bassboost: "bass=g=10",
            echo: "aecho=0.8:0.9:1000:0.3",
            flanger: "flanger",
            gate: "agate",
            haas: "haas",
            karaoke: "stereotools=mlev=0.1",
            nightcore: "asetrate=48000*1.25,aresample=48000,bass=g=5",
            reverse: "areverse",
            vaporwave: "asetrate=48000*0.8,aresample=48000,atempo=1.1",
            mcompand: "mcompand",
            phaser: "aphaser",
            tremolo: "tremolo",
            surround: "surround",
            earwax: "earwax",
        }
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
        const serverQueue = mekox.distube.getQueue(queue);
        // queue.textChannel.send({
        //     embeds: [new Discord.MessageEmbed()
        //     .setAuthor(`Mekox | Music `, mekox.user.avatarURL())
        //     .setTitle(`Reproduciendo`+"<a:DiscordCD:926985065030885457>")
        //     .setDescription(` > [${playsong.name}](${playsong.url}) 
        //     **Duracion**
        //     > \`${playsong.formattedDuration}\``)
        //     /***Autoplay**
        //     > \`${autoplay ? "Activado" : "Desactivado"}\`*/
        //     .setThumbnail(playsong.thumbnail)
        //     .setColor("#ccb494")
        //     .setFooter({text: `Añadida por ${playsong.user.tag}`, iconURL: playsong.user.displayAvatarURL({dynamic: true})})
        //     ]
        // })
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Mekox | Music `, mekox.user.avatarURL())
        .setTitle(`Reproduciendo`+"<a:DiscordCD:926985065030885457>")
        .setDescription(` > [${playsong.name}](${playsong.url})`)
        .setThumbnail(playsong.thumbnail)
        .setColor("#ccb494")
        .setFooter({text: `Añadida por ${playsong.user.tag}`, iconURL: playsong.user.displayAvatarURL({dynamic: true})})
        
        if(serverQueue.autoplay){
            embed.addField("Duración",`> \`${playsong.formattedDuration}\`
                \n**Volúmen**\n> \`${serverQueue.volume}\``,true)
                .addField("Autoplay",`\` Activado \`
                \n**Filtro**\n\` ${serverQueue.filters.join(", ") || `Sin filtros`} \``,true)
            // .addFields(
            //     {name: 'Volúmen', value: `> \`${serverQueue.volume}\``, inline: false},
            //     {name: 'Filtro', value: `\`${serverQueue.filters.join(", ") || `Sin filtros`}\``, inline: true}
            // )
        }else{
            embed.addField("Duración",`> \`${playsong.formattedDuration}\`
                **Volúmen**\n> \`${serverQueue.volume}\``,true)
                .addField("Autoplay",`\` Desactivado \`
                **Filtro**\n\` ${serverQueue.filters.join(", ") || `Sin filtros`} \``,true)
            // .addFields(
            //     {name: 'Volúmen', value: `> \`${serverQueue.volume}\``, inline: false},
            //     {name: 'Filtro', value: `\`${serverQueue.filters.join(", ") || `Sin filtros`}\``, inline: true}
            // )
            // embed.addFields(
            //     {name: 'Duración', value: `> \`${playsong.formattedDuration}\``, inline: true},
            //     {name: 'Autoplay', value: `\`Desactivado\``, inline: true},
            //     {name: 'Volúmen', value: `> \`${serverQueue.volume}\``, inline: true},
            //     {name: 'Filtro', value: `> \`${serverQueue.filters? "Sin filtros" : `${serverQueue.filters}`}\``, inline: true}
            // )
        }
        return queue.textChannel.send({ embeds : [embed] });
    })

    mekox.distube.on("addSong", (queue, playsong) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setAuthor(`Mekox | Music `, mekox.user.avatarURL())
            // .setTitle("")
            .setDescription(`Añadido a la lista📌[${playsong.name}](${playsong.url}) \`${playsong.formattedDuration}\``)
            .setThumbnail(playsong.thumbnail)
            .setColor("#ccb494")
            .setFooter({text: `Añadida por ${playsong.user.tag}`, iconURL: playsong.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            ]
        })
    });

    mekox.distube.on("addList", (queue, playlist) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setAuthor(`Mekox | Music `, mekox.user.avatarURL())
            // .setTitle("")
            .setDescription(`Playlist añadida📌[${playlist.name}](${playlist.url}) \`${playlist.formattedDuration}\``)
            .setThumbnail(playlist.thumbnail)
            .setColor("#ccb494")
            .setFooter({text: `Añadida por ${playlist.user.tag}`, iconURL: playlist.user.displayAvatarURL({dynamic: true})})
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
        }).then(y => setTimeout(() => y.delete(), 30000))
    });

    mekox.distube.on("disconnect", (queue, playsong) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setAuthor(`Mekox | Music`, mekox.user.avatarURL())
            .setDescription(`Alamos, bot desconectado, para seguir con las canciones debes agregar una usando: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setColor("#ccb494")
            .setTimestamp()
            ]
        })
    });
    
    mekox.distube.on("searchNoResult",(message, query) => {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
        .setDescription(`Canción inválida  \`${query}\``)
        .setThumbnail("https://cdn.discordapp.com/attachments/887737260554977311/979805792351961088/Gatito-mekox-llorar.png")
        .setColor("#ccb494")
        .setTimestamp()

        message.channel.send({ embeds: [embed] }).then(y => setTimeout(() => y.delete(), 10000))

    });

    mekox.distube.on("searchResult", (message, results) => {
        message.channel.send(`**Choose an option from below**${
        results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join(" ")
        }*Enter anything else or wait 60 seconds to cancel*`);
    });
    
    mekox.distube.on("error", (channel, error) => {
        channel.send(`Vuelve a intentar en unos segundos, TIPO DE ERROR: `+ `\`${error}\``).then(y => setTimeout(() => y.delete(), 10000))
    });
};