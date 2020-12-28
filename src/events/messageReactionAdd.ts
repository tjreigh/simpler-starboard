import { MessageEmbed, MessageReaction, User } from 'discord.js';
import { BotClass } from '../BotClass.js';
import { Event } from '../structures/Event.js';

class EMessageReactionAdd extends Event {
	constructor(client: BotClass) {
		super(client);
	}
	name = 'messageReactionAdd';
	once = false;

	async run(reaction: MessageReaction, user: User) {
		if (reaction.emoji.name == '⭐') {
			const msg = reaction.message;
			const reactionUsers = await reaction.users.fetch();
			const hasSameAuthor = reactionUsers.has(msg.author.id);
			if (msg.embeds.length > 0) return;
			if (hasSameAuthor) return;
			const embed = new MessageEmbed()
				.setTitle('starboard')
				.setAuthor(msg.author.tag, msg.author.avatarURL() as string)
				.setColor(0xcca300)
				.addField('Starred By', `${user.username}`, true)
				.addField('Channel', `${msg.channel}`, true)
				.addField('Message', `${msg.content}`, false)
				.setFooter(`⭐ ${this.client.user?.username} Starboard ⭐`)
				.setTimestamp();
			msg.reply(embed);
		}
	}
}

export default EMessageReactionAdd;
