const { Command } = require('discord-akairo');
const { Message } = require('discord.js');
const { getRoleByName } = require('../helpers/roles');
const { getChannelByName } = require('../helpers/channels');
class DonateCommand extends Command {
    constructor() {
        super('donate', {
            aliases: ['donate'],
            args: [
                {
                    id: 'type',
                    type: [
                        ["bells", "bell"],
                        ["nmts", "nmt", "nookmilesticket"],
                        ["crowns", "crown", "royalcrown", "royalcrowns"]
                    ],
                    default: null
                },
                {
                    id: 'amount',
                    type: 'string',
                    default: "0"
                }
            ]
        });
    }
    /**
     * @param  {Message} message
     * @param {Object} args - The Arguments
     * @param {string} args.type - The type
     * @param {string} args.amount - The amount
     */
    exec(message, { type, amount }) {
        amount = amount.toString();
        let parsedAmount = 0;
        if (!type) {
            message.delete();
            message.member.send("Hi it seems like you are having trouble using the `/donate` command. You can donate the following types: Bells, Crowns or NMTs. Try running the command again like so `/donate bells 99000`");
            return;
        }
        if(!amount){
            return;
        }
        console.log(amount);
        if(amount.toString().toLowerCase().includes('k') || amount.toString().toLowerCase.includes('m')){
            if(amount.toLowerCase().includes('k')){
                console.log("Noticed a K")
                if(!!parseInt(amount.toLowerCase().replace('k',''))){
                    parsedAmount = parseInt(amount.toLowerCase().replace('k','')) * 1000;
                }else{
                    message.reply("An error occured, It looks like your input is messed up");
                    return;
                }
            }
            if(amount.toString().toLowerCase().includes('m')){
                if(!!parseInt(amount.toLowerCase().replace('m',''))){
                    parsedAmount = parseInt(amount.toLowerCase().replace('m','')) * 1000000;
                }else{
                    message.reply("An error occured, It looks like your input is messed up");
                    return;
                }
            }
        }else if(!!parsedInt(amount)){
            parsedAmount = parseInt(amount);
        }else{
            message.reply("The amount you entered does not seem to be a valid number, please try again");
            message.delete();
            return;
        }
        if((type == "bells" && parsedAmount >= 99000) || (type !== "bells" && parsedAmount > 1)){
            message.author.send("Pinging our donation team, someone will be in-touch soon");
            getChannelByName(message.guild, "donors").send(`${message.author.toString()} wants to donate ${parsedAmount} ${type}`)
        }else {
            message.author.send("Sorry, unfortunatly we have a minimum donation of at least 99000 bells or at least 1 NMT or Crown")
            console.log(type, parsedAmount, amount)
        }
        message.delete();

    }
}

module.exports = DonateCommand;