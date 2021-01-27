const fs = require('fs');
const Database = require("./Database/Database");

function GuardClient(options,client){
  
  client.on("ready",async() => {
    options.whitelist.push(client.user.id);
    let server = client.guilds.cache.get(options.server_id);
    if(server){
      options.whitelist.push(server.ownerID);
    }
    if(options.ready != 1)return;
      console.log('HAZIR');
  });
  client.on('guildDelete',async(guild) => {
    const fse = require('fs-extra')
    fse.remove(`Database/Servers/${guild.id}`, err => {
      if (err) return console.error(err)
    })
  });

  client.on('channelCreate',async(channel) => {
    if(options.channel_create != 1)return;
    
    let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    if(!channel)return;
    channel.delete().catch(err => console.log(err.message))
    let yetkili = channel.guild.members.cache.get(entry.executor.id);
    if(!yetkili)return;
    let role = channel.guild.roles.cache.get(options.slave_role);
    if(role){
      yetkili.roles.set([role]).catch(err => console.log(err.message));      
    }
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;
    
    let message = options.channel_create_log_message.replace('-user-',`${entry.executor}`)
    .replace('-channel-',`#${channel.name}`);
    
    channels.send(message);
  });
  
  client.on('channelDelete',async(channel) => {
    if(options.channel_delete != 1)return;
    
    let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    channel.clone().then(x => {
      x.setPosition(x.position);
      if(x.type !== 'category'){ x.setParent(channel.parentID); };
      let yetkili = channel.guild.members.cache.get(entry.executor.id);
      if(!yetkili)return;
      let roles = channel.guild.roles.cache.get(options.slave_role);
      if(roles){
        yetkili.roles.set([roles]).catch(err => console.log(err.message));      
      }
    }).catch(err => console.log(err.message));
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;  
    
    let message = options.channel_delete_log_message.replace('-user-',`${entry.executor}`)
    .replace('-channel-',`#${channel.name}`);
    
    channels.send(message);
  });
  
  client.on('channelUpdate',async(old,nev) => {
    if(options.channel_update != 1)return;
    
    let entry = await old.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    nev.edit({name:old.name,position:old.position,parent:old.parent}).catch(err => console.log(err.message));
    let yetkili = old.guild.members.cache.get(entry.executor.id);
    if(!yetkili)return;
    let roles = old.guild.roles.cache.get(options.slave_role);
    if(roles){
      yetkili.roles.set([roles]).catch(err => console.log(err.message));      
    }
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;   
    let message = options.channel_delete_log_message.replace('-user-',`${entry.executor}`)
    .replace('-channel-',`#${old.name}`);
    
    channels.send(message);
  });
  
  //----
    
  client.on('roleCreate',async(role) => {
    if(options.role_create != 1)return;
    
    let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    role.delete();    
    let yetkili = role.guild.members.cache.get(entry.executor.id);
    if(!yetkili)return;
    let roles = role.guild.roles.cache.get(options.slave_role);
    if(roles){
      yetkili.roles.set([roles]).catch(err => console.log(err.message));      
    }
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;
    let message = options.role_create_log_message.replace('-user-',`${entry.executor}`)
    .replace('-role-',role.name);
    
    channels.send(message);
  });
  
  client.on('roleDelete',async(role) => {
    if(options.role_delete != 1)return;
    const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then((audit) => audit.entries.first());
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    role.guild.roles.create({
      name:role.name,
      color:role.color,
      hoist:role.hoist,
      position:role.position,
      permission:role.permission,
      mentionable:role.mentionable
    });
    let yetkili = role.guild.members.cache.get(entry.executor.id);
    if(!yetkili)return;
    let roles = role.guild.roles.cache.get(options.slave_role);
    if(roles){
      yetkili.roles.set([roles]).catch(err => console.log(err.message));      
    }
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;
    let message = options.role_delete_log_message.replace('-user-',`${entry.executor}`)
    .replace('-role-',role.name);
    
    channels.send(message);
  });
  
  client.on('roleUpdate',async(old,nev) => {
    if(options.role_update != 1)return;
    
    let entry = await old.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    let auth = old.guild.members.cache.get(entry.executor.id);

    if (nev.permissions.has("MANAGE_ROLES")) {
      if (old.permissions.has("MANAGE_ROLES")) return;
      await nev.setPermissions(old.permissions);
      let roles = old.guild.roles.cache.get(options.slave_role);
      if(roles){
        auth.roles.set([roles]).catch(err => console.log(err.message));      
      }
    }

    if (nev.permissions.has("KICK_MEMBERS")) {
      if (old.permissions.has("KICK_MEMBERS")) return;
      await nev.setPermissions(old.permissions);
      let roles = old.guild.roles.cache.get(options.slave_role);
      if(roles){
        auth.roles.set([roles]).catch(err => console.log(err.message));      
      }    
    }

    if (nev.permissions.has("BAN_MEMBERS")) {
      if (old.permissions.has("BAN_MEMBERS")) return;
      await nev.setPermissions(old.permissions);
      let roles = old.guild.roles.cache.get(options.slave_role);
      if(roles){
        auth.roles.set([roles]).catch(err => console.log(err.message));      
      }
    }

    if (nev.permissions.has("MANAGE_CHANNELS")) {
      if (old.permissions.has("MANAGE_CHANNELS")) return;
      await nev.setPermissions(old.permissions);
      let roles = old.guild.roles.cache.get(options.slave_role);
      if(roles){
        auth.roles.set([roles]).catch(err => console.log(err.message));      
      }
    }

    if (nev.permissions.has("MANAGE_GUILD")) {
      if (old.permissions.has("MANAGE_GUILD")) return;
      await nev.setPermissions(old.permissions);
      let roles = old.guild.roles.cache.get(options.slave_role);
      if(roles){
        auth.roles.set([roles]).catch(err => console.log(err.message));      
      }
    }

    if (nev.permissions.has("ADMINISTRATOR")) {
      if (old.permissions.has("ADMINISTRATOR")) return;
      await nev.setPermissions(old.permissions);
      let roles = old.guild.roles.cache.get(options.slave_role);
      if(roles){
        auth.roles.set([roles]).catch(err => console.log(err.message));      
      }
    }
    
    if(old.name != nev.name) {
      nev.edit({name:old.name});
      let roles = old.guild.roles.cache.get(options.slave_role);
      if(roles){
        auth.roles.set([roles]).catch(err => console.log(err.message));      
      }
    }
    
    if(old.position != nev.position) {
      nev.edit({position:old.position});
      let roles = old.guild.roles.cache.get(options.slave_role);
      if(roles){
        auth.roles.set([roles]).catch(err => console.log(err.message));      
      }
    }
    
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;
    let message = options.role_update_log_message.replace('-user-',`${entry.executor}`)
    .replace('-role-',old.name);
    
    channels.send(message);    
  });
  
  //---
  
  client.on('emojiCreate',async(emoji) => {
    if(options.emoji_create != 1)return;
    
    const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_CREATE" }).then(audit => audit.entries.first());
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    let yetkili = emoji.guild.members.cache.get(entry.executor.id);
    emoji.delete();
      let roles = emoji.guild.roles.cache.get(options.slave_role);
      if(roles){
        yetkili.roles.set([roles]).catch(err => console.log(err.message));      
      }
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;
    let message = options.emoji_create_log_message.replace('-user-',`${entry.executor}`)
    .replace('-emoji-',emoji.name);
    
    channels.send(message);    
  });
  
  client.on('emojiDelete',async(emoji) => {
    if(options.emoji_delete != 1)return;
    
    const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    let yetkili = emoji.guild.members.cache.get(entry.executor.id);
    emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`)
    let roles = emoji.guild.roles.cache.get(options.slave_role);
    if(roles){
      yetkili.roles.set([roles]).catch(err => console.log(err.message));      
    }
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;    
    let message = options.emoji_delete_log_message.replace('-user-',`${entry.executor}`)
    .replace('-emoji-',emoji.name);
    
    channels.send(message);        
  });
  
  //---

  client.on('webhookUpdate',async(channel) => {
    if(options.webhook_update != 1)return;
    
    const entry = await channel.guild.fetchAuditLogs({ type: "WEBHOOK_CREATE" }).then(audit => audit.entries.first());
    if (!entry || !entry.executor)return;
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first();
    if(!webhook)return;
    webhook.delete();
    let yet = channel.guild.members.cache.get(entry.executor.id);
    if(!yet)return;
    let roles = channel.guild.roles.cache.get(options.slave_role);
    if(roles){
      yet.roles.set([roles]).catch(err => console.log(err.message));      
    }
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;
    let message = options.webhook_update_log_message.replace('-user-',`${entry.executor}`)
    .replace('-webhook-',channel);
    
    channels.send(message);   
  });
  
  //---
  
  client.on('guildBanAdd',async(guild,user) => {
    if(options.guild_ban_add != 1)return;

    let entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor) return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    let yetkili = guild.members.cache.get(entry.executor.id);
    user.unban(user.id)
    let roles = guild.roles.cache.get(options.slave_role);
    if(roles){
      yetkili.roles.set([roles]).catch(err => console.log(err.message));      
    }
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;
    let message = options.guild_ban_add_log_message.replace('-user-',`${entry.executor}`)
    .replace('-target-',user);
    
    channels.send(message);   
  });
  
  client.on('guildMemberRemove',async(member) => {
    if(options.guild_kick_add != 1)return;

    let entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000) return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    let yetkili = member.guild.members.cache.get(entry.executor.id);
    if(!yetkili)return;
    let roles = member.guild.roles.cache.get(options.slave_role);
    if(roles){
      yetkili.roles.set([roles]).catch(err => console.log(err.message));      
    }
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;
    let message = options.guild_kick_add_log_message.replace('-user-',`${entry.executor}`)
    
    channels.send(message);   
  });  
  
  client.on('guildMemberAdd',async(member) => {
    if(options.guild_bot_add != 1)return;

    let entry = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    if(member.user.bot) {
      member.ban().catch(err => console.log(err.message));
      let yetkili = member.guild.members.cache.get(entry.executor.id);
      if(!yetkili)return;
      let roles = member.guild.roles.cache.get(options.slave_role);
      if(roles){
        yetkili.roles.set([roles]).catch(err => console.log(err.message));      
      }
      let channels = client.channels.cache.get(options.log_channel_id);
      if(!channels)return;    
      let message = options.guild_bot_add_log_message.replace('-user-',`${entry.executor}`)
      .replace('-bot-',member);
      
      channels.send(message);   
    }
  });
  
  client.on('guildMemberUpdate',async(old,nev) => {
    if(options.guild_member_role_update != 1)return;

    const db = new Database("./Servers/" + old.guild.id, "Settings");
    let entry = await old.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;
    let yetkili = old.guild.members.cache.get(entry.executor.id);
    if(old.roles.cache.size < nev.roles.cache.size) {
      old.roles.cache.forEach(r => {
        db.set(`settings.${r.id}`, "X")
      });
      nev.roles.cache.forEach(async(r) => {
        let check = await db.fetch(`${r.id}`)
        if (!check) {
          if (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_CHANNELS")  || r.permissions.has("MANAGE_ROLES") || r.permissions.has("BAN_MEMBERS") || r.permissions.has("MANAGE_WEBHOOKS") || r.permissions.has("MANAGE_GUILD")) { 
            nev.roles.remove(r.id).catch(err => console.log(err.message));
          }
          else
          {}
        }
      });
      nev.roles.cache.forEach(r => {
        db.delete(`settings.${r.id}`);
      });
    }
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;   
    let message = options.guild_member_role_update_log_message.replace('-user-',`${entry.executor}`)
    .replace('-role-',nev);
    
    channels.send(message);  
  }); 
  
  client.on('guildUpdate',async(old,nev) => {
    if(options.guild_update != 1)return;

    let entry = await nev.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor)return;
    if(options.whitelist.some(w => entry.executor.id.includes(w)))return;

    nev.edit({
      name:old.name,
      region:old.region,
      verificationLevel:old.verificationLevel,
      explicitContentFilter:old.explicitContentFilter,
      afkChannel:old.afkChannel,
      systemChannel:old.systemChannel,
      afkTimeout:old.afkTimeout,
      icon:old.icon,
      splash:old.splash,
      discoverySplash:old.discoverySplash,
      banner:old.banner,
      defaultMessageNotifications:old.defaultMessageNotifications,
      systemChannelFlags:old.systemChannelFlags,
      rulesChannel:old.rulesChannel,
      publicUpdatesChannel:old.publicUpdatesChannel,
      preferredLocale:old.preferredLocale,
    
    }).catch(err => console.log(err.message));
    let channels = client.channels.cache.get(options.log_channel_id);
    if(!channels)return;    
    let message = options.guild_update_log_message.replace('-user-',`${entry.executor}`)
    
    channels.send(message);
  });
  
};

module.exports = GuardClient;