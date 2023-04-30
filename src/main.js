import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { config } from '../config/default.js'
import { ogg } from './oog.js'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', async (ctx) => {
	await ctx.reply(JSON.stringify(ctx.message, null, 2));
})

bot.on(message('voice'), async (ctx) => {
	try {
		const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id)
		const userId = String(ctx.message.from.id);
		const oggPath = await ogg.create(link.href, userId);
		const mp3Path = await ogg.toMp3(oggPath, userId)
		await ctx.reply(JSON.stringify(mp3Path, null, 2));
	} catch (e) {
		console.error(e)
	}
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))