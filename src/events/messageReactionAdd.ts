import { MessageEmbed, MessageReaction, TextChannel, User } from 'discord.js';
import { BotClass, Event } from '@tjdoescode/botts';

class EMessageReactionAdd extends Event {
	constructor(client: BotClass) {
		super(client);
	}
	name = 'messageReactionAdd';
	once = false;

	async run(reaction: MessageReaction, user: User) {
		if (reaction.partial) {
			try {
				await reaction.message.fetch();
			} catch (error) {
				this.client.logger.emit(`Error when fetching message: \n${error}`, 'Error');
			}
		}

		const msg = reaction.message;
		const reactionUsers = await reaction.users.fetch();
		const starboardChannel = (await msg.guild?.channels.cache
			.find(c => c.name == 'starboard')
			?.fetch()) as TextChannel;

		if (!starboardChannel) return;
		//if (msg.embeds.length > 0) return;
		if (reactionUsers.has(user.id)) return;

		const topic = starboardChannel.topic ?? '';
		const threshIdx = topic.match(/min[_.\-\s]stars/i)?.index;
		const defaultThreshold = Math.min(1, Math.round((msg.guild?.memberCount as number) / 20));
		const threshold = threshIdx ? parseInt(topic.substr(threshIdx + 10, 1)) : defaultThreshold;

		if (threshold > (reaction.count as number)) return;

		const embed = new MessageEmbed()
			.setTitle('starboard')
			.setAuthor(msg.author.tag, msg.author.avatarURL() as string)
			.setColor(0xcca300)
			.addField('Starred By', `${reactionUsers.map(u => u.username).join(',')}`, true)
			.addField('Channel', `${msg.channel}`, true)
			.addField('Message', `${msg.content}`, false)
			.setFooter('⭐ simpler-starboard ⭐')
			.setTimestamp();

		starboardChannel.send(embed);
	}
}

export default EMessageReactionAdd;
