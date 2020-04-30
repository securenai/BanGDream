const Discord = require('discord.js');
//const puppeteer = require('puppeteer');
const { prefix, token, image} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}else{
		const args = message.content.slice(prefix.length).split(' ');
		const command = args.shift().toLowerCase();

		if (command === 'bd') {
			console.log('Ready222222');
			if (!args.length) {
				return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
			}else if(args[0] === 'kokoro'){
				console.log('Ready2!');
				//message.channel.send(`Command name: ${command}\nArguments: ${args}`);
			}else if(args[0] === 'event'){
				if(args[1] === 'next'){
					showEmbedType2(message);
				}

			}else{
				message.channel.send('sorry, not coded yet...');
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
		message.channel.send("学年:高校2年生\n"+
			                 "誕生日:8月8日\n"+
			                 "星座:獅子座\n"+
			                 "好きな食べ物:なんでも大好き！\n"+
			                 "嫌いな食べ物:なし！\n"+
			                 "趣味:楽しいこと探し\n"
							 ,{files: [image]});
		}
	}
});

client.login(token);

/** functions **/
//color,title,url,author,desc,thumb,srcTxt
function showEmbedType1(message){
	//const attachment = new Discord.Attachment('./data/events/2020-04/77/img/banner_event77.png', 'banner_event77.png');
	const exampleEmbed = new Discord.MessageEmbed()
				.setColor('#FFFF00')
				.setTitle('The Mole Person☆ Transport Mission!')
				.setURL('https://bestdori.com/info/events/77/')
				.setAuthor('KOKORO TSURUMAKI 弦巻 こころ CV.伊藤 美来', 'https://i.imgur.com/SPz6Y6J.png', 'https://discord.js.org')
				.setDescription('人の笑顔をらわれない様々なアイディアを実現させてきた。')
				.addFields(
					{ name: 'Regular field title', value: 'Some value here <h6>hello</h6>' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
					{ name: 'Inline field title', value: 'Some value here', inline: true },
				)
				.addField('Inline field title', 'Some value here', true)
				.attachFiles(['./data/events/2020-04/77/img/banner_event77.png','./data/events/2020-04/77/img/attribute.png'])
				.setThumbnail('attachment://attribute.png')
				.setImage('attachment://banner_event77.png')
				.setTimestamp()
				.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

				message.channel.send(exampleEmbed);
}
function showEmbedType2(message){
	//const attachment = new Discord.Attachment('./data/events/2020-04/77/img/banner_event77.png', 'banner_event77.png');
	const exampleEmbed = new Discord.MessageEmbed()
				.setColor('#FFFF00')
				.setTitle('The Mole Person☆ Transport Mission!')
				.setURL('https://bestdori.com/info/events/77/')
				.setAuthor('The Mole Person☆ Transport Mission!','https://i.imgur.com/SPz6Y6J.png','https://bestdori.com/info/events/77/')
				.setDescription('Countdown : Starts in 10 hrs 48 min 41 sec (EN)')
				.addFields(
					{ name: 'Type', value: 'VS Live', inline: true },
					{ name: 'Start Date', value: 'Apr 30th 2020, 9:00 AM (EN)', inline: true },
					{ name: 'End Date', value: 'May 8th 2020, 2:59 PM (EN)', inline: true },
					{ name: 'Attribute', value: 'PURE +20%', inline: true },
					{ name: 'Character', value: 'Aya,Hina,Chisato,Eve +10%', inline: true },
					{ name: 'Parameter', value: 'Visual +50%', inline: true },
				)
				//.addField('Inline field title', 'Some value here', true)
				.attachFiles(['./data/events/2020-04/77/img/banner_event77.png','./data/events/2020-04/77/img/attribute.png'])
				.setThumbnail('attachment://attribute.png')
				.setImage('attachment://banner_event77.png')
				.setTimestamp()
				.setFooter('!bd gacha ', 'https://i.imgur.com/wSTFkRM.png');

				message.channel.send(exampleEmbed);
}



					// let srcTxt;
					// (async () => {
					//   const browser = await puppeteer.launch();
					//   const page = await browser.newPage();
					//   try{
					// 	await page.goto('https://bestdori.com/info/events/77/The-Mole-Person-Transport-Mission', {timeout: 0, waitUntil: 'networkidle0'})
					//   	//await page.goto('https://bestdori.com/info/events/77/The-Mole-Person-Transport-Mission', {timeout: 0, waitUntil: 'networkidle0'})
					// 	  const [el] = await page.$x('//*[@id="app"]/div[4]/div[2]/div[1]/div[3]/div[1]/div/img');
					// 	  //console.log(el);
					// 	   //console.log([el]);
					// 	  const src = await el.getProperty('src');
					// 	  srcTxt = await src.jsonValue();
					// 	  //console.log({srcTxt});
					// 	  await browser.close();
					//   }catch(error){
					//   	console.log(error);
  			// 			browser.close();
					//   }
					//   showDetails(srcTxt,message);
					// })();