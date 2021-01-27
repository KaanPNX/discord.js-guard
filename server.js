const Discord = require('discord.js'); // v12
const events = require('events');
const fs = require('fs-extra');
const data = require('./src/Database/Database');
const GuardErrors = require('./src/GuardErrors');
const GuardClient = require('./src/GuardClient');

function Guard(options,client){
  
  options = {
    whitelist: options.whitelist ? options.whitelist : [],
    server_id: options.server_id ? options.server_id : "",
    log_channel_id: options.log_channel_id ? options.log_channel_id : "",
    slave_role: options.slave_role ? options.slave_role : "",
    ready: options.ready ? options.ready : 0,
    
    channel_create: options.channel_create ? options.channel_create : 0,
    channel_delete: options.channel_delete ? options.channel_delete : 0,
    channel_update: options.channel_update ? options.channel_update : 0,
    
    role_create: options.role_create ? options.role_create : 0,
    role_delete: options.role_delete ? options.role_delete : 0,
    role_update: options.role_update ? options.role_update : 0,
    
    emoji_create: options.emoji_create ? options.emoji_create : 0,
    emoji_delete: options.emoji_delete ? options.emoji_delete : 0,
    
    webhook_update: options.webhook_update ? options.webhook_update : 0,
    
    guild_ban_add: options.guild_ban_add ? options.guild_ban_add : 0,
    guild_kick_add: options.guild_kick_add ? options.guild_kick_add : 0,
    guild_member_role_update: options.guild_member_role_update ? options.guild_member_role_update : 0,
    guild_bot_add: options.guild_bot_add ? options.guild_bot_add : 0,
    guild_update: options.guild_update ? options.guild_update : 0,
    
    
    channel_create_log_message: options.channel_create_log_message ? options.channel_create_log_message : '-user- created -channel- channel',
    channel_delete_log_message: options.channel_delete_log_message ? options.channel_delete_log_message : '-user- deleted -channel- channel',
    channel_update_log_message: options.channel_update_log_message ? options.channel_update_log_message : '-user- updated -channel- channel',
    
    role_create_log_message: options.role_create_log_message ? options.role_create_log_message : '-user- created -role- role',
    role_delete_log_message: options.role_delete_log_message ? options.role_delete_log_message : '-user- deleted -role- role',
    role_update_log_message: options.role_update_log_message ? options.role_update_log_message : '-user- updated -role- role',
    
    emoji_create_log_message: options.emoji_create_log_message ? options.emoji_create_log_message : '-user- created -emoji- emoji',
    emoji_delete_log_message: options.emoji_delete_log_message ? options.emoji_delete_log_message : '-user- deleted -emoji- emoji',
    
    webhook_update_log_message: options.webhook_update_log_message ? options.webhook_update_log_message : '-user- updated -webhook- webhoks',

    guild_ban_add_log_message: options.guild_ban_add_log_message ? options.guild_ban_add_log_message : '-user- banned -target-',
    guild_kick_add_log_message: options.guild_kick_add_log_message ? options.guild_kick_add_log_message : '-user- kicked -target-',
    guild_member_role_update_log_message: options.guild_member_role_update_log_message ? options.guild_member_role_update_log_message : '-user- given a role to user -role-',
    guild_bot_add_log_message: options.guild_bot_add_log_message ? options.guild_bot_add_log_message : '-user- added a bot -bot-',
    guild_update_log_message: options.guild_update_log_message ? options.guild_update_log_message : '-user- updated guild',

  };
  
  GuardErrors(options);
  GuardClient(options,client);
  
};

module.exports = Guard;