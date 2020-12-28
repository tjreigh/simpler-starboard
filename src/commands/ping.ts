import { Message } from 'discord.js';
import { Command } from '../structures/Command.js';

class PingCommand extends Command {
	name = 'ping';
	description = 'this is a ping command!';
	run = (message: Message, args: string[]): void => {
		message.channel.send('pong!');
	};
}

export default PingCommand;
