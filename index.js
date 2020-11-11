const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("./config.json");

bot.login(config.token);

let queue = {}

bot.on("ready", () => {
    console.log("Signed in as " + bot.user.tag);

    for(let id of config.channels){
        queue[id] = [];
    }
    
    // console.log(queue)

    

    // bot.setInterval(run, 3660000)
    bot.setInterval(run, 90000)
})

bot.on("message", message => {
    if(config.channels.includes(message.channel.id)){
        console.log("message in " + message.channel.name)
        queue[message.channel.id].push(message);
        console.log(queue[message.channel.id].length)
    }
})

async function run(){
    //let pushArr = queue.slice(0, 10);

    console.log("start")
    console.time("start")

    for(let channel in queue){
        let pushArr = queue[channel].slice(0, 10);
        queue[channel] = queue[channel].slice(10);
        console.log("whats left: " + queue[channel])

        let i = 0

        let push = () => {
            pushArr[i].crosspost().catch(err => {
                console.log(err);
            })
            i++;
        }

        bot.setInterval(push, 1500);

        if(i == 9){
            bot.clearInterval(push);
            continue;
        }
    }
    console.timeEnd("start")
    //console.log(Object.keys(queue).length)
}