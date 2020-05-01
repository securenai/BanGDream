const fs = require('fs');
const Discord = require('discord.js');
/**
 * curr = 1 , next = 2
 * EN = 1 , JP = 2 , TW = 3, KR = 4
 * 
 **/
module.exports = {
    name: 'event',
    description: 'event!',
    execute(message, args) {
        if (args[1] === 'curr' || args[1] === 'next') {
            let region = 'EN';
            if (args[2] === 'JP') {
                region = 'JP';
            } else if (args[2] === 'TW') {
                region = 'TW';
            } else if (args[2] === 'KR') {
                region = 'KR';
            } else if (args[2] === 'EN' || args[2] === ''){
            }
            try {
                // get json file from local pc
                const data = fs.readFileSync('./data/events/' + region.toUpperCase() + '/' + args[1] + '/details.json', 'utf8')
                // convert json to object literal
                const obj = JSON.parse(data);
                // use object to pass on to embeded content
                showEmbed(message, obj);
            } catch (err) {
                console.error(err);
            }
        }
    },
};

function showEmbed(message, obj) {
    //const attachment = new Discord.Attachment('./data/events/2020-04-30/77/img/banner_event77.png', 'banner_event77.png');
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#C0C0C0')
        .setTitle(obj['title'])
        .setURL(obj['url'])
        .setDescription(obj['desc'])
        .addFields(
            { name: 'Type', value: obj['type'], inline: true },
            { name: 'Start Date', value: obj['startDate'], inline: true },
            { name: 'End Date', value: obj['endDate'], inline: true },
            { name: 'Attribute', value: obj['attribute'], inline: true },
            { name: 'Character', value: obj['characters'], inline: true },
            { name: 'Parameter', value: obj['parameter'], inline: true },
        )
        .attachFiles([obj['imgUrl']])
        //.attachFiles(['./data/events/2020-04-30/77/img/banner_event77.png', './data/events/2020-04-30/77/img/attribute.png'])
        .setImage('attachment://' + obj['imgUrl'].substring(obj['imgUrl'].lastIndexOf("/") + 1));
    message.channel.send(exampleEmbed);
}