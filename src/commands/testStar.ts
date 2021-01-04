import { Message, Snowflake } from 'discord.js';
import { BotClass, Command } from '@tjdoescode/botts';

class TestStarCommand extends Command {
	constructor(client: BotClass) {
		super(client);
	}
	new = 'fuck';
	name = 'teststar';
	aliases = ['tstar', 'testreact', 'startest', 'starboardtest'];
	description = 'Sends a message and reacts to it to test the messageReactionAdd event';

	async run(message: Message, args: string[]) {
		let starMsg: Message;
		if (args.length > 0) {
			starMsg = await message.channel.messages.fetch(args[0] as Snowflake, true);
		} else {
			starMsg = await message.reply('Hello!');
		}
		starMsg.react('⭐');
	}
}

export default TestStarCommand;
