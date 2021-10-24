const { Telegraf } = require('telegraf')
const { hasStock, msg } = require('../index')
const env = require('node-env-file')
env(__dirname + '/.env.dist')

const bot = new Telegraf(process.env.TOKEN || token)

bot.start((ctx) => {
  ctx.reply("Hi, I am the bot that checks if there is availability of the Xbox X/S")
})

bot.command('verify', (ctx) => {
  // msg is undefined, change msg to obtain the of shops in which there are availability
  hasStock ? ctx.reply(`There is available in: ${msg}`) : ctx.reply(`No availability`)
})

bot.launch()