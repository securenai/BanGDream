const fs = require('fs');
const Discord = require('discord.js');
const CryptoJS = require('crypto-js');
const { prefix, token, image } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	} else {
		const args = message.content.slice(prefix.length).split(' ');
		const command = args.shift().toLowerCase();
		console.log(command);
		if (command === 'bd') {
			console.log('Ready222222');
			if (!args.length) {
				return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
			} else if (args[0] === 'help') {
				console.log('Ready help!');
				client.commands.get('help').execute(message, args);
				//message.channel.send(`Command name: ${command}\nArguments: ${args}`);
			} else if (args[0] === 'event') {
				console.log('Ready event');
				client.commands.get('event').execute(message, args);
			} else if (args[0] === 'char') {
				console.log('Ready char');
				client.commands.get('char').execute(message, args);
			} else if (args[0] === 'gacha') {
				console.log('Ready gacha');
				client.commands.get('gacha').execute(message, args);
			}
		}





		if (message.content === 'blade') {
			// send back "Pong." to the channel the message was sent in
			message.channel.send("look! it's the B man");
		}
		if (message.content === 'koko') {
			// send back "Pong." to the channel the message was sent in
			message.channel.send(":kokosadcat:");
		}
		if (message.content === `${prefix}kokoro pf`) {//prefix+'kokoro'+' pf'
			// send back "Pong." to the channel the message was sent in
			message.channel.send("学年:高校2年生\n" +
				"誕生日:8月8日\n" +
				"星座:獅子座\n" +
				"好きな食べ物:なんでも大好き！\n" +
				"嫌いな食べ物:なし！\n" +
				"趣味:楽しいこと探し\n"
				, { files: [image] });
		}
	}
});
console.log("hello");

const express= require('express');
const app = express();

const PORT = process.env.PORT || 3000;
console.log("listen");
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

const bytes = CryptoJS.AES.decrypt(token.toString(), 'secret key 123');
const t = bytes.toString(CryptoJS.enc.Utf8);
client.login(t);

/** functions **/
//color,title,url,author,desc,thumb,srcTxt
// function showEmbedType1(message) {
// 	//const attachment = new Discord.Attachment('./data/events/2020-04/77/img/banner_event77.png', 'banner_event77.png');
// 	const exampleEmbed = new Discord.MessageEmbed()
// 		.setColor('#FFFF00')
// 		.setTitle('The Mole Person☆ Transport Mission!')
// 		.setURL('https://bestdori.com/info/events/77/')
// 		.setAuthor('KOKORO TSURUMAKI 弦巻 こころ CV.伊藤 美来', 'https://i.imgur.com/SPz6Y6J.png', 'https://discord.js.org')
// 		.setDescription('人の笑顔をらわれない様々なアイディアを実現させてきた。')
// 		.addFields(
// 			{ name: 'Regular field title', value: 'Some value here <h6>hello</h6>' },
// 			{ name: '\u200B', value: '\u200B' },
// 			{ name: 'Inline field title', value: 'Some value here', inline: true },
// 			{ name: 'Inline field title', value: 'Some value here', inline: true },
// 		)
// 		.addField('Inline field title', 'Some value here', true)
// 		.attachFiles(['./data/events/2020-04/77/img/banner_event77.png', './data/events/2020-04/77/img/attribute.png'])
// 		.setThumbnail('attachment://attribute.png')
// 		.setImage('attachment://banner_event77.png')
// 		.setTimestamp()
// 		.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

// 	message.channel.send(exampleEmbed);
// }