const { Command } = require('discord-akairo');
const { Message } = require('discord.js')

const { AIRTABLE_TOKEN, AIRTABLE_BASE } = process.env;

var Airtable = require('airtable');
var base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE);

const { getRoleByName } = require('../helpers/roles');
class ContestCommand extends Command {
    constructor() {
        super('contest', {
            aliases: ['contest', 'submit'],
            args: [
                {
                    id: 'submission',
                    type: 'url',
                    default: null
                }
            ]
        });
    }


    /**
     * @param  {Message} message
     * @param  {} {submission}

     */
    exec(message, { submission }) {
        message.delete();
        if (submission) {
            base('Photo Contest').create([
                {
                    "fields": {
                        "Discord Tag": message.member.nickname,
                        "Image": [{ 'url': submission }],
                        "Image URL": submission
                    }
                }
            ], function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            message.client.channels.fetch('697889174170370069').then(async (channel) => {
                channel.send(message.author.toString() + " submitted: " + submission);
            })
            message.member.roles.add(getRoleByName(message.guild, 'Contestant'));
        }

    }
}

module.exports = ContestCommand;