const Discord  = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.login(config.BOT_TOKEN);
let bottyChannel = '';
let bottyChannelClass = '';
prefix = config.BOT_PREFIX


client.once('ready', async (readyClient) => {
    console.log(`Ready for action !`)
   try {
    const allChannelsArr = await readyClient.channels.cache.map((channel) => {return {id: channel.id,name: channel.name}})
    console.log(`I Found All Channels: ${JSON.stringify(allChannelsArr)}`)
    console.log(`Trying to find my channel "${config.BOT_CHANNEL_NAME}"'s Id...`)
    
    bottyChannel = allChannelsArr.find((channel) => channel.name === config.BOT_CHANNEL_NAME)
    if (bottyChannel.length !== 0) {
        console.log(`Finally, my channel id is ${bottyChannel.id} Yayyyyy`);
        bottyChannelClass = readyClient.channels.cache.get(bottyChannel.id);
        bottyChannelClass.send('lala')
    }

} catch (err) {
    console.log(err)
}
})

client.on("messageCreate", function(message) {
  if (message.author.bot) return;
  if (message.channel.name !== config.BOT_CHANNEL_NAME) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'add') {
      console.log('add');
      message.reply(args.map((arg) => +arg).reduce((acc,next) => acc + next,0).toString())
  }

});


    // for (key in allChannelIds){
    //     console.log(key);
    //     if (client.channels.cache.get(key).name === config.BOT_CHANNEL_NAME) {
    //         bottyChannelId = client.channels.cache.get(key).id
    //         console.log(`I found it: ${key}, breaking from loop`)
           
    //     }
    // }



// client.channels.cache.get('921894123655544852');



// const prefix = "!";



//  console.log(`I am ${something.user.tag} btw :)`)

 
// const mylist = client.channels.cache.keys()
// console.log(mylist)

//const mediaChannelId = channels.find({name:'media'}).id
// client.channels.cache.length
//  console.log(channels);
//  console.log(mediaChannel.id);
//  mediaChannel.send('yeah baby')
//  //channel.send('content')







// console.log("lala");
