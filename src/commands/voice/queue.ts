import {Message, MessageEmbed} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'queue',
  description: 'Look at the current queue for your server.',
  aliases: ['q'],
  usage: 'v?queue',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (server.queue.length === 0) {
      message.reply('the queue is empty!');
    } else {
      const playingStatus = server.loop ? 'looping' : 'playing';

      const queueEmbed = new MessageEmbed()
        .setTitle('Server Queue')
        .setAuthor(message.guild?.name)
        .setColor('#ad3e91')
        .addField(`Currently ${playingStatus}`, `\`${server.queue[0].title}\``);

      const guildIcon = message.guild!.iconURL({format: 'png', size: 512});
      if (guildIcon !== null) {
        queueEmbed.setThumbnail(guildIcon);
      }

      for (let i = 1; i < server.queue.length; i++) {
        // Using unicode character U2800 - Braille Pattern Blank
        queueEmbed.addField('⠀', `**${i}:** \`${server.queue[i].title}\``);
      }

      message.channel.send(queueEmbed);
    }
  },
};
