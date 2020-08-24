import {Message} from 'discord.js';
import {deleteMessage} from '../../utils';

module.exports = {
  name: 'ping',
  description: 'A basic ping command to test bot availability',
  aliases: ['p'],
  usage: 'b?ping',
  guildOnly: false,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    message.channel.send(message.author.avatarURL({format: 'png', size: 128}));
    message.channel.send('Pong!').then(msg => {
      deleteMessage(msg);
    });
    deleteMessage(message);
  },
};
