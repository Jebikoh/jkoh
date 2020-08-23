import {Message} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'resume',
  description: 'Resumes playing paused song.',
  aliases: ['r'],
  usage: 'v?resume',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (typeof server.dispatcher === 'undefined') {
      message.reply("there's nothing playing.");
    } else if (server.dispatcher.paused === false) {
      message.reply("the song isn't paused.");
    } else {
      message.channel.send(
        'Resuming :arrow_forward: : ' + '`' + server.queue[0].title + '`'
      );
      server.dispatcher.resume();
    }
  },
};
