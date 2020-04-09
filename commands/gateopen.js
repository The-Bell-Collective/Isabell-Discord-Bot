const { Command } = require('discord-akairo');
const { Message } = require('discord.js')
const { getRoleByName, createAndAssignRole, addGateRole, cleanUpUser } = require('../helpers/roles');
class GateCommand extends Command {
    constructor() {
        super('gate', {
            aliases: ['gate', 'gates'],
            args: [
                {
                    id: 'action',
                    type: ['open', 'close', 'change', 'debug'],
                    default: null
                },
                {
                    id: 'code',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    /**
     * @param {Message} message
     * @param {String[]} args
     */
    exec(message, args) {
        const { action, code } = args;
        
        if (!action) {
            return;
        }
        switch(action){
            case "open":
                //message.member.roles.add(getRoleByName(message.guild, "Gates are open"));
                let fixedCode = code;
                console.log(code);
                if(fixedCode.includes("<")){
                    fixedCode = fixedCode.replace("<", "");
                }
                if(fixedCode.includes(">")){
                    fixedCode = fixedCode.replace(">", "");
                }
                
                addGateRole(message.member, "Gates are open", fixedCode);
                message.delete();
                break;
            case "close":
                cleanUpUser(message.member, "Gates are open");
                message.delete();
                break;
            case "debug":
                console.log("debug")
                createAndAssignRole(message.member, "test");
                break;
        }
    }
}

module.exports = GateCommand;