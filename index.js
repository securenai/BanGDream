const fs = require('fs');
const Discord = require('discord.js');
const CryptoJS = require('crypto-js');
const { prefix, token } = require('./config.json');
const PORT = process.env.PORT || 3000;
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	client.user.setActivity("!bd help ");
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	} else {
		const args = message.content.slice(prefix.length).split(' ');
		const command = args.shift().toLowerCase();
		if (command === 'bd') {
			if (!args.length) {
				return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
			} else if (args[0] === 'help') {
				client.commands.get('help').execute(message, args);
			} else if (args[0] === 'event') {
				client.commands.get('event').execute(message, args, PORT);
			} else if (args[0] === 'char') {
				client.commands.get('char').execute(message, args);
			} else if (args[0] === 'gacha') {
				client.commands.get('gacha').execute(message, args, PORT);
			}
		}
	}
});

const express = require('express');
const app = express();
app.listen(PORT, () => {
	console.log(`Our app is running on port ${PORT}`);
});
const bytes = CryptoJS.AES.decrypt(token.toString(), 'secret key 123');
const t = bytes.toString(CryptoJS.enc.Utf8);
client.login(t);