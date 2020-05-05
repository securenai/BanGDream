const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'help!',
    execute(message) {
        console.log("help is here");
        showEmbed(message);
    },
};

function showEmbed(message) {
   
    const exampleEmbed = new Discord.MessageEmbed()
        //.setColor(color)┤┐
        .setTitle("bot commands")
        //.setURL(obj['url'])
        .setDescription('**prefix is** ```!bd```  **Seperate each argument with a space**' 
                      + '\n' +'**[empty] means you can choose to not give an argument**'
                      + '\n' +'**for example:** ```!bd event en```')
        // .addFields(
        //     { name: 'Type', value: obj['type'], inline: true },
        //     { name: 'Start Date', value: obj['startDate'], inline: true },
        //     { name: 'End Date', value: obj['endDate'], inline: true },
        //     { name: 'Attribute', value: obj['attribute'], inline: true },
        //     { name: 'Character', value: obj['characters'], inline: true },
        //     { name: 'Parameter', value: obj['parameter'], inline: true },
        // )
        //.attachFiles([obj['imgUrl']])
        .attachFiles(['./data/help/help.png'])
        //.attachFiles(['./data/help/help.png', './data/help/thumbnail.png'])
        //.setThumbnail('attachment://' + 'thumbnail.png')
        .setImage('attachment://' + 'help.png');
    message.channel.send(exampleEmbed);
}