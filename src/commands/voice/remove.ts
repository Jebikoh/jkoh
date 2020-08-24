import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'remove',
  description: 'Removes a song from the queue.',
  aliases: ['rm'],
  usage: 'v?remove {Position}',
  guildOnly: true,
  adminRequired: false,
  argsRequired: true,
  execute(message: Message, args: string[]) {
    const server = servers[message.guild!.id];
    if (typeof server.dispatcher === 'undefined') {
      message.reply("there's nothing playing!");
    } else if (server.queue.length === 1) {
      message.reply('there is nothing to remove!');
    } else {
      if (0 < +args[0] && +args[0] < server.queue.length) {
        message.channel.send(`Removed :x: : \`${server.queue[0].title}\``);
        server.queue.splice(+args[0], 1);
      }
    }
  },
};
