import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'loop',
  description:
    'Loops the currently playing song. Disable call using command again.',
  aliases: ['l'],
  usage: 'v?loop',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (typeof server.dispatcher === 'undefined') {
      message.reply('there is nothing playing!');
    } else {
      server.loop = server.loop ? false : true;
      const emoji = server.loop ? ':infinity:' : ':anger:';
      const customText = server.loop ? 'Now' : 'Stopped';
      message.channel.send(
        `${customText} looping ${emoji}: \`${server.queue[0].title}\``
      );
    }
  },
};
