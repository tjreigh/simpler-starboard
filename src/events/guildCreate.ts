import { Guild } from 'discord.js';
import { BotClass, Event } from '@tjdoescode/botts';

class EGuildCreate extends Event {
	constructor(client: BotClass) {
		super(client);
	}

	name = 'guildCreate';
	once = false;
	test = 'fuck';
	run(guild: Guild) {
		let found = 0;
		guild.channels.cache.map(c => {
			if (found === 0) {
				if (
					c.type === 'text' &&
					c.permissionsFor(this.client.user)?.has('VIEW_CHANNEL') &&
					c.permissionsFor(this.client.user)?.has('SEND_MESSAGES')
				) {
					//c.send({ embed });
					found = 1;
				}
			}
		});
	}
}

export default EGuildCreate;
