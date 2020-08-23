import {Message, MessageEmbed} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'queue',
  description: 'Look at the current queue for your server',
  aliases: ['q'],
  usage: 'v?queue',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (server.queue.length === 0) {
      message.reply('The queue is empty!');
    } else {
      const queueEmbed = new MessageEmbed()
        .setTitle('Server Queue')
        .setAuthor(message.guild?.name)
        .setColor('#30ff7c')
        .addField('Currently playing', server.queue[0].title);

      for (let i = 1; i < server.queue.length; i++) {
        queueEmbed.addField(i, server.queue[i].title);
      }

      message.channel.send(queueEmbed);
    }
  },
};
