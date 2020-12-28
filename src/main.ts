import * as path from 'path';
import { fileURLToPath } from 'url';
import { BotClass } from './BotClass.js';
import { default as config } from './config.js';
const { prefix, token } = new config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = new BotClass(prefix, token, {
	commandFolder: path.join(__dirname, 'commands'),
	eventFolder: path.join(__dirname, 'events'),
});

console.log(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log('Codelyon is online!');
});

process.on('unhandledRejection', (error: Error) => {
	console.log(`Unhandled rejection: \n${error.stack}`);
});
