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
        .setTitle("bot commands")
        .setDescription('**prefix is** ```!bd```  **Seperate each argument with a space**'
            + '\n' + '**[empty] means you can choose to not give an argument**'
            + '\n' + '**for example:** ```!bd event en```')
        .attachFiles(['./data/help/help.png'])
        .setImage('attachment://' + 'help.png');
    message.channel.send(exampleEmbed);
}