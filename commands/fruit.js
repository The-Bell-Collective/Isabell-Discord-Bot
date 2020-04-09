const { Command } = require('discord-akairo');
const { Message } = require('discord.js')
const { getRoleByName } = require('../helpers/roles');
class FruitCommand extends Command {
    constructor() {
        super('fruit', {
            aliases: ['fruit'],
            args: [
                {
                    id: 'fruit',
                    type: ['Apple', 'Pear', 'Cherry', 'Peach', 'Orange'],
                    default: null
                },

            ]
        });
    }

    /**
     * @param  {Message} message
     * @param  {} args
     */
    exec(message, args) {
        const { member, guild } = message;
        const { fruit } = args;
        if (!fruit) {
            member.send("Unknown Command try something like `/fruit Apple`");
            return
        };
        member.roles.add(getRoleByName(guild, fruit));
        message.delete();
    }
}

module.exports = FruitCommand;