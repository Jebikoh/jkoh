import {Message, MessageEmbed} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'current',
  description: 'Displays the current song',
  aliases: ['cs'],
  usage: 'v?current',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (server.queue.length === 0) {
      message.channel.send('Nothing is playing right now!');
    } else {
      const isPaused =
        server.dispatcher!.paused === true ? 'Paused' : 'Playing';
      const timeRemaining = Math.trunc(
        server.queue[0].length - server.dispatcher!.streamTime / 1000
      );
      const seconds =
        timeRemaining % 60 > 9
          ? timeRemaining % 60
          : '0' + (timeRemaining % 60);
      const minutes = Math.trunc(timeRemaining / 60);

      const embed = new MessageEmbed()
        .setAuthor('Currently playing...')
        .setTitle(server.queue[0].title)
        .setURL(server.queue[0].url)
        .setThumbnail(server.queue[0].thumbnailURL)
        .addField('Status', isPaused, true)
        .addField('Time Remaining', minutes + ':' + seconds, true);

      message.channel.send(embed);
    }
  },
};
