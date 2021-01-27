const Discord = require('discord.js');
const Guard = require('../server.js');
const client = new Discord.Client();

Guard({ 
    //1 active 0 deactive
    whitelist: ["344095732787052584"],
    server_id: "803972578121089055",
    log_channel_id: "803974621074423808",
    slave_role:"803976309583773737",
  
    channel_create: 1, //When a channel is create on the server, it deletes that channel
    channel_delete: 1, //If a channel is deleted on the server, it clone that channel
    channel_update: 1, //When a channel is edited on the server, it restores that channel
    
    role_create: 1, //When a role is create on the server, it deletes that role
    role_delete: 1, //If a role is deleted on the server, it clone that role
    role_update: 1, //When a role is edited on the server, it restores that role
    
    emoji_create: 1, //When created an emoji deletes that emoji
    emoji_delete: 1, //When an emoji is deleted it that emoji create
    
    webhook_update: 1, //When the webhook is created it deletes the webhook
    
    guild_ban_add: 1, 
    guild_kick_add: 1,
    guild_member_role_update: 1, //Prevents administrative roles from being given to a user
    guild_bot_add: 1, //prevents malicious bots from join the server
    guild_update: 1,
    
    channel_create_log_message: '-user- created -channel-', 
    channel_delete_log_message: '-user- deleted -channel-',
    channel_update_log_message: '-user- updated -channel-',
    
    role_create_log_message: '-user- created -role-',
    role_delete_log_message: '-user- deleted -role-',
    role_update_log_message: '-user- updated -role-',
    
    emoji_create_log_message: '-user- created -emoji-',
    emoji_delete_log_message: '-user- deleted -emoji-',
    
    webhook_update_log_message: '-user- updated -webhook-',

    guild_ban_add_log_message: '-user- banned -target-',
    guild_kick_add_log_message: '-user- kicked -target-',
    guild_member_role_update_log_message: '-user- given a role to user -role-',
    guild_bot_add_log_message: '-user- added a bot -bot-',
    guild_update_log_message: '-user- updated guild',
  
},client);

client.on("ready", () => console.log("Ready!"))
client.on('error',async(error) => console.log(error.message));


client.login("NzUyNjAzODc4NjYyMzQwNzMx.X1aC-w.I4pTah3HxBDzz8U8RcICpTW8ozk");