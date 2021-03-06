// Call Packages
    const Discord = require('discord.js');
    const money = require('discord-money');

    // Define client for Discord
    const client = new Discord.Client();

    // This runs when a message is recieved...
    client.on('message', message => {

        // Prefix
        let prefix = '!';

        // Example: Fetching Balance
        if (message.content.toUpperCase() === `${prefix}BALANCE`) {

            money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
                message.channel.send(`**Balance:** ${i.money}`);
            })


        }

        // Example: Adding Money To A User
        if (message.content.toUpperCase() === `${prefix}PAY`) {

            money.updateBal(message.author.id, 500 /* Value */).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`**You got $500!**\n**New Balance:** ${i.money}`);
            })

        }

        // Example: Removing Money From A User
        if (message.content.toUpperCase() === `${prefix}PAYFINE`) {

            money.updateBal(message.author.id, -500).then((i) => { // Since the 'value' is -500, it will 'add' -500, making the bal $500 lower.
                message.channel.send(`**You paid your fine of $500!**\n**New Balance:** ${i.money}`);
            })

        }

        // Example: Getting a daily reward
        if (message.content.toUpperCase() === prefix + `DAILY`) {
                message.delete();
                if (money[message.author.username + message.guild.name] != moment().format('L')) {
                    money[message.author.username + message.guild.name] = moment().format('L')
                    money.updateBal(message.author.id, 500).then((i) => { // The daily ends of the day, so everyday they can get a daily bonus, if they missed it, they can't get it back again.
                        message.channel.send({embed: {
                            color: 3447003,
                            description: 'Recieved your **$500** \`!daily`\. I think you should check \`!money\`.',
                            author: {
                                name: `${message.author.username}#${message.author.discriminator}`,
                                icon_url: message.author.avatarURL
                            }
                        }});
                    })
                } else {
                    message.channel.send({embed: {
                        color: 3447003,
                        description: 'You already recieved your \`!daily`\. Check later **' + moment().endOf('day').fromNow() + '**.', // When you got your daily already, this message will show up.
                        author: {
                            name: `${message.author.username}#${message.author.discriminator}`,
                            icon_url: message.author.avatarURL
                        }
                    }});
                }
            }


    });

        client.login("")
