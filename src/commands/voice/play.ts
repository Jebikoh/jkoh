import {Message, VoiceConnection, MessageEmbed, Guild} from 'discord.js';
import ytdl from 'ytdl-core-discord';
import {getInfo} from 'ytdl-core';
import {isValidUrl} from '../../utils';
import {servers} from '../../index';

async function play(connection: VoiceConnection, guild: Guild) {
  const server = servers[guild.id];

  server.dispatcher = connection.play(await ytdl(server.queue[0].url), {
    type: 'opus',
  });

  server.dispatcher.on('finish', () => {
    if (!server.loop) {
      server.queue.shift();
    }
    if (server.queue.length > 0) {
      play(connection, guild);
    } else {
      connection.disconnect();
      server.dispatcher = undefined;
    }
  });
}

module.exports = {
  name: 'play',
  description:
    'Joins your channel and plays music! Optionally provide a queue position.',
  aliases: ['p'],
  usage: 'v?play {URL} {?Position}',
  guildOnly: true,
  adminRequired: false,
  argsRequired: true,
  execute(message: Message, args: string[]) {
    if (isValidUrl(args[0])) {
      if (message.member!.voice.channel) {
        const server = servers[message.guild!.id];

        if (
          args.length > 1 &&
          server.queue.length > 0 &&
          (+args[1] < 1 || +args[1] > server.queue.length)
        ) {
          message.reply(
            "Sorry, it seems you didn't provide a valid queue position!"
          );
        } else {
          message.channel.send('🔎 searching for `' + args[0] + '`...');

          getInfo(args[0])
            .then(info => {
              const thumbnails =
                info.player_response.videoDetails.thumbnail.thumbnails;
              const thumbnailURL = thumbnails[thumbnails.length - 1].url;
              const minutes: number = Math.trunc(
                +info.player_response.videoDetails.lengthSeconds / 60
              );
              const seconds: number =
                +info.player_response.videoDetails.lengthSeconds % 60;

              const embed = new MessageEmbed()
                .setTitle(info.player_response.videoDetails.title)
                .setAuthor(
                  info.player_response.videoDetails.author,
                  info.author.avatar
                )
                .setThumbnail(thumbnailURL)
                .setURL(args[0])
                .setColor('#ff0000')
                .addField('Length', minutes + ':' + seconds, true)
                .addField(
                  'Viewcount',
                  info.player_response.videoDetails.viewCount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  true
                );

              const queuePosition =
                args.length > 1 ? +args[1] : server.queue.length;

              if (server.queue.length === 0) {
                embed.addField('Position in Queue', 'Playing!');
              } else {
                embed.addField('Position in Queue', queuePosition, true);
              }

              message.channel.send(embed);

              server.queue.splice(queuePosition, 0, {
                url: args[0],
                title: info.player_response.videoDetails.title,
                thumbnailURL: thumbnailURL,
                length: info.player_response.videoDetails.lengthSeconds,
              });
            })
            .then(() => {
              if (typeof server.dispatcher === 'undefined') {
                message.member!.voice.channel!.join().then(connection => {
                  play(connection, message.guild!);
                });
              }
            });
        }
      } else {
        message.reply("you aren't in a voice channel!");
      }
    } else {
      message.reply("sorry, that isn't a valid URL");
    }
  },
};
