import { BotClass, Event } from '@tjdoescode/botts';

class EReady extends Event {
	constructor(client: BotClass) {
		super(client);
	}
	name = 'ready';
	once = true;

	async run() {
		this.client.user.setActivity('the screams of civilizations past', { type: 'LISTENING' });
		this.client.logger.emit(`Logged in as ${this.client.user.tag}`);
	}
}

export default EReady;
