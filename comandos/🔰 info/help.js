const { readdirSync } = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: "help",
    alias: ["h", "ayuda", "bothelp"],
    desc: "Sirve para ver la información del Bot",
    execute: async (mekox, message, args, prefix) => {
        //definimos las categorias del bot leyendo la ruta ./comandos
        const categorias = readdirSync('./comandos');
        
        if (args[0]) {
            const comando = mekox.commands.get(args[0].toLowerCase()) || mekox.commands.find(c => c.alias && c.alias.includes(args[0].toLowerCase()));
            const categoria = categorias.find(categoria => categoria.toLowerCase().endsWith(args[0].toLowerCase()));
            if (comando) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Comando \`${comando.name}\``)
                    .setFooter({ text: `© desarollado por Rasec_moreno#1316 | 2022`, iconURL: `${mekox.user.avatarURL()}` })
                    .setColor("#ccb494");
                //condicionales
                if (comando.desc) embed.addField(`✍ Descripción`, `\`\`\`${comando.desc}\`\`\``);
                if (comando.alias && comando.alias.length >= 1) embed.addField(`✅ Alias`, `${comando.alias.map(alias => `\`${alias}\``).join(", ")}`);
                if (comando.permisos && comando.permisos.length >= 1) embed.addField(`👤 Permisos requeridos`, `${comando.permisos.map(permiso => `\`${permiso}\``).join(", ")}`);
                if (comando.permisos_bot && comando.permisos_bot.length >= 1) embed.addField(`🤖 Permisos de BOT requeridos`, `${comando.permisos_bot.map(permiso => `\`${permiso}\``).join(", ")}`);
                return message.reply({ embeds: [embed] })
            } else if (categoria) {
                const comandos_de_categoria = readdirSync(`./comandos/${categoria}`).filter(archivo => archivo.endsWith('.js'));
                return message.reply({
                    embeds: [new Discord.MessageEmbed()
                        .setTitle(`${categoria.split(" ")[0]} ${categoria.split(" ")[1]} ${categoria.split(" ")[0]}`)
                        .setColor("#ccb494")
                        .setDescription(comandos_de_categoria.length >= 1 ? `>>> *${comandos_de_categoria.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                    ]
                })
            } else {
                const embed = new Discord.MessageEmbed()
                .setDescription(`No se ha encontrado el comando que has especificado\nUsa \`${prefix}help\` para ver los comandos y categorías`)
                .setColor('RED')
                return message.reply({embeds:[embed]})
            }
        }else{
            var paginaActual = 0;

            //definimos el embed principal
            let ayuda_embed = new Discord.MessageEmbed()
            .setAuthor(`Mekox | Help`, mekox.user.avatarURL())
            .setColor("#ccb494")
            .setDescription(`Bot Multifuncional en Desarollo por <@750847741483286549> \n\n Hola **${message.author}**\nMi nombre es _\`${mekox.user.username}\`_\n Soy un BOT MULTIFUNCIONAL Incluyendo:\n> 🛠 **ADMINISTRACIÓN\n> 🕹 ENTRETENIMIENTO\n> <:notasmusicales:926969738087776297> MÚSICA**\n*y mucho más!*`)
            .addField(`<:binarycode:991373744872378479> **_ESTADÍSTICAS:_**`, `> <:html:992147549530103961> **\`${mekox.commands.size} Comandos\`**\n> <:categorias:931790857399578655> **\`${mekox.guilds.cache.size} Servidores\`**\n> <:ping:901864024529076234> **_\`${mekox.ws.ping}ms\`_**\n> <:usuario:901715496234258453> Desarollado por **[Rasec_moreno#1316](https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley)**`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setImage("https://cdn.discordapp.com/attachments/985059285753012244/991576119633514506/mekoxFachaHorizontal.png")
            .setFooter({ text: `Página 1 / ${categorias.length+1}\n© desarollado por Rasec_moreno#1316 | 2022`, iconURL: `${mekox.user.avatarURL()}` })
            let embeds_pages = [ayuda_embed];

            //por cada categoria, creamos un embed y lo empujamos en embeds_pages
            categorias.map((categoria, index) => {
                const comandos_de_categoria = readdirSync(`./comandos/${categoria}`).filter(archivo => archivo.endsWith('.js'));

                let embed = new Discord.MessageEmbed()
                    .setTitle(`${categoria.split(" ")[0]} ${categoria.split(" ")[1]} ${categoria.split(" ")[0]}`)
                    .setColor("#ccb494")
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setDescription(comandos_de_categoria.length >= 1 ? `>>> *${comandos_de_categoria.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                    .setFooter({ text: `Página ${index+2} / ${categorias.length+1}\n© desarollado por Rasec_moreno#1316 | 2022`, iconURL: `${mekox.user.avatarURL()}` })
                embeds_pages.push(embed)
            })

            //definimos la selección de categoría
            const seleccion = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu()
                .setCustomId(`SelecciónMenuAyuda`)
                .setPlaceholder(`────────>Menu de comandos<────────`)
                .setMaxValues(4)
                .setMinValues(1)
                .addOptions(categorias.map(categoria => {
                    //definimos el objeto, que será una opción a elegir
                    let objeto = {
                        label: categoria.split(" ")[1].substring(0, 50),
                        value: categoria,
                        description: `Mira los comandos de ${categoria.split(" ")[1]}`,
                        emoji: categoria.split(" ")[0],
                    }
                    //devolvemos el objeto creado y lo añadimos como una opción más
                    return objeto;
                }))
            )

            const botones = new Discord.MessageActionRow().addComponents([
                new Discord.MessageButton().setStyle('SECONDARY').setCustomId("Atrás").setEmoji("<:atraswhite:992147550998102100>"),
                new Discord.MessageButton().setStyle('PRIMARY').setCustomId("Inicio").setEmoji("<:casasiluetanegrasinpuerta:991453697471164556>"),
                new Discord.MessageButton().setStyle('SECONDARY').setCustomId("Avanzar").setEmoji("<:adelantewhite:992147552713580654>"),
                new Discord.MessageButton().setStyle('LINK').setURL("https://discord.com/api/oauth2/authorize?client_id=957720942639972383&permissions=8&scope=bot").setLabel(`INVITE`)
            ])

            let mensaje_ayuda = await message.reply({ embeds: [ayuda_embed], components: [seleccion,botones] });

            const collector = mensaje_ayuda.createMessageComponentCollector({ filter: i => i.isButton() || i.isSelectMenu() && i.user && i.message.author.id == mekox.user.id, time: 50000 });

            collector.on("collect", async (interaccion) => {
                if (interaccion.isButton()) {
                    if(interaccion.user.id !== message.author.id) return interaccion.reply({content: `Interacción fallida solo ${message.author} puede ejecutar esta operación`, ephemeral: true})
                    switch (interaccion.customId) {
                        case "Atrás": {
                            //Resetemamos el tiempo del collector
                            collector.resetTimer();
                            //Si la pagina a retroceder no es igual a la primera pagina entonces retrocedemos
                            if (paginaActual !== 0) {
                                //Resetemamos el valor de pagina actual -1
                                paginaActual -= 1
                                //Editamos el embeds
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            } else {
                                //Reseteamos al cantidad de embeds - 1
                                paginaActual = embeds_pages.length - 1
                                //Editamos el embeds
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            }
                        }
                            break;
    
                        case "Inicio": {
                            //Resetemamos el tiempo del collector
                            collector.resetTimer();
                            //Si la pagina a retroceder no es igual a la primera pagina entonces retrocedemos
                            paginaActual = 0;
                            await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                            await interaccion?.deferUpdate();
                        }
                            break;
    
                        case "Avanzar": {
                            //Resetemamos el tiempo del collector
                            collector.resetTimer();
                            //Si la pagina a avanzar no es la ultima, entonces avanzamos una página
                            if (paginaActual < embeds_pages.length - 1) {
                                //Aumentamos el valor de pagina actual +1
                                paginaActual++
                                //Editamos el embeds
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            //En caso de que sea la ultima, volvemos a la primera
                            } else {
                                //Reseteamos al cantidad de embeds - 1
                                paginaActual = 0
                                //Editamos el embeds
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            }
                        }
                            break;
    
                        default:
                            break;
                    }
                } else {
                    let embeds = [];
                    for (const seleccionado of interaccion.values) {
                        //definimos los comandos leyendo la ruta del valor seleccionado del menú
                        const comandos_de_categoria = readdirSync(`./comandos/${seleccionado}`).filter(archivo => archivo.endsWith('.js'));

                        let embed = new Discord.MessageEmbed()
                        .setTitle(`${seleccionado.split(" ")[0]} ${seleccionado.split(" ")[1]} ${seleccionado.split(" ")[0]}`)
                        .setColor("#ccb494")
                        .setThumbnail(message.guild.iconURL({ dynamic: true }))
                        .setDescription(comandos_de_categoria.length >= 1 ? `>>> *${comandos_de_categoria.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                        .setFooter({text: `© desarollado por Rasec_moreno#1316| 2022`, iconURL: `${mekox.user.avatarURL()}` })

                        embeds.push(embed)
                    }
                    interaccion.reply({ embeds, ephemeral: true })
                }

            });

            collector.on("end", () => {
                const embed_end = new Discord.MessageEmbed()
                .setDescription(`Tu tiempo ha expirado vuelve a escribir \`${prefix}h o ${prefix}help\` para verlo de nuevo`)
                .setColor('RED')
                mensaje_ayuda.edit({embeds: [embed_end], components: [] }).catch(() => { });
            })
        }
    }
}