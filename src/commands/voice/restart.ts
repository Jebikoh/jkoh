import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'restart',
  description: 'Restarts the current song.',
  aliases: ['re'],
  usage: 'v?restart',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (typeof server.dispatcher === 'undefined') {
      message.reply("there's nothing playing!");
    } else {
      server.queue.splice(1, 0, server.queue[0]);
      message.channel.send(
        `Restarting :rewind: : \`${server.queue[0].title}\``
      );
      server.dispatcher.end();
    }
  },
};
