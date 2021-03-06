import {Message} from 'discord.js';
import {servers} from '../..';
import {serverStopAudio} from '../../utils';

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
        message.reply("you aren't in a voice channel!");
      } else {
        serverStopAudio(server, channel);
        message.channel.send('Stopped! :no_entry:');
      }
    }
  },
};
