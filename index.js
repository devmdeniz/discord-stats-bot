const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();
const bot = new Discord.Client({disableEveryone: true});

bot.login(process.env.token);

// Log stats-bot in to the server and set status
bot.on("ready", async () => {
console.log(`${bot.user.username} has logged on.`)
bot.user.setActivity('Sunucuyu İzliyor', { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);

// Get our server
const guild = bot.guilds.get(''); //sunucu id si

// Get our stats channels
const totalUsers = bot.channels.get(''); // toplam kullanicilarin gosterilecegi kanal idsi
const onlineUsers = bot.channels.get(''); // online kullanicilarin gosterilecegi kanal idsi
const codeMonkeys = bot.channels.get(''); // adminlerin gosterilecegi kanal idsi

// Check every 30 seconds for changes
setInterval(function() {
  console.log('Güncelleniyor')

  client.on("ready", () => {
  client.channels.get("sesli kanal id'si").join();
})

  //Get actual counts
  var userCount = guild.memberCount;
  var onlineCount = guild.members.filter(m => m.presence.status === 'online').size
  var coderCount = guild.roles.get('800454230007480361').members.size; //admin rol id
  
  // Log counts for debugging
  console.log("Toplam Kullanıcılar: " + userCount);
  console.log("Açık Kullanıcılar: " + onlineCount);
  console.log("Yöneticiler: " + coderCount);

  // Set channel names
  totalUsers.setName("Toplam Kullanıcılar: " + userCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);

  onlineUsers.setName("Açık Kullanıcılar: " + onlineCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);

  codeMonkeys.setName("Yöneticiler: " + coderCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);
  }, 30000)

});

bot.on('message', async message => {
  if(message.author.bot) return;

  let prefix = config.prefix;
  let messageBody = message.content.split(" ");
  let command = messageBody[0];



});



