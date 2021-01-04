import { oneLine } from 'common-tags';
import { Message } from 'discord.js';
import { BotClass, Command } from '@tjdoescode/botts';

class PingCommand extends Command {
	constructor(client: BotClass) {
		super(client);
	}
	name = 'ping';
	description = 'A straightforward ping command to verify the bot is working';

	async run(message: Message) {
		const pingMsg = await message.reply('Pinging...');
		return pingMsg.edit(oneLine`
			${message.channel.type !== 'dm' ? `${message.author},` : ''}
			Pong! The message round-trip took ${(pingMsg.editedTimestamp || pingMsg.createdTimestamp) -
				(message.editedTimestamp || message.createdTimestamp)}ms.
			${this.client.ws.ping ? `The heartbeat ping is ${Math.round(this.client.ws.ping)}ms.` : ''}
		`);
	}
}

export default PingCommand;
