import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'clear',
  description: 'Clears the voice queue.',
  aliases: ['cq'],
  usage: 'v?clear',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (server.queue.length === 0) {
      message.channel.send('The queue is already empty!');
    } else {
      server.queue = [server.queue[0]];
      message.channel.send('Queue cleared!');
    }
  },
};
