import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'swap',
  description: 'Swap two songs in queue.',
  aliases: ['sw'],
  usage: 'v?swap {First Position} {Second Position}',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message, args: string[]) {
    const server = servers[message.guild!.id];
    if (server.queue.length < 3) {
      message.reply("There's nothing to move!");
    } else if (
      args.length === 2 &&
      +args[0] > 0 &&
      +args[0] < server.queue.length &&
      +args[1] > 0 &&
      +args[1] < server.queue.length
    ) {
      const first = server.queue[+args[0]];
      server.queue[+args[0]] = server.queue[+args[1]];
      server.queue[+args[1]] = first;

      message.channel.send(
        `swapped! \`${first.title}\` :arrows_counterclockwise: \`${
          server.queue[+args[0]].title
        }\``
      );
    } else {
      message.reply('sorry, the positions you provided were invalid');
    }
  },
};
