import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'move',
  description: 'Move a song to a different position in your queue.',
  aliases: ['m'],
  usage: 'v?move {Starting Position} {Ending Position}',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message, args: string[]) {
    const server = servers[message.guild!.id];
    if (server.queue.length < 3) {
      message.reply("there's nothing to move!");
    } else if (
      args.length === 2 &&
      +args[0] > 0 &&
      +args[0] < server.queue.length &&
      +args[1] > 0 &&
      +args[1] < server.queue.length
    ) {
      server.queue.splice(+args[1], 0, server.queue.splice(+args[0], 1)[0]);
      const emoji = +args[0] > +args[1] ? ':arrow_up:' : 'arrow_down';

      if (args[0] > args[1]) {
        message.channel.send(
          `Moving ${emoji} : \`${
            server.queue[+args[1]].title
          }\` to \`${+args[1]}\``
        );
      }
    } else {
      message.reply('sorry, the positions you provided were invalid');
    }
  },
};
