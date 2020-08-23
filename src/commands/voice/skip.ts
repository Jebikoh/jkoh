import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'skip',
  description: 'Skips current song to the next in queue.',
  aliases: ['sk'],
  usage: 'v?skip',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (typeof server.dispatcher === 'undefined') {
      message.reply("there's nothing playing.");
    } else {
      message.channel.send(
        'Skipping :fast_forward: : ' + '`' + server.queue[0].title + '`'
      );
      server.dispatcher.end();
    }
  },
};
