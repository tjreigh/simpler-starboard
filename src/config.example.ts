import { BotConfig } from './structures/BotConfig';

class Config implements BotConfig {
	prefix = '-';
	token = 'YOUR_TOKEN_HERE';
	owners = ['YOUR_ID_HERE'];
}

export default Config;
