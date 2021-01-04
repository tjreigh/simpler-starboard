import * as path from 'path';
import { fileURLToPath } from 'url';
import { BotClass, LogLevel } from '@tjdoescode/botts';
import { config } from './config';
const { prefix, token, owners } = config;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = new BotClass(prefix, token, owners, {
	commandFolder: path.join(__dirname, 'commands'),
	eventFolder: path.join(__dirname, 'events'),
	partials: ['MESSAGE', 'REACTION'],
	logLevel: LogLevel.Verbose,
});

process.on('unhandledRejection', (error: Error) => {
	client.logger.emit(`Unhandled rejection: \n${error}`, LogLevel.Error);
});
