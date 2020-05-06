const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'event',
    description: 'event!',
    execute(message, args, port) {
        if (typeof args[1] === "undefined") {
            message.channel.send("did not specify region(en、jp、tw、kr)");
        } else {
            const arg1 = args[1].toUpperCase();
            let arg2 = args[2];

            if (arg1 === 'EN' || arg1 === 'JP' || arg1 === 'TW' || arg1 === 'KR') {
                let region = 'EN';
                if (arg1 === 'JP') {
                    region = 'JP';
                } else if (arg1 === 'TW') {
                    region = 'TW';
                } else if (arg1 === 'KR') {
                    region = 'KR';
                }
                if (arg2 === 'curr' || arg2 === 'next' || typeof arg2 === "undefined") {
                    if (typeof arg2 === "undefined") {
                        arg2 = 'curr';
                    }
                    try {
                        const data = fs.readFileSync('./data/events/' + region.toUpperCase() + '/' + arg2 + '/details.json', 'utf8')
                        const obj = JSON.parse(data);
                        const countdown = calcCountDown(arg2, obj['startDate'], obj['endDate'], port);
                        showEmbed(message, obj, countdown);
                    } catch (err) {
                        message.channel.send("sorry, your request could not be found...");
                        console.error(err);
                    }
                } else {
                    message.channel.send(args[2] + " <== this argument doesn't exist");
                }
            } else {
                message.channel.send(args[1] + " <== this argument doesn't exist or you forgot to type region first");
            }
        }
    },
};

function showEmbed(message, obj, countdown) {
    let color = "#C0C0C0";
    if (obj['attribute'].substring(0, 2) === 'Po') {
        color = "#FF345A";
    } else if (obj['attribute'].substring(0, 2) === 'Pu') {
        color = "#44C527";
    } else if (obj['attribute'].substring(0, 2) === 'Ha') {
        color = "#FF6600";
    } else if (obj['attribute'].substring(0, 2) === 'Co') {
        color = "#4057E3";
    }
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(obj['title'])
        .setURL(obj['url'])
        .setDescription(countdown)
        .addFields(
            { name: 'Type', value: obj['type'], inline: true },
            { name: 'Start Date', value: obj['startDate'], inline: true },
            { name: 'End Date', value: obj['endDate'], inline: true },
            { name: 'Attribute', value: obj['attribute'], inline: true },
            { name: 'Character', value: obj['characters'], inline: true },
            { name: 'Parameter', value: obj['parameter'], inline: true },
        )
        .attachFiles([obj['imgUrl']])
        .setImage('attachment://' + obj['imgUrl'].substring(obj['imgUrl'].lastIndexOf("/") + 1));
    message.channel.send(exampleEmbed);
}

function calcCountDown(state, startDate, endDate, port) {
    let date1 = "";
    let region = "";
    let startOrEnd = "";
    if (state === 'curr') {
        const arr = endDate.split(' ');
        arr[1] = arr[1].replace(/\D/g, '');
        arr[2] = arr[2].substring(0, 4);
        if (arr[4] === 'PM') {
            const tmp = arr[3].split(':');
            arr[3] = parseInt(tmp[0]) + 12 + ':' + tmp[1];
        }
        const date1Str = `${arr[0]} ${arr[1]}, ${arr[2]} ${arr[3]}`;
        date1 = new Date(date1Str);
        region = arr[5];
        startOrEnd = "Ends";
    } else if (state === 'next') {
        const arr = startDate.split(' ');
        arr[1] = arr[1].replace(/\D/g, '');
        arr[2] = arr[2].substring(0, 4);
        if (arr[4] === 'PM') {
            const tmp = arr[3].split(':');
            arr[3] = parseInt(tmp[0]) + 12 + ':' + tmp[1];
        }
        const date1Str = `${arr[0]} ${arr[1]}, ${arr[2]} ${arr[3]}`;
        date1 = new Date(date1Str);
        region = arr[5];
        startOrEnd = "Starts";
    }
    
    let date2 = Date.now();
    if(port != '3000'){
        console.log(date2);
        date2+=28740000;
    }
    //const date2 = new Date('May 12, 2020 14:23');
    if (date1 - date2 <= 0) {
        return "The current event has Ended"
    }
    const res = Math.abs(date1 - date2) / 1000;
    const days = Math.floor(res / 86400);
    const hours = Math.floor(res / 3600) % 24;
    const minutes = Math.floor(res / 60) % 60;
    return startOrEnd + " in " + days + " days " + hours + " hours " + minutes + " minutes " + region;
}