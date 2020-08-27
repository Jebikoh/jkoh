import {Message, MessageEmbed} from 'discord.js';
import {servers} from '../..';

module.exports = {
  name: 'history',
  description: 'Look at previously played songs (up to 10).',
  aliases: ['h'],
  usage: 'v?history',
  guildOnly: true,
  adminRequired: false,
  argsRequired: false,
  execute(message: Message) {
    const server = servers[message.guild!.id];
    if (server.history.length === 0) {
      message.reply("there's nothing in this server's history!");
    } else {
      const history = new MessageEmbed()
        .setTitle('Server History')
        .setAuthor(message.guild?.name)
        .setColor('#ad3e91');

      const guildIcon = message.guild!.iconURL({format: 'png', size: 512});
      if (guildIcon !== null) {
        history.setThumbnail(guildIcon);
      }

      for (let i = server.history.length - 1; i >= 0; i--) {
        // Using unicode character U2800 - Braille Pattern Blank
        history.addField(
          '⠀',
          `**${server.history.length - i}:** \`${server.history[i].title}\``
        );
      }

      message.channel.send(history);
    }
  },
};
