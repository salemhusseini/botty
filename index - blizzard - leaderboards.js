const Discord = require("discord.js");
const config = require("./config.json");

var axios = require("axios");
var FormDatay = require("form-data");

// BNET API STUFF
async function getBattleNetAPIAccessToken() {
  try {
    var data = new FormDatay();
    data.append("client_id", config.BNET_CLIENT_ID);
    data.append("client_secret", config.BNET_CLIENT_SECRET);
    data.append("grant_type", "client_credentials");

    var axios_config = {
      method: "post",
      url: "https://us.battle.net/oauth/token?=",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };
    const token = await axios(axios_config);

    console.log("CALLING BNET API");
    return token.data.access_token;
  } catch (err) {
    console.log(err);
  }
}

// GET BATTLENET TOKEN
const battleNetToken = getBattleNetAPIAccessToken();

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

      case "season_list":
        {
          // const url = 'https://eu.api.blizzard.com/data/d3/season/'

          battleNetToken.then(async (token) => {
            //  var data = new FormDatay();
            var axios_config = {
              method: "get",
              url: "https://eu.api.blizzard.com/data/d3/season/",
              headers: {
                Authorization: `Bearer ${token}`,
                //    ...data.getHeaders(),
              },
              //  data: data,
            };
            const result = await axios(axios_config);
            const seasons_list_arr = result.data.season;
            let output = "";
            for (i = 0; i < seasons_list_arr.length; i++) {
              output = output + `${i} - ${seasons_list_arr[i].href}\n`;
            }

            console.log(output);
            message.reply(`say what... DUDE!\n${output}`);
          });
        }
        break;
      case "season_25_leaderboards":
        {
          // const url = 'https://eu.api.blizzard.com/data/d3/season/'

          battleNetToken.then(async (token) => {
            //  var data = new FormDatay();
            var axios_config = {
              method: "get",
              url: "https://eu.api.blizzard.com/data/d3/season/24",
              headers: {
                Authorization: `Bearer ${token}`,
                //    ...data.getHeaders(),
              },
              //  data: data,
            };
            const result = await axios(axios_config);
            const leaderboard_list_arr = result.data.leaderboard;
            let output = "";
            for (i = 0; i < leaderboard_list_arr.length / 2; i++) {
              output =
                output + `${i} - ${leaderboard_list_arr[i].ladder.href}\n`;
            }

            console.log(output);
            message.reply(`say what... DUDE!\n${output}`);
          });
        }
        break;
      case "season_25_leaderboards_wiz":
        {
          // const url = 'https://eu.api.blizzard.com/data/d3/season/'

          battleNetToken.then(async (token) => {
            //  var data = new FormDatay();
            var axios_config = {
              method: "get",
              url: "https://eu.api.blizzard.com/data/d3/season/25/leaderboard/rift-wizard",
              headers: {
                Authorization: `Bearer ${token}`,
                //    ...data.getHeaders(),
              },
              //  data: data,
            };
            const result = await axios(axios_config);
            const arr = result.data.row;
            let output = "";
            for (i = 0; i < 10; i++) {
              // output = output + `${i} - ${JSON.stringify(arr[i])}\n`;
              message.reply(`${i} - ${JSON.stringify(arr[i])}`);
            }

            //console.log(output);
            // message.reply(`say what... DUDE!\n${output}`);
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
