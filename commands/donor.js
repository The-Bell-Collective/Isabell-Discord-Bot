const { Command } = require('discord-akairo');
const { Message } = require('discord.js');
const { getRoleByName } = require('../helpers/roles');
class DonorCommand extends Command {
    constructor() {
        super('donor', {
            aliases: ['donor']
        });
    }
    /**
     * @param  {Message} message
     */
    exec(message){
        try{
            message.member.roles.add(getRoleByName(message.guild, "Donor"));
        }catch(e){
            message.author.send("Your command seemed to fail please DM ATechAdventurer#0001 and tell him you are having a problem with /donor");
        }
        message.delete();
    }
}

module.exports = DonorCommand;