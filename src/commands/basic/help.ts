// eslint-disable-next-line node/no-unpublished-import
import {prefix} from '../../../config.json';
import {commandCfg} from '../../SkeletronClient';
import {Message, MessageEmbed} from 'discord.js';
import * as fs from 'fs';

module.exports = {
  name: 'help',
  description: 'Lists all commands, or specific info for a command',
  aliases: ['commands'],
  usage: 'b?help {?command}',
  cooldown: 0,
  guildOnly: false,
  adminReq: false,
  argsRequired: false,
  execute(message: Message, args: string[]) {
    const commands = new Map();
    const aliases = new Map();

    const embedInitial = new MessageEmbed()
      .setTitle('**List of Commands:**')
      .setDescription(
        `\nUse \`${commandCfg['basic'].prefix}${prefix}help [command name]\` to get info on a specific command.`
      )
      .setColor('#ad3e91')
      .setTimestamp();

    const commandFolders = fs.readdirSync('./src/commands/');
    for (const folder of commandFolders) {
      const commandList = [];
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter(file => file.endsWith('.ts'));
      for (const file of commandFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command = require(`../${folder}/${file}`);
        commandList.push(command.name);
        command.name;
        if (!commands.has(command.name)) {
          commands.set(command.name, command);
          command.aliases.forEach((element: string) => {
            aliases.set(element, command);
          });
        }
      }
      const groupConfig = commandCfg[folder];
      const embedFieldBody = '`' + commandList.join('`, `') + '`';
      embedInitial.addField(
        groupConfig.group + ' (`' + groupConfig.prefix + prefix + '`)',
        embedFieldBody
      );
    }

    if (!args.length) {
      return message.channel.send(embedInitial);
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || aliases.get(name);

    if (!command) {
      return message.reply("Sorry, that's not a valid command");
    }

    const embed = new MessageEmbed()
      .setTitle(`**${command.name}**`)
      .setColor('#ad3e91')
      .setTimestamp();
    if (command.aliases) embed.addField('**Aliases:**', command.aliases);
    if (command.description)
      embed.addField('**Description:**', command.description);
    if (command.usage) embed.addField('**Usage:**', command.usage);
    if (command.cooldown) embed.addField('**Cooldown:**', command.cooldown);

    message.channel.send(embed);
    return;
  },
};
