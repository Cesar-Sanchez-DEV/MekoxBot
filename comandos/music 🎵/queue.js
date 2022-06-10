const Discord = require('discord.js');
const mekox = require('discord.js');

module.exports = {
    name: "queue",
    alias: ["q", "cola"],
    desc: "Sirve para ver la lista de canciones",
    async execute(mekox, message, args) {
        //comprobaciones previas
        const queue = mekox.distube.getQueue(message);

        if(!message.member.voice?.channel){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`Tienes que estar en un \`canal de voz\` para ejecutar este comando`)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] });
        }
        
        else if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id){ 
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`Unete al mismo \`canal de voz que yo\` para ejecutar este comando`)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] });
        }
        
        else if(!message.guild.me.voice?.channel){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Error`, mekox.user.avatarURL())
            .setDescription(`No estoy en un \`canal de voz\` pampu, invócame con: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setTimestamp()
            .setColor("#ccb494")
        return message.reply({ embeds:[embed] });
        }

        else if(!queue) {
            const error = new Discord.MessageEmbed()
            .setAuthor("Mekox | Error ", mekox.user.avatarURL())
            .setDescription(`No hay canciones reproduciendose ahora, agrega una canción con: \`\`\`js\nm-p <songName>\n\`\`\``)
            .setColor("#ccb494")
            return message.channel.send({ embeds : [error] })
        }

        let listaqueue = []; //creamos un array vacío donde se introducirán todas las canciones
        var maximascanciones = 10; //Estas serán las máximas canciones mostradas por página.
        //mapeamos todas las canciones y las introducimos en el array listaqueue
        for (let i = 0; i < queue.songs.length; i += maximascanciones) {
            let canciones = queue.songs.slice(i, i + maximascanciones);
            listaqueue.push(canciones.map((cancion, index) => `**\`${i + ++index}\`** - [\`${cancion.name}\`](${cancion.url})\`(${cancion.formattedDuration})\``).join("\n "));
        }

        var limite = listaqueue.length;
        var embeds = [];
        //Hacemos un loop entre todas las canciones hasta el límite
        for (let i = 0; i < limite; i++) {
            let desc = String(listaqueue[i]).substring(0, 2048); //Nos aseguramos de que la longitud del mensaje sea menor que 2048, para evitar errores.
            //Creamos un embed por cada 10 canciones
            let embed = new Discord.MessageEmbed()
                .setAuthor(`Mekox | Music`, mekox.user.avatarURL())
                .setTitle(`🎶 Cola de ${message.guild.name} - \`[${queue.songs.length} ${queue.songs.length > 1 ? "Canciones" : "Canción"}]\`${queue.songs.formattedDuration}`)
                .setColor("#ccb494")
                .setDescription(desc)
                .setTimestamp()
            //Si la cantidad de canciones a mostrar es mayor a una, entonces especificamos en el embed, que canción se está reproduciendo en ese instante.
            if (queue.songs.length > 1) embed.addField("<a:musicaa:917160425425109032> "+`Canción Actual`, `**[\`${queue.songs[0].name}\`](${queue.songs[0].url})**\`(${queue.songs[0].formattedDuration})\``)
            await embeds.push(embed)
        }
        return paginacion();

        //definimos la funcion de paginación
        async function paginacion() {
            let paginaActual = 0;
            //Si la cantidad de embeds es solo 1, envíamos el mensaje tal cual sin botones
            if (embeds.length === 1) return message.channel.send({ embeds: [embeds[0]] }).catch(() => { });
            //Si el numero de embeds es mayor 1, hacemos el resto || definimos los botones.
            let boton_atras = new Discord.MessageButton().setStyle('SUCCESS').setCustomId('Atrás').setEmoji('929001012176507040').setLabel('Atrás')
            let boton_inicio = new Discord.MessageButton().setStyle('DANGER').setCustomId('Inicio').setEmoji('🏠').setLabel('Inicio')
            let boton_avanzar = new Discord.MessageButton().setStyle('SUCCESS').setCustomId('Avanzar').setEmoji('929001012461707335').setLabel('Avanzar')
            //Enviamos el mensaje embed con los botones
            let embedpaginas = await message.channel.send({
                embeds: [embeds[0].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })],
                components: [new Discord.MessageActionRow().addComponents([boton_atras, boton_inicio, boton_avanzar])]
            });
            //Creamos un collector y filtramos que la persona que haga click al botón, sea la misma que ha puesto el comando, y que el autor del mensaje de las páginas, sea el mekox
            const collector = embedpaginas.createMessageComponentCollector({ filter: i => i?.isButton() && i?.user && i?.user.id == message.author.id && i?.message.author.id == mekox.user.id, time: 180e3 });
            //Escuchamos los eventos del collector
            collector.on("collect", async b => {
                //Si el usuario que hace clic a el botón no es el mismo que ha escrito el comando, le respondemos que solo la persona que ha escrito >>queue puede cambiar de páginas
                if (b?.user.id !== message.author.id) return b?.reply({ content: `❌ **Solo la persona que ha escrito \`${prefix}queue\` puede cambiar de páginas!` });

                switch (b?.customId) {
                    case "Atrás": {
                        //Resetemamos el tiempo del collector
                        collector.resetTimer();
                        //Si la pagina a retroceder no es igual a la primera pagina entonces retrocedemos
                        if (paginaActual !== 0) {
                            //Resetemamos el valor de pagina actual -1
                            paginaActual -= 1
                            //Editamos el embeds
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        } else {
                            //Reseteamos al cantidad de embeds - 1
                            paginaActual = embeds.length - 1
                            //Editamos el embeds
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        }
                    }
                        break;

                    case "Inicio": {
                        //Resetemamos el tiempo del collector
                        collector.resetTimer();
                        //Si la pagina a retroceder no es igual a la primera pagina entonces retrocedemos
                        paginaActual = 0;
                        await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                        await b?.deferUpdate();
                    }
                        break;

                    case "Avanzar": {
                        //Resetemamos el tiempo del collector
                        collector.resetTimer();
                        //Si la pagina a avanzar no es la ultima, entonces avanzamos una página
                        if (paginaActual < embeds.length - 1) {
                            //Aumentamos el valor de pagina actual +1
                            paginaActual++
                            //Editamos el embeds
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        //En caso de que sea la ultima, volvemos a la primera
                        } else {
                            //Reseteamos al cantidad de embeds - 1
                            paginaActual = 0
                            //Editamos el embeds
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        }
                    }
                        break;

                    default:
                        break;
                }
            });
            /*collector.on("end", () => {
                //desactivamos los botones y editamos el mensaje
                embedpaginas.components[0].components.map(boton => boton.disabled = true)
                embedpaginas.edit({content: `El tiempo ha expirado! escribe de nuevo \`${prefix}queue para volver a ver la cola de canciones!\``, embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
            });*/
        }
    }
}
