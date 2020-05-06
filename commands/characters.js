const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: 'char',
    description: 'char!',
    execute(message, args) {
        if(typeof args[1] === "undefined"){
            message.channel.send("you didn't tell me the character's name");
        }else{
            const arg1 = args[1].toLowerCase();
             const list=['kasumi','tae','rimi','saya','arisa',
                         'ran','moca','himari','tomoe','tsugumi',
                         'kokoro','kaoru','hagumi','kanon','misaki',
                         'aya','hina','chisato','maya','eve',
                         'yukina','sayo','lisa','ako','rinko',
                         'mashiro','toko','nanami','tsukushi','rui',];
             let valid = false;
             let i=1;
             for(i;i<list.length+1;i++){
                if(arg1 === list[i-1]){
                    valid = true;
                    break;
                }
             }
             if (valid === true) {
                const data = fs.readFileSync('./data/characters/' + i + '/details.json', 'utf8')
                const obj = JSON.parse(data);
                showEmbed(message, obj);
             }else{
                 message.channel.send(args[1]+" <== character not found...");
             }
        }
    },
};

function showEmbed(message,obj) {
    let color="#C0C0C0";
    if(obj['band'].substring(0,2) === 'Po'){
        color="#E33D90";
    }else if(obj['band'].substring(0,2) === 'Af'){
        color="#181314";
    }else if(obj['band'].substring(0,2) === 'He'){
        color="#FFDE61";
    }else if(obj['band'].substring(0,2) === 'Pa'){
        color="#FF269B";
    }else if(obj['band'].substring(0,2) === 'Ro'){
        color="#6870EC";
    }else if(obj['band'].substring(0,2) === 'Mo'){
        color="#16C6FF";
    }
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(obj['name'])
        .setURL(obj['url'])
        .setDescription(obj['introduction'])
        .addFields(
            { name: 'Name', value: obj['name'], inline: true },
            { name: 'Character Voice', value: obj['characterVoice'], inline: true },
            { name: 'Band', value: obj['band'], inline: true },
            { name: 'Role', value: obj['role'], inline: true },
            { name: 'Birthday', value: obj['birthday'], inline: true },
            { name: 'Constellation', value: obj['constellation'], inline: true },
            { name: 'Height', value: obj['height'], inline: true },
            { name: 'School', value: obj['school'], inline: true },
            { name: 'Year-Class', value: obj['yearClass'], inline: true },
            { name: 'Favorite Food', value: obj['favoriteFood'], inline: true },
            { name: 'Disliked Food', value: obj['dislikedFood'], inline: true },
            { name: 'Hobby', value: obj['hobby'], inline: true },
        )
        .attachFiles([obj['imgUrl']])
        .setThumbnail('attachment://' + 'img.jpg')
    message.channel.send(exampleEmbed);
}