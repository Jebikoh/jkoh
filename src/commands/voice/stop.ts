import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'stop',
  description: 'Leaves your voice channel, turns off audio, and clears queue',
  aliases: ['s'],
  usage: 'v?stop',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (typeof server.dispatcher === 'undefined') {
      message.channel.send('Already stopped!');
    } else {
      const channel = message.member!.voice.channel;

      if (channel === null) {
        message.reply("You aren't in a voice channel!");
      } else {
        channel.leave();

        message.channel.send('Stopped!');
      }
    }
  },
};
