import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'previous',
  description: 'Goes back to last track in history, or to a specific one',
  aliases: ['pre'],
  usage: 'v?previous {?Position}',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message, args: string[]) {
    const server = servers[message.guild!.id];
    if (typeof server.dispatcher === 'undefined') {
      message.reply("there's nothing playing.");
    } else if (server.history.length === 0) {
      message.reply("there's nothing in your server's history!");
    } else {
      let position = 0;

      if (args.length > 0) {
        if (+args[0] > 0 && +args[0] <= server.history.length) {
          position = +args[0] - 1;
        } else {
          message.reply('the position you provided was invalid');
        }
      }

      message.channel.send(
        `Rewinding to previous track :previous_track: : \`${server.history[position].title}\``
      );
      server.queue.splice(1, 0, server.history[position]);
      server.queue.splice(2, 0, server.queue[0]);
      server.dispatcher.end();
    }
  },
};
