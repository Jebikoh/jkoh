import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'pause',
  description: 'Pauses currently playing song.',
  aliases: ['ps'],
  usage: 'v?pause',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (typeof server.dispatcher === 'undefined') {
      message.reply("there's nothing playing!");
    } else {
      message.channel.send(
        `Pausing :pause_button: : \`${server.queue[0].title}\``
      );
      server.dispatcher.pause();
    }
  },
};
