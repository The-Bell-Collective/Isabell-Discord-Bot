const { Command } = require('discord-akairo');
const { Message } = require('discord.js')
const { getRoleByName, createAndAssignRole, addGateRole, cleanUpUser, } = require('../helpers/roles');
class VerifyCommand extends Command {
    constructor() {
        super('verify', {
            aliases: ['verify', 'check'],
        });
    }

    /**
     * @param {Message} message
     */
    exec(message) {
        const {member, guild} = message;
        const {nickname} = member;
        if(nickname.includes(' [') && nickname.charAt(nickname.length-1) === ']'){
            member.roles.add(getRoleByName(guild, 'Verified'));
        }else if(nickname.includes('[') && nickname.charAt(nickname.length-1) === ']'){
            let fixedNickname = nickname.replace("[", " [");
            message.member.setNickname(fixedNickname);
            member.roles.add(getRoleByName(guild, 'Verified'));
        }else{
            member.send("Your nickname is not in the correct format make sure it looks like this `Player Name [Town Name]`");
        }
        message.delete();
    }
}

module.exports = VerifyCommand;