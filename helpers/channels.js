const { Guild, Role, Member, Channel } = require('discord.js');
/**
 * @returns {Channel}
 * @param  {Guild} guild
 * @param  {string} name
 */
function getChannelByName(guild, name){
    let channel = guild.channels.cache.find(r => r.name === name);
    if(channel){
        return channel;
    }else{
        return null;
    }
}

module.exports = {getChannelByName}