function errors(options) {
  
  if(typeof options.ready !== 'number'){
   console.error('Please enter value as a number and in "0, 1" format');
 } 
  if (typeof options.channel_create !== "number") {
   console.error('options.channel_create : Please enter value as a number and in "0, 1" format')
 }
  if(typeof options.channel_delete !== "number" ) {
   console.error('options.channel_delete : Please enter value as a number and in "0, 1" format')
 }
  if(typeof options.channel_update !== "number" ) {
   console.error('options.channel_update : Please enter value as a number and in "0, 1" format')
 }
  if (typeof options.role_create !== "number") {
   console.error('options.role_create : Please enter value as a number and in "0, 1" format')
 }
  if(typeof options.role_delete !== "number" ) {
   console.error('options.role_delete : Please enter value as a number and in "0, 1" format')
 }
  if(typeof options.role_update !== "number" ) {
   console.error('options.role_update : Please enter value as a number and in "0, 1" format')
 }
  if (typeof options.emoji_create !== "number") {
   console.error('options.emoji_create : Please enter value as a number and in "0, 1" format')
 }
  if(typeof options.emoji_delete !== "number" ) {
   console.error('options.emoji_delete : Please enter value as a number and in "0, 1" format')
 }
  if (typeof options.webhook_update !== "number") {
   console.error('options.webhook_update : Please enter value as a number and in "0, 1" format')
 }
  if (typeof options.guild_ban_add !== "number") {
   console.error('options.guild_ban_add : Please enter value as a number and in "0, 1" format')
 }
  if(typeof options.guild_kick_add !== "number" ) {
   console.error('options.guild_kick_add : Please enter value as a number and in "0, 1" format')
 }
  if(typeof options.guild_member_role_update !== "number" ) {
   console.error('options.guild_member_role_update : Please enter value as a number and in "0, 1" format')
 }
  if(typeof options.guild_bot_add !== "number" ) {
   console.error('options.guild_bot_add : Please enter value as a number and in "0, 1" format')
 }
  if(typeof options.guild_update !== "number" ) {
   console.error('options.guild_update : Please enter value as a number and in "0, 1" format')
 }
  if(typeof options.server_id !== "string") {
   console.error('options.server_id : Please enter an server id');
 }
  if(typeof options.log_channel_id !== "string") {
   console.error('options.log_channel_id : Please enter an channel id');
 }
  if(Array.isArray(options.whitelist) == false) {
   console.error('options.whitelist : The values entered are not in array format, please write as array.');
 }
  if(typeof options.ready !== "number") {
   console.error('options.ready : Please enter value as a number and in "0, 1" format.');
 }
  if(typeof options.channel_create_log_message !== "string"){
   console.error('options.channel_create_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.channel_delete_log_message !== "string"){
   console.error('options.channel_delete_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.channel_update_log_message !== "string"){
   console.error('options.channel_update_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.role_create_log_message !== "string"){
   console.error('options.role_create_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.role_delete_log_message !== "string"){
   console.error('options.role_delete_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.role_update_log_message !== "string"){
   console.error('options.role_update_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.emoji_create_log_message !== "string"){
   console.error('options.emoji_create_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.emoji_delete_log_message !== "string"){
   console.error('options.emoji_delete_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.webhook_update_log_message !== "string"){
   console.error('options.webhook_update_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.guild_ban_add_log_message !== "string"){
   console.error('options.guild_ban_add_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.guild_member_role_update_log_message !== "string"){
   console.error('options.guild_member_role_update_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.guild_kick_add_log_message !== "string"){
   console.error('options.guild_kick_add_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.guild_bot_add_log_message !== "string"){
   console.error('options.guild_bot_add_log_message : the entered value is not in string format, please write in string format.');
 }
  if(typeof options.guild_update_log_message !== "string"){
   console.error('options.guild_update_log_message : the entered value is not in string format, please write in string format.');
 }
  
};

module.exports = errors;