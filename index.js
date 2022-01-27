const Discord = require("discord.js");
const config = require("./config.json");

// CREATE CLIENT
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.login(config.BOT_TOKEN);
// SET CONSTANTS
const BOT_COMMANDS_PREFIX = config.BOT_PREFIX;
const BOT_CHANNEL_NAME = config.BOT_CHANNEL_NAME;
const BOT_COMMANDS = ["add", "say"];

// JUST MESSING AROUND
let bottyChannel = "";
let bottyChannelClass = "";
client.once("ready", async (readyClient) => {
  console.log(`Ready for action !`);
  try {
    const allChannelsArr = await readyClient.channels.cache.map((channel) => {
      return { id: channel.id, name: channel.name };
    });
    console.log(`I Found All Channels: ${JSON.stringify(allChannelsArr)}`);
    console.log(`Trying to find my channel "${BOT_CHANNEL_NAME}"'s Id...`);

    bottyChannel = allChannelsArr.find(
      (channel) => channel.name === BOT_CHANNEL_NAME
    );
    if (bottyChannel.length !== 0) {
      console.log(`Finally, my channel id is ${bottyChannel.id} Yayyyyy`);
      bottyChannelClass = readyClient.channels.cache.get(bottyChannel.id);
      bottyChannelClass.send("lala");
    } else {
      console.log("I didnt find my channel :(");
    }
  } catch (err) {
    console.log(err);
  }
});
// END OF MESSING AROUND

client.on("messageCreate", async function (message) {
  // GET TOKEN
  try {
    // IGNORE BOT MESSAGES
    if (message.author.bot) return;
    // ONLY PARSE CORRECT CHANNEL
    if (message.channel.name !== BOT_CHANNEL_NAME) return;
    // ONLY PARSE CORRECT PREFIX
    if (!message.content.startsWith(BOT_COMMANDS_PREFIX)) return;

    // REMOVE PREFIX
    const commandBody = message.content.slice(BOT_COMMANDS_PREFIX.length);
    // FULL COMMAND ==> ARRAY
    const args = commandBody.split(" ");
    // GRAB COMMAND (FIRST ARG)
    const command = args.shift().toLowerCase();

    if (command === BOT_COMMANDS) {
      console.log("lets goooo");
    }

    switch (command) {
      case "add":
        {
          console.log("add");
          message.reply(
            args
              //.map((arg) => +arg)
              .reduce((acc, next) => acc + +next, 0)
              .toString()
          );
        }
        break;
      case "say":
        {
          battleNetToken.then((res) => {
            console.log("say");
            console.log(res);

            message.reply(`say what... DUDE!\n${res}`);
          });
        }
        break;

      default:
        {
          message.reply(`DUDE: "${command}" is not a valid command\n
        Try using: ${BOT_COMMANDS.reduce((acc, next) => acc + " or " + next)}`);
        }
        break;
    }
  } catch (err) {
    console.log(err);
  }
});
