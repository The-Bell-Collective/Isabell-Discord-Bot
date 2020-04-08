const { Guild, Role, Member } = require('discord.js');

/**
 * @param  {Guild} guild
 * @param  {string} name
 */
function getRoleByName(guild, name){
    let role = guild.roles.cache.find(r => r.name === name);
    if(role){
        return role;
    }else{
        return null;
    }
}

/**
 * @param  {Member} member
 * @param  {string} name
 */
function memberHasRole(member, name){
    return member.roles.cache.find(role => role.name === name);
}

/**
 * @param  {Guild} guild
 * @param  {string} name
 */
async function createRole(guild, name){
    return guild.roles.create({
        data: {
            name: name,
            color: 'orange'
        }
    });
}

/**
 * @param  {Guild} guild
 * @param  {string} name
 */
function deleteRole(guild, name){
    getRoleByName(guild, name).delete();
}


function cleanUpUser(member, name){
    if(memberHasRole(member, name)){
        member.roles.remove(getRoleByName(member.guild, name));
    }
    let role = memberHasDodoCode(member);
    if(role){
        removeRole(member, role);
        role.delete("Done");
    }
    
}

function memberHasDodoCode(member){
    let foundRole = null;
    member.roles.cache.forEach(role => {
        console.log(role.name)
        if(role.name.includes("Dodo Code")){
           console.log("FOund code role", role.name)
           foundRole = role;
        }
    });
    return foundRole;
}

/**
 * @param  {Member} member
 * @param  {string} name
 */
function createAndAssignRole(member, name){
    createRole(member.guild, name).then( (role) => {
        member.roles.add(role.id);
    })
}

function addRole(member, name){
    member.roles.add(getRoleByName(member.guild, name));
}

function removeRole(member, role){
    member.roles.remove(role)
}

function addGateRole(member, name, code = null){
    addRole(member, name);
    if(code){
        console.log("Code ", code)
        createAndAssignRole(member, `Dodo Code: ${code}`);
    }
}

module.exports = {getRoleByName, createAndAssignRole, memberHasDodoCode, addGateRole, cleanUpUser};