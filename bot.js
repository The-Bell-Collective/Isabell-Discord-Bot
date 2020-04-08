require('dotenv').config();
const { AkairoClient, CommandHandler } = require('discord-akairo');

class MyClient extends AkairoClient {
    constructor() {
        super({
            // Options for Akairo go here.
        }, {
            disableEveryone: true
        });
        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: '/' // or ['?', '!']
        });
        this.commandHandler.loadAll();
    }
}

const client = new MyClient();
client.login(process.env.DISCORD_TOKEN);