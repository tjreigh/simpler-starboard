import * as fs from 'fs';
import { Client, Collection, Message } from 'discord.js';
import { Command } from './structures/Command.js';
import path from 'path';

interface BotOptions {
	commandFolder: string;
	eventFolder: string;
}

export class BotClass extends Client {
	constructor(prefix: string, token: string, options: BotOptions) {
		super();
		this.prefix = prefix;
		this.token = token;
		this.commandFolder = path.resolve(options.commandFolder);
		this.eventFolder = path.resolve(options.eventFolder);
		this.init();
	}

	prefix: string;
	private commands: Collection<string, Command> = new Collection();
	token: string;
	protected readonly commandFolder: string;
	protected readonly eventFolder: string;

	async init() {
		await this.loadCommands();
		await this.eventDispatcher();
		this.on('message', (message: Message) => this.commandDispatcher(message));
		await this.login(this.token);
	}

	async loadCommands() {
		const commandFiles = fs.readdirSync(this.commandFolder).filter(file => file.endsWith('.js'));
		console.log(`commandfiles = ${commandFiles}`);

		for (const file of commandFiles) {
			const fullPath = path.resolve(path.join(this.commandFolder, file));
			console.log(`fullPath = ${fullPath}`);
			const command = new (await import(fullPath)).default(this);
			console.log(`command = ${command.name}`);
			this.commands.set(command.name, command);
		}
	}

	async eventDispatcher() {
		const eventFiles = fs.readdirSync(this.eventFolder).filter(file => file.endsWith('.js'));

		for (const file of eventFiles) {
			const fullPath = path.resolve(path.join(this.eventFolder, file));
			const event = new (await import(fullPath)).default(this);
			const eName: string = event.name || file;
			const once: boolean = event.once;

			this.on(eName, (...args) => {
				console.log(`dispatching E${eName}`);
				event.run(...args);
			});
		}
	}

	async commandDispatcher(message: Message) {
		if (!message.content.startsWith(this.prefix) || message.author.bot) return;

		const args = message.content.slice(this.prefix.length).split(' ');
		const command = args.shift()?.toLowerCase();
		console.log(`dispatching C${command}`);

		if (command === 'reload') {
			await this.loadCommands();
			message.reply('reloaded');
		}

		console.log(`commandKeys = ${Array.from(this.commands.keys()).toString()}`);
		const cmd = this.commands.find(cmd => cmd.name == command);
		console.log(cmd);
		cmd?.run(message, args);
	}
}
