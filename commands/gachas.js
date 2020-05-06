const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'gacha',
    description: 'gacha!',
    execute(message, args, port) {
        if (typeof args[1] === "undefined") {
            message.channel.send("did not specify region(en、jp、tw、kr)");
        } else {
            const arg1 = args[1].toUpperCase();
            if (arg1 === 'EN' || arg1 === 'JP' || arg1 === 'TW' || arg1 === 'KR') {
                let region = 'EN';
                if (arg1 === 'JP') {
                    region = 'JP';
                } else if (arg1 === 'TW') {
                    region = 'TW';
                } else if (arg1 === 'KR') {
                    region = 'KR';
                }
                try {
                    const files = fs.readdirSync('./data/gachas/' + region.toUpperCase() + '/');
                    for (let i = 0; i < files.length; i++) {
                        const data = fs.readFileSync('./data/gachas/' + region.toUpperCase() + '/' + files[i] + '/' + files[i] + '_details.json', 'utf8');
                        const obj = JSON.parse(data);
                        const countdown = calcCountDown(obj['closeDate'], port);
                        showEmbed(message, obj, countdown);
                    }
                } catch (err) {
                    message.channel.send("sorry, your request could not be found...");
                    console.error(err);
                }
            } else {
                message.channel.send(args[1] + " <== this argument doesn't exist or you forgot to type region first");
            }
        }
    },
};

function showEmbed(message, obj, countdown) {
    let color = "#C0C0C0";
    if (obj['type'].substring(0, 2) === 'Sp') {
        color = "#28FEFF";
    } else if (obj['type'].substring(0, 2) === 'Pe') {
        color = "#F3E1D7";
    }
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(obj['title'])
        .setURL(obj['url'])
        .setDescription(countdown)
        .addFields(
            { name: 'Type', value: obj['type'], inline: true },
            { name: 'Release Date', value: obj['releaseDate'], inline: true },
            { name: 'Close Date', value: obj['closeDate'], inline: true },
            { name: 'Description', value: obj['desc'], inline: true },
        )
        .attachFiles([obj['imgUrl']])
        .setImage('attachment://' + obj['imgUrl'].substring(obj['imgUrl'].lastIndexOf("/") + 1));
    message.channel.send(exampleEmbed);
}

function calcCountDown(closeDate, port) {
    let date1 = "";
    let region = "";
    const arr = closeDate.split(' ');
    arr[1] = arr[1].replace(/\D/g, '');
    arr[2] = arr[2].substring(0, 4);
    if (arr[4] === 'PM') {
        const tmp = arr[3].split(':');
        arr[3] = parseInt(tmp[0]) + 12 + ':' + tmp[1];
    }
    const date1Str = `${arr[0]} ${arr[1]}, ${arr[2]} ${arr[3]}`;
    date1 = new Date(date1Str);
    region = arr[5];
    let date2 = Date.now();
    if (port != '3000') {
        date2 += 28740000;
    }
    //const date2 = new Date('May 12, 2020 14:23');
    if (date1 - date2 <= 0) {
        return "This gacha has Ended"
    }
    const res = Math.abs(date1 - date2) / 1000;
    const days = Math.floor(res / 86400);
    const hours = Math.floor(res / 3600) % 24;
    const minutes = Math.floor(res / 60) % 60;
    return "Closes in " + days + " days " + hours + " hours " + minutes + " minutes " + region;
}