console.log('Booting up...');
const { joinVoiceChannel } = require('@discordjs/voice');
const Discord = require('discord.js');
const client = new Discord.Client({intents :[ 32767, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_VOICE_STATES]});
const VoiceClient = require("@discordjs/voice");
const {MessageButton, MessageActionRow, MessageEmbed, MessageSelectMenu, MessageAttachment, MessageCollector} = require('discord.js');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource, StreamType, generateDependencyReport, AudioPlayerStatus} = require('@discordjs/voice');
client.login('Your key here', readyDiscord())
const point = require('./points.json');
// Create the encoder.
// Specify 48kHz sampling rate and 2 channel size.
var request = require("request");1
const stock = require('./hello.json');
var name = [];
var id = [];
var nodemailer = require('nodemailer');
const { MessagePage } = require('twilio/lib/rest/api/v2010/account/message');
const { Console } = require('console');
const { parse } = require('path');
function readyDiscord() {
  console.log('Booted up successfully👌');
}

client.on('messageCreate', message => {
  console.log(message.content);
});



client.on('messageCreate', (message) => {
   if(message.author.bot){
   return;
  }
 if(message.content === 'ping') {
   message.channel.send('ping');
  }
});




//Mute and defean a random user in a voice channel
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "Mute" && message.member.roles.cache.some(role => role.name === 'FOAK')){
    const rand =  Math.floor(Math.random() * FindTotal(message.member.voice.channel) );
    //check if user is in voice channel and then randomly disconnects a user
    let results = [];
    console.log(rand);
    if(message.member.voice.channel){
      const voiceChannel = message.member.voice.channel;
      voiceChannel.members.forEach(member => {
        results.push(member.id);
      }); 
      voiceChannel.members.forEach(member => {
        if(results[rand] === member.id){
          message.channel.send("Shut up " + member.user.username);
          member.voice.setMute();
          member.voice.setDeaf();
        }
      });
    }
  }
}); //end of mute

//Find the voice channel of the user who sent the message and get everyones name and id that are in the same voice channel and store them in an array
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "Voice channel"){
    if(message.member.voice.channel){
      const voiceChannel = message.member.voice.channel;
      voiceChannel.members.forEach(member => {
        id.push(member.id);
        name.push(member.user.username);
      }
      );
      message.channel.send("People who are in the vc with you are: " + name);
      console.log(id);
      console.log(name);
    }
  }
});//end of voice channel

//function that prints the array of names and ids
function Print(name){
  var names = "";
  for(var i = 0; i < name.length; i++){
    names = names + name[i] + "  ,  ";
  }
  return names;
}
//disconnect a random user in a voice channel
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "rd" && point.system[FindUsername(message.member.user.username)].rd == true){
    const rand =  Math.floor(Math.random() * FindTotal(message.member.voice.channel) );
    //check if user is in voice channel and then randomly disconnects a user
    console.log(rand);
    var Results = [];
    if(message.member.voice.channel){
      const voiceChannel = message.member.voice.channel;
      voiceChannel.members.forEach(member => {
         Results.push(member.id);
      }); 
      console.log(Results[rand]);
      voiceChannel.members.forEach(member => {
        if(Results[rand] === member.id){
          member.voice.disconnect();
          message.channel.send("Goodbye " + member.user.username + ", you have been randomly disconnected");
        }
      });
    }
    point.system[FindUsername(message.member.user.username)].rd = false;
  }
  else if (message.content === "rd" && point.system[FindUsername(message.member.user.username)].rd == false){
    message.channel.send("You do not own a RD");
  }
}); //end of disconnect

//message.member.roles.cache.some(role => role.name === 'FOAK')
function FindTotal(id){
  if(id){
    const voiceChannel = id;
    var count = voiceChannel.members.size;
    return count;
  }
}

//Check what users are muted and disconnects them if they are muted
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "Muted"){
    if(message.member.voice.channel){
      const voiceChannel = message.member.voice.channel;
      voiceChannel.members.forEach(member => {
        if(member.voice.mute === true){
          message.channel.send(member.user.username + " is muted");
          member.voice.disconnect();
          message.channel.send(member.user.username + " Has been disconnected for being muted");
        }
        else
        {
          message.channel.send(member.user.username + " is not muted");
        }
      });
    }
  } 
}); //end of muted

//check the role of a user
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "Role"){
    if(message.member.voice.channel){
      const voiceChannel = message.member.voice.channel;
      voiceChannel.members.forEach(member => {
        if(member.roles.size > 0){
          message.channel.send(member.user.username + " has the following roles: " + member.roles.cache.some(role));
        }
        else
        {
          message.channel.send(member.user.username + " has no roles");
        }
      });
    }
  }
}); //end of role
var member = "";
var  golbal;
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  try{
  if(message.content.substring(0, 4) === "!ban"){
    var target = message.mentions.members.first();
    golbal = target;
    member = target.user.username;
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
            .setCustomId('ticket')
            .setPlaceholder('Do you want to ban ' +  member + '?')
            .addOptions([
                {
                    label: 'Ban',
                    description: 'Yes i do want to ban this user',
                    value: 'spgServer',
                    max_selections: 1
                },
                {
                    label: 'Dont Ban',
                    description: 'No i do not want to ban this user',
                    value: 'spgDev',
                    max_selections: 1
                },
            ])
      )
    message.channel.send({components: [row] })
  }
}
catch{
  message.channel.send("You need to mention a vaild user 📝");
}
});
var Bancount = 0;
var NotBancount = 0;
client.on('interactionCreate', (interaction) => {
  if(interaction.isSelectMenu()){
    if(interaction.customId === 'ticket'){
       const guild = interaction.guild;
       const People = guild.roles.cache.find(role => role.name == "FOAK");
       guild.members.fetch();
       var Member = People.members.size;
        if(interaction.values[0] === 'spgServer'){
          if(check(interaction.user.tag, ClickedForMenu)){
            interaction.channel.send(interaction.user.tag + ", You have already voted");
            return;
          }
          else{
            
            if(member === ""){
              interaction.channel.send("No user was mentioned");
              return;
            }
            else{
              ClickedForMenu.push(interaction.user.tag);
              if(Bancount >= Math.round((Member/2)-1) ){
                golbal.ban();
                interaction.channel.send( interaction.user.tag + " have banned " + member);
                member = "";
                Bancount = 0;
                NotBancount = 0;
                ClickedForMenu = []; //clear the array
              }
              else{
              Bancount++;
              interaction.channel.send( interaction.user.tag + ' has chosen to ban ' + member+ ". vote to ban is " + Bancount + " and vote to not ban is " + NotBancount + ". " + "[" + (Math.round((Member/2)) - Bancount) + " votes are needed to ban" + "]");
            }
          }
        }
      }
      else if(interaction.values[0] === 'spgDev'){
        if(check(interaction.user.tag, ClickedForMenu)){
          interaction.channel.send(interaction.user.tag + ", You have already voted");
          return;
        }
        else{
       
          if(member === ""){
            interaction.channel.send("No user was mentioned");
            return;
          }
          else{
          ClickedForMenu.push(interaction.user.tag);
          if(NotBancount >= Math.round((Member/2)-1) ){
          interaction.channel.send( member +" has not been banned " );
          member = "";
          Bancount = 0;
          NotBancount = 0;
          ClickedForMenu = []; //clear the array
          }
          else{
            NotBancount++;
            interaction.channel.send( interaction.user.tag + ' has chosen to not ban ' + member+ ". Vote to ban is " + Bancount + " and vote to not ban is " + NotBancount + ". " + "[" +(Math.round((Member/2)) - NotBancount) + " votes are needed to not ban" + "]");
          }
        } 
      }
    }
    } 
  } 
}); //end of ban

client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  try{
  if(message.content.substring(0, 7) === "!button"){
   const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("yes")
          .setLabel("FUCK BOB 😆") 
          .setStyle("DANGER"),
        new MessageButton()
          .setCustomId("no")
          .setLabel("DON'T FUCK BOB 😥")
          .setStyle("PRIMARY"),
      )
    message.channel.send({components: [row] })
  }
}
catch{
  message.channel.send("something wrong happened 😥");
}
});
var Clicked = [];
var ClickedForMenu = [];  
client.on('interactionCreate', (interaction) => {
  
//get the ther users id and name that clicked the button
  if(interaction.isButton()){
    if(interaction.customId === "yes"){
      if(check(interaction.user.tag, Clicked)){
        interaction.channel.send(interaction.user.tag + ", You have already clicked button");
        return;
      }
        Clicked.push(interaction.user.tag);
        console.log(Clicked);
        interaction.channel.send(interaction.user.tag + " has clicked the button");  
    
    }
  }
  if(interaction.isButton()){
    if(interaction.customId === "no"){
      if(check(interaction.user.tag, Clicked)){
        interaction.channel.send(interaction.user.tag + ", You have already clicked button");
        return;
      }
        Clicked.push(interaction.user.tag);
        console.log(Clicked);
        interaction.channel.send(interaction.user.tag + " has clicked the button");  
    
    }
  }
});

function check(name, array){
  if(array.includes(name)){
    return true;
  }
  else{
    return false;
  }
}



client.on('messageCreate', (message) => {
  try{
    if(message.author.bot){
      return;
    }
    if(message.content.substring(0, 7) === "!around" && message.author.id != '235545810706759681'){
      var member = message.mentions.members.first();
      if(!member.voice.channel){
        message.channel.send(member.user.tag + " is not in a voice channel");
        return;
      }
      let guild = message.guild;
      let vc = [];
      guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').forEach(channel => {
        vc.push(channel.id);
      });
      console.log(vc);
      count = 0;
      for(var i = 0; i < vc.length; i++){ 
        member.voice.setChannel(vc[i]);
      }
      member.voice.setChannel(message.member.voice.channel);
    }
  }
  catch{
      message.channel.send("something wrong happened 😥");
    }
});

client.on('messageCreate', (message) => {
  try{
    if(message.author.bot){
      return;
    }
    if(message.content.substring(0,7) === "!demote" ){
      if(!point.system[FindUsername(message.member.user.username)].Demote){
        message.reply("You dont own this command");
        return;
      }
      let target = message.mentions.members.first();
      target.roles.remove('984898132607377468');
      target.roles.add('984899755291332671');
      message.channel.send(target.user.tag + " has been demoted");
    } 
    else if(message.content.substring(0,8) === "!promote" && message.member.roles.cache.some(role => role.name === 'FOAK')){
      let target = message.mentions.members.first();
      target.roles.add('984898132607377468');
      message.channel.send(target.user.tag + " has been promoted");

    }
    else if(message.content.substring(0,8) === "!promote" || message.content.substring(0,7) === "!demote"  && message.member.roles.cache.some(role => role.name != 'FOAK')){
     message.channel.send("You do not have permission to use this command");
    }
  }
  catch{
    message.channel.send("something went wrong. Please try again 😥");
  }
});


//finds all the roles a person has
client.on('messageCreate', (message) => {
try{
    if(message.author.bot){
      return;
    }
    if(message.content.substring(0,6) === "!roles"){
      let member = message.mentions.members.first();
      let roles = member.roles.cache 
        .filter(role => role.name != '@everyone');
      let rolelist = "";
      roles.forEach(role => {
      
        rolelist +="[" + role.name + "]";
      }
      );
      //make a message embed to send
      const embed = new MessageEmbed()
        .setTitle(member.user.tag + " has the following roles")
        .setDescription(rolelist)
        .setColor("RANDOM")
        .setTimestamp();
      message.channel.send({ content: "Here is the results", embeds: [embed]})

    }
  }
  catch{
    message.channel.send("something went wrong 😥. Check your @mention");
  }
}); 
let change = false;
var Name = "";
var Guy = "";
//when a user types "!change", it will change the name of the user with the provided name
client.on('messageCreate', (message) => {
  try{
    if(message.author.bot){
      return;
    }

    if (message.content.substring(0,7) === "!change" && message.member.roles.cache.some(role => role.name === 'FOAK' && change === true)){
      Name = message.content.substring(8);
      Guy.setNickname(Name);
      message.channel.send(Guy.user.tag + " has been changed to " + "{ "+Name + " }");
      change = false;
    } 
    else if(message.content.substring(0,7) === "!change" && message.member.roles.cache.some(role => role.name === 'FOAK' && change === false)){
      Guy = message.mentions.members.first();
      change = true;
      message.channel.send("What would you like to change " + Guy.user.tag + "'s name to?");
    }
    else if(message.content.substring(0,7) === "!change" && message.member.roles.cache.some(role => role.name != 'FOAK') && (change === false || change === true)){
      message.channel.send("You do not have permission to use this command");
    }
  }
  catch{
    message.channel.send("something went wrong 😥, check your @mention");
  }
});

//send an email to the user
function email(subject, body){
  try{
    const fs = require('fs');
    let emails = fs.readFileSync('emails.txt', 'utf8');
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 25,
      secure: true, // use SSL
      auth: {
        user: "midyanelghazali2003@gmail.com",
        pass: "lpeisltzxlwhzskg"
      }
    });
    let mailOptions = {
      from: 'midyanelghazali2003@gmail.com', 
      to: emails , 
      subject: subject,
      text: body,
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  catch{
    console.log("something went wrong 😥");
  }
} 

client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
  const fs = require('fs');
  let time = require('./Time.json');
  let newUserChannel = newVoiceState.channel;
  let oldUserChannel = oldVoiceState.channel;
  if(newVoiceState.mute === true && oldVoiceState.mute === false && newVoiceState.deaf === false && newVoiceState.member.user.bot === false){
    let person = time.Time[FindUsernameForTime(newVoiceState.member.user.username)]
    person.TimeMuted = new Date().getTime();
    person['Total Mute Count']++;
    person.TotalMuteLifeTime++;
    fs.writeFileSync('Time.json', JSON.stringify(time, null, 2));
  }
  if(newVoiceState.mute === false && oldVoiceState.mute === true && newVoiceState.deaf === false && newVoiceState.member.user.bot === false){
    let person = time.Time[FindUsernameForTime(oldVoiceState.member.user.username)]
    let TimeNow = new Date().getTime();
    let TimeMuted = Math.floor((((TimeNow - person.TimeMuted)/1000)));
    console.log(TimeMuted);
    person.TimeMuted = 0;
    person['Total Mute Time'] += TimeMuted;
    console.log(person['Total Mute Time']);
    fs.writeFileSync('Time.json', JSON.stringify(time, null, 2));
  }
  if (oldUserChannel === null && newUserChannel !== null) {
    let id = FindUsernameForTime(newVoiceState.member.user.username);
    if(id !== -1){
      addUserForTime(newVoiceState.member.user.username);
      id = FindUsernameForTime(newVoiceState.member.user.username);
    }
    time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TimeEntered = new Date().getTime();
    fs.writeFileSync('Time.json', JSON.stringify(time, null, 2));
    console.log(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
    email("Discord notification for no awareness", `${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
    } else if (oldUserChannel !== null && newUserChannel === null && newVoiceState.member.user.bot === false) {
      let id = FindUsernameForTime(newVoiceState.member.user.username);
      if(id !== -1){
        addUserForTime(newVoiceState.member.user.username);
        id = FindUsernameForTime(newVoiceState.member.user.username);
      }
      if(time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TimeEntered === 0){
        return;
      }
      time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TimeLeft = new Date().getTime();
      let timeDiff = parseInt(time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TimeLeft) - parseInt(time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TimeEntered);
      console.log(time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TimeLeft)
      console.log(time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TimeEntered)
      let points = timeDiff / 1000 / 60;
      let MutedTime = parseInt((time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TotalMuteTime)/60);
      console.log(points  + " Minutes");
      console.log(timeDiff/1000 + " Seconds");
      let earned = Math.floor(points) - Math.floor(MutedTime);  
      point.system[FindUsernameForTime(newVoiceState.member.user.username)].points += earned;
      time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TotalLifeTime += Math.floor(points);
      client.channels.fetch("984904834455064616").then(channel => {
        const embed = new MessageEmbed()
          .setTitle(newVoiceState.member.nickname + " has left the " + oldVoiceState.channel.name + " Voice channel")
          .setAuthor(newVoiceState.member.user.tag, newVoiceState.member.user.avatarURL())
          .setThumbnail(newVoiceState.member.user.avatarURL())
          .setDescription("Life time spent in a Voice Channel: " + Math.floor(time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TotalLifeTime).toString() + " Minutes")
          .addFields(
            { name: "Time spent in the Voice channel: ", value: Math.floor(points) + " Minutes" },
            { name: "Time muted: ", value: Math.floor(MutedTime) + " Minutes" },
            { name: "Points earned: ", value: earned.toString() } ,
            { name: "Total points: ", value: point.system[FindUsernameForTime(newVoiceState.member.user.username)].points.toString() },
          )
          .setColor("RANDOM")
          .setImage('https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg')
          .setTimestamp();
        channel.send({ content: "Here is the results", embeds: [embed]})
      });
      time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TimeLeft = 0;
      time.Time[FindUsernameForTime(newVoiceState.member.user.username)].TimeEntered = 0;
      time.Time[FindUsernameForTime(newVoiceState.member.user.username)]['Total Mute Time'] = 0;
      time.Time[FindUsernameForTime(newVoiceState.member.user.username)]['Total Mute Count'] = 0;
      fs.writeFileSync('Time.json', JSON.stringify(time, null, 2));
      fs.writeFileSync('Points.json', JSON.stringify(point, null, 2));
      console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`)
      email("Discord notification for no awareness", `${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`);
    } else if (
      oldUserChannel !== null &&
      newUserChannel !== null &&
      oldUserChannel.id != newUserChannel.id
    ) {
      console.log( newVoiceState.member.nickname + " moved from " + oldUserChannel.name + " to " + newUserChannel.name);
   }
});

function addUserForTime(username){
  try{
    const fs = require('fs');
    let time = require('./Time.json');
    time.Time.push({
      "username": member.user.username,
      "TimeEntered": 0,
      "TimeLeft": 0,
      "TotalLifeTime": 0,
      "TimeMuted": 0,
      "TimeUnmuted": 0,
      "Total Mute Time": 0,
      "Total Unmute Time": 0,
      "Total Mute Count": 0,
      "TotalMuteLifeTime": 0,
    });
    fs.writeFileSync('Time.json', JSON.stringify(time, null, 2));
  }
  catch{
    console.log("something went wrong 😥");
  }
}
//make a txt file to store the users
client.on('messageCreate', (message) => {
  try{
    if(message.author.bot){
      return;
    }
    if(message.content.substring(0,6) === "!users"){
      const fs = require('fs')
      let users = "";
      client.guilds.cache.forEach(guild => {
        guild.members.cache.forEach(member => {
          users += member.user.tag + "\n";
        });
      });
      fs.writeFileSync('users.txt', users);
      message.channel.send("Users have been saved to users.txt");
    }
  }
  catch{
    message.channel.send("something went wrong 😥");
  }
});

//read from the txt file
client.on('messageCreate', (message) => {
  try{
    if(message.author.bot){
      return;
    }
    if(message.content.substring(0,5) === "!read"){
      const fs = require('fs')
      let users = fs.readFileSync('users.txt', 'utf8');
      message.channel.send(users);
    }
  }
  catch{
    message.channel.send("something went wrong 😥");
  }
}); 

//store the users in a json file
client.on('messageCreate', (message) => {
  try{
    if(message.author.bot){
      return;
    }
    if(message.content.substring(0,6) === "!json"){
      const fs = require('fs')
      let users = "";
      client.guilds.cache.forEach(guild => {
        guild.members.cache.forEach(member => {
          users += member.user.tag + "\n";
        });
      });
      fs.writeFileSync('users.json', users);
      message.channel.send("Users have been saved to users.json");
    }
  }
  catch{
    message.channel.send("something went wrong 😥");
  }
}); 

//verify if email is valid
client.on('messageCreate', (message) => {
  try{
    if(message.author.bot){
      return;
    }
    if(message.content.substring(0,6) === "!email" && message.member.roles.cache.some(role => role.name === 'FOAK')){
      let email = message.content.substring(7);
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(CheckIfEmailInList(email)){
        message.channel.send("Email is already in the list");
        return;
      }
      if(re.test(String(email).toLowerCase())){
        message.channel.send("Email is valid and has been submitted");
        StoreEmail(email);
      }
      else{
        message.channel.send("Email is invalid");
      }
    }
  }
  catch{
    message.channel.send("something went wrong 😥");
  }
});

function StoreEmail(email){
  try{
    const fs = require('fs')
    let emails = fs.readFileSync('emails.txt', 'utf8');
    emails += email + ",";
    fs.writeFileSync('emails.txt', emails);
  }
  catch{
    console.log("something went wrong 😥");
  }
}


function CheckIfEmailInList(email){
  try{
    const fs = require('fs')
    let emails = fs.readFileSync('emails.txt', 'utf8');
    if(emails.includes(email)){
      return true;
    }
    else{
      return false;
    }
  }
  catch{
    console.log("something went wrong 😥");
  }
}

//deletes an email from the list
client.on('messageCreate', (message) => {
  try{
    if(message.author.bot){
      return;
    }
    if(message.content.substring(0,7) === "!delete" && message.member.roles.cache.some(role => role.name === 'FOAK')){
      let email = message.content.substring(8);
      if(!CheckIfEmailInList(email)){
        message.channel.send("Email is not in the list");
        return;
      }
      DeleteEmail(email);
      message.channel.send("Email has been deleted");
    }
  }
  catch{
    message.channel.send("something went wrong 😥");
  }
}); 

function DeleteEmail(email){
  try{
    const fs = require('fs')
    let emails = fs.readFileSync('emails.txt', 'utf8');
    emails = emails.replace(email + ",", "");
    fs.writeFileSync('emails.txt', emails);
  }
  catch{
    console.log("something went wrong 😥");
  }
}

client.on ('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content.substring(0,8) === "!Destroy" && message.author.id === "725512363532353628") {
    message.channel.send("I am being destroyed");
    client.destroy();
  }
});

client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content.substring(0,4) === "!dis" && message.member.roles.cache.some(role => role.name === 'FOAK') && message.author.id != '235545810706759681' ){
    let channel = message.member.voice.channel;
    if(channel == null){  
      message.channel.send("You are not in a voice channel");
      return;
    }
    channel.members.cache.forEach(member => {
        member.voice.disconnect();
    });
  }
});  

client.on('messageCreate', (message) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  const fs = require('fs');
  let chat = fs.readFileSync('chat.txt', 'utf8');
  chat += "[" + today + "] " + Date() +"\n" +  "{In Channel: "+ message.channel.name +"}  User: " + message.member.user.username + "            Chat|" + message.content +"|" +"\n\n\n";
  fs.writeFileSync('chat.txt', chat);
}); 

client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content.substring(0,4) === "!rep"){
    const fs = require('fs');
    let point = require('./points.json');
    client.guilds.cache.forEach(guild => {
      guild.members.cache.forEach(member => {
        if(!member.user.bot){
          point.system.push ({
            "username": member.user.username,
            "points": 0,
            "ban" : false,
            "rd" : false,
            "Muted" : false,
            "Demote" : false,
            "Promote" : false,
            "Coupon" : false,
            "OpenTrade" : false,
            "Stocks" : 0,
            "GambleLost" : 0,
            "GambleWon" : 0,
            "Trade" : [
              {
                "username": "",
                "points": 0,
                "ban" : false,
                "rd" : false,
                "Muted" : false,
                "Coupon" : false,
              }
            ],
            "Bought" : []
          });
        }
      });
    });
    fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
  }
});

client.on('messageCreate', (message) => {

  if(message.author.bot){
    return;
  }
  if(message.content === "!rep"){
    return;
  }
  if(checker(message.content)){
    return;
  }
  const point = require('./points.json');
  const fs = require('fs');
  let id = FindUsername(message.member.user.username);
  if(id == - 1){
   addUser(message.member.user.username);
   id = FindUsername(message.member.user.username);
  } 
  console.log(id);
  point.system[id].points += 5;
  if(point.system[id].points % 100 == 0){
    message.channel.send("You have reached " + point.system[id].points + " points!");
  } 
  fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
});
//save the points to the json file


function FindUsername(username){
  const fs = require('fs');
  let point = require('./points.json');
  let user = null;
  for(let i = 0; i < point.system.length; i++){
    if(point.system[i].username == username){
      user = i;
    }
    else if(i == point.system.length - 1 && user == null){
      return -1;
    }
  }
  return user;
}


//allow the user to buy ban with points
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!buy ban"){
    const fs = require('fs');
    let point = require('./points.json');
    let id = FindUsername(message.member.user.username);
    if(id == - 1){
      addUser(message.member.user.username);
      id = FindUsername(message.member.user.username);
    } 
    if(point.system[id].ban == true){
      message.channel.send("You already have a ban!");
      return;
    }
    if(point.system[id].points < 10000){
      message.channel.send("You do not have enough points to buy a ban!. You need 10000 points to buy a ban" + "("+ message.member.user.username+ ": "  + point.system[id].points + " points)");
      return;
    }
    point.system[id].points -= 10000;
    point.system[id].ban = true;
    fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
    message.channel.send("You have bought a ban!");
  }
});

//all a user to buy a "rd" with  500 points
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!buy rd"){
    const fs = require('fs');
    let point = require('./points.json');
    let id = FindUsername(message.member.user.username);
    if(id == - 1){
      addUser(message.member.user.username);
      id = FindUsername(message.member.user.username);
    }  
    if(point.system[id].rd == true){
      message.channel.send("You already have a rd!");
      return;
    }
    if(point.system[id].points < 500){
      message.channel.send("You do not have enough points to buy a rd!. You need 500 points to buy a rd" + "("+ message.member.user.username+ ": "  + point.system[id].points + " points)");
      return;
    }
    point.system[id].points -= 500;
    point.system[id].rd = true;
    fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
    message.channel.send("You have bought a rd!");
  }
});

//allows a user to buy a Muted with 100 points
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!buy Muted"){
    const fs = require('fs');
    let point = require('./points.json'); 
    let id = FindUsername(message.member.user.username);
    if(id == - 1){
     addUser(message.member.user.username);
     id = FindUsername(message.member.user.username);
    }
    if(point.system[id].Muted == true){
      message.channel.send("You already have a Muted!");
      return;
    }
    if(point.system[id].points < 100){
      message.channel.send("You do not have enough points to buy a Muted!. You need 100 points to buy a Muted" + "("+ message.member.user.username+ ": "  + point.system[id].points + " points)");
      return;
    }
    point.system[id].points -= 100;
    point.system[id].Muted = true;
    fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
    message.channel.send("You have bought a Muted!");
  }
}); 



//shows all the buyable items to the user in a message Embed
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!shop"){
    const fs = require('fs');
    let point = require('./points.json'); 
    let id = FindUsername(message.member.user.username); 
    if(id == - 1){
      addUser(message.member.user.username);
      id = FindUsername(message.member.user.username);
    }
    let embed = new Discord.MessageEmbed()
    .setTitle("Buyable items")
    .setDescription("Items in shop:")
    .setAuthor(message.member.user.username, message.member.user.avatarURL())
    .addFields(
      {name: "Ban", value: "You can buy a ban for 1000 points 🔨", inline : true},
      {name: "RD", value: "You can buy a rd for 500 points 🦵" , inline : true},
      {name: "Muted", value: "You can buy a Muted for 100 points 🎙️" , inline : true},
      {name: message.member.nickname ||  "None" , value: "You have " + point.system[FindUsername(message.member.user.username)].points + " points" , inline : true},
    )
    .setImage('https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg')
    .setColor("RANDOM")
    .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
});

client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!buy demote"){
    const fs = require('fs');
    let point = require('./points.json');
    let id = FindUsername(message.member.user.username);
    if(id == - 1){
      addUser(message.member.user.username);
      id = FindUsername(message.member.user.username);
    }
    if(point.system[id].demote == true){
      message.channel.send("You already have a demote!");
      return;
    }
    if(point.system[id].points < 1000){
      message.channel.send("You do not have enough points to buy a demote!. You need 1000 points to buy a demote" + "("+ message.member.user.username+ ": "  + point.system[id].points + " points)");
    } else {
      point.system[id].points -= 1000;
      point.system[id].demote = true;
      fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
      message.channel.send("You have bought a demote!");
    }
  }
});
//tax a user everyhour with 10 points
setInterval(() => {
  const fs = require('fs');
  let point = require('./points.json');
  let tax = .1;
  for(let i = 0; i < point.system.length; i++){
    if(point.system[i].points > 0){ 
      point.system[i].points -= Math.floor(point.system[i].points * tax);
      point.Bank.money += Math.floor(point.system[i].points * tax);
    }
  }
  fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
}
, 1000 * 60 * 60 );//every hour

//Displays the points of a user in a message embed
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!points"){
    const fs = require('fs');
    let point = require('./points.json');
    let id = FindUsername(message.member.user.username);
    if(id == - 1){
      addUser(message.member.user.username);
      id = FindUsername(message.member.user.username);
    }
    let embed = new Discord.MessageEmbed()
    .setTitle(message.member.nickname || message.member.user.username)
    .setAuthor(message.member.user.username, message.member.user.avatarURL())
    .addFields(
      {name: "Points", value: + point.system[id].points + " Points (Tax is 10% every hour)" },
    )
    .setImage('https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg')
    .setColor("RANDOM")
    .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }
});

function addUser(username){
  const fs = require('fs');
  let point = require('./points.json');
  point.system.push ({
    "username": member.user.username,
    "points": 0,
    "ban" : false,
    "rd" : false,
    "Muted" : false,
    "Coupon" : false,
    "Bought" : []
  });
  fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
}

client.on('messageCreate', (message) => {
  try{
    if(message.author.bot){
        return;
      }
    if (message.content.substring(0, 5) === "!give"  && message.mentions.members.size > 0 && message.content.split(" ").length === 3){
      const fs = require('fs');
      let recipient = message.mentions.users.first();
      let raw = message.content.split(" ")[1];
      let amount =  Convert(raw);
      if(amount == -1){
        const wrong = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("You have to enter a number!")
        .setAuthor(message.member.user.username, message.member.user.avatarURL())
        .setImage('https://eldenring.wiki.fextralife.com')
        .setColor("RANDOM")
        .setTimestamp();
        message.channel.send({ embeds: [wrong] });
        return;
      }
      let id = FindUsername(message.member.user.username);
      if(id == - 1){
        addUser(message.member.user.username);
        id = FindUsername(message.member.user.username);
      }
      if(point.system[id].points < amount){
        message.channel.send("You do not have enough points to trade!");
        return;
      }
      point.system[id].points -= amount;
      point.system[FindUsername(recipient.username)].points += amount;
      fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
      const embed = new Discord.MessageEmbed()
      .setTitle("Trade")
      .setThumbnail(recipient.avatarURL())
      .setAuthor(message.member.user.username, message.member.user.avatarURL())
      .addFields(
        {name: "Recipient", value: recipient.username},
        {name: "Amount", value: amount + " Points"},
        {name: "Status", value: " Points have been sent to " + recipient.username},
        {name: "Sender", value: message.member.user.username, inline : true},
        {name: "Sender Points", value: point.system[id].points.toString() , inline : true},
        {name: "Recipient Points", value: point.system[FindUsername(recipient.username)].points.toString() , inline : true},
      )
      .setImage('https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg')
      .setColor("RANDOM")
      .setTimestamp();
      message.channel.send({ embeds: [embed] });
    }
 }
  catch(err){
    const error = new Discord.MessageEmbed()
    .setTitle("Trade failed")
    .setAuthor(message.member.user.username, message.member.user.avatarURL())
    .addField( "Error",  err.toString(), true)
    .setImage('https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg')
    .setColor("DANGER")
    .setTimestamp();
    message.channel.send({ embeds: [error] });
    console.log(err);
  }
});

function Convert(amount){
  let NewAmount = "";
  let count = 0;
  for(let i = 0; i < amount.length; i++){
    if(isNaN(amount[i])){
      count++;
    }
    else if(count === amount.length ){
      return -1;
    }
    else{
      NewAmount += amount[i];
    }
  }
  return parseInt(NewAmount);

}


//Displays all the users points in a message embed
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!allpoints"){
    const fs = require('fs');
    let point = require('./points.json');
    let embed = new Discord.MessageEmbed()
    .setTitle("All users points")
    .setAuthor(message.member.user.username, message.member.user.avatarURL())
    .setDescription("All users points:")
    .setImage('https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg')
    .setColor("RANDOM")
    .setTimestamp();
    for(let i = 0; i < point.system.length ; i++){
      embed.addFields(
        {name: point.system[i].username, value: point.system[i].points + " Points", inline : true},
      )
    }
    message.channel.send({ embeds: [embed] });
  }
});


client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content.substring(0,5) === "!time"){
    const fs = require('fs');
    let time = require('./Time.json');
    client.guilds.cache.forEach(guild => {
      guild.members.cache.forEach(member => {
        if(!member.user.bot){
          time.Time.push ({
            "username": member.user.username,
            "TimeEntered": 0,
            "TimeLeft": 0,
            "TotalLifeTime": 0,
            "TimeMuted": 0,
            "TimeUnmuted": 0,
            "Total Mute Time": 0,
            "Total Unmute Time": 0,
            "Total Mute Count": 0,
            "TotalMuteLifeTime": 0,
          });
        }
      });
    });
    fs.writeFileSync('Time.json', JSON.stringify(time, null , 2));
  }
});

function FindUsernameForTime(username){
  const fs = require('fs');
  let time = require('./Time.json');
  for(let i = 0; i < time.Time.length ; i++){
    if(time.Time[i].username === username){
      return i;
    }
  }
  return -1;
}

client.on('messageCreate', (message) => {
  if(message.author.bot){ 
    return;
  }
  if(message.content.substring(0,6) === "!trade"){
    if(message.mentions.users.size === 0){
      const wrong = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription("You have to mention a user!")
      .setAuthor(message.member.user.username, message.member.user.avatarURL())
      .setColor("RANDOM")
      .setTimestamp();
      message.channel.send({ embeds: [wrong] });
      return;
    }
    if(message.mentions.users.size > 1){
      const wrong = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription("You can only mention one user!")
      .setAuthor(message.member.user.username, message.member.user.avatarURL())
      .setColor("RANDOM")
      .setTimestamp();
      message.channel.send({ embeds: [wrong] });
      return;
    }
    let recipient = message.mentions.users.first();
    if(recipient.bot){
      const bot = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription("You can't trade with bots!")
      .setAuthor(message.member.user.username, message.member.user.avatarURL())
      .setColor("RANDOM")
      .setTimestamp();
      message.channel.send({ embeds: [bot] });
      return;
    }
    const fs = require('fs');
    let point = require('./points.json');
    let time = require('./Time.json');
    if(point.system[FindUsername(message.member.user.username)].OpenTrade === true){
      message.channel.send("You already have a trade open!");
      return;
    }
    let id = FindUsernameForTime(message.member.user.username);
    if(id == - 1){
      addUserForTime(message.member.user.username);
      id = FindUsernameForTime(message.member.user.username);
    }
    if(point.system[FindUsername(message.member.user.username)].OpenTrade === true){
      message.channel.send("That user already has a trade open!");
      return;
    }
    let items = ["Ban", "RD", "Muted"];
    items = items.map(item => {
      return item.toLowerCase();
    }); 
    const hello = new MessageActionRow()
    for(let i = 0; i < items.length ; i++){
      hello.addComponents(
        new MessageButton()
          .setCustomId(recipient.username +" " + message.member.user.username +" "+ items[i].toLowerCase() + " " + "trade")
          .setLabel(items[i]) 
          .setStyle("PRIMARY")
      )
    }
    hello.addComponents(
      new MessageButton()
        .setCustomId(recipient.username + " " + message.member.user.username + " " +  "finish")
        .setLabel("Finish")
        .setStyle("PRIMARY")
    )
    const initiate = new MessageActionRow()
    for(let j = 0; j < items.length ; j++){
      initiate.addComponents(
        new MessageButton()
          .setCustomId(recipient.username + " " + message.member.user.username + " " +  items[j].toLowerCase() + " " + "itaited")
          .setLabel("Yours " + items[j])
          .setStyle("DANGER")
      )
    }

    message.reply({
      content: "What do you want to trade?",
      components: [hello, initiate],
    }
    )
  }
  
});

client.on('interactionCreate', (interaction)  => {
  if(interaction.isButton() && interaction.customId.split(" ")[3] === "trade"){
    if(interaction.customId.split(" ")[1] != interaction.member.user.username){
      interaction.reply({
        content: "This is not your trade!",
        ephemeral: true,
      })
      return;
    }
    const fs = require('fs');
    let recipient = interaction.customId.split(" ")[0];
    if(point.system[FindUsername(recipient)].OpenTrade === false){
      point.system[FindUsername(recipient)].OpenTrade = true;
    }
    point.system[FindUsername(recipient)].Trade[0].username = interaction.customId.split(" ")[1];
    console.log(recipient);
    let what = interaction.customId.split(" ")[2];
    console.log(what);
    if(what === "ban"){
      if(point.system[FindUsername(recipient)].ban === false){
        interaction.reply({
          content: "Person you are trying to trade with does not have a ban ",
          ephemeral: true,
        })
        return;
      }
      if(point.system[FindUsername(recipient)].Trade[0].ban === true){
        interaction.reply({
          content: "You already demanded a ban",
          ephemeral: true,
        })
        return;
      }
      point.system[FindUsername(recipient)].Trade[0].ban = true;
      point.system[FindUsername(recipient)].Trade[0].username = interaction.member.user.username;
      interaction.reply({
        content: "You have demanded " + recipient+ " for a ban",
        ephemeral: true,
      })
      fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
      }
    if(what === "rd"){
      if(point.system[FindUsername(recipient)].rd === false){
        interaction.reply({
          content: "Person you are trying to trade with does not have a RD ",
          ephemeral: true,
        })
        return;
      }
      if(point.system[FindUsername(recipient)].Trade[1].rd === true){
        interaction.reply({
          content: "You already demanded a RD",
          ephemeral: true,
          })
        return;
      }
      interaction.reply({
        content: "You have demanded " + recipient + " for a RD",
        ephemeral: true,
      })
      point.system[FindUsername(recipient)].Trade[0].rd = true;
      point.system[FindUsername(recipient)].Trade[0].username = interaction.member.user.username;
      fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
      }
    if(what === "muted"){
      if(point.system[FindUsername(recipient)].Muted === false){
        interaction.reply({
          content: "Person you are trying to trade with does not have a muted ",
          ephemeral: true,
        })
        return;
      }
      if(point.system[FindUsername(recipient)].Trade[2].muted === true){
        interaction.reply({
          content: "You already demanded a muted",
          ephemeral: true,
        })
        return;
      }
      interaction.reply({
        content: "You have demanded " + recipient + " for a muted",
        ephemeral: true,
      })
      point.system[FindUsername(recipient)].Trade[0].Muted = true;
      point.system[FindUsername(recipient)].Trade[0].username = interaction.member.user.username;
      fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
      }
    }
  else if(interaction.isButton() && interaction.customId.split(" ")[2] === "finish"){
    if(interaction.member.user.username != interaction.customId.split(" ")[1]){
      interaction.reply({
        content: "This is not your trade!",
        ephemeral: true,
      })
      return;
    }
    let recipient = interaction.customId.split(" ")[0];
    let person = interaction.customId.split(" ")[1];
    if(point.system[FindUsername(recipient)].Trade[0].rd === false && point.system[FindUsername(recipient)].Trade[0].ban === false && point.system[FindUsername(recipient)].Trade[0].Muted === false && point.system[FindUsername(person)].Trade[0].rd === false && point.system[FindUsername(person)].Trade[0].ban === false && point.system[FindUsername(person)].Trade[0].Muted === false){
      const fs = require('fs');
      interaction.reply({
        content: "You did not demand anything",
        ephemeral: true,
      })
      point.system[FindUsername(recipient)].OpenTrade = false;
      point.system[FindUsername(recipient)].Trade = [{username: "", points: 0,ban: false, rd: false, Muted: false, Coupon: false }];
      point.system[FindUsername(interaction.customId.split(" ")[1])].OpenTrade = false;
      point.system[FindUsername(interaction.customId.split(" ")[1])].Trade = [{username: "", points: 0,ban: false, rd: false, Muted: false, Coupon: false }];
      interaction.message.delete();
      fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
      return;
    } 
    interaction.message.delete();
    point.system[FindUsername(interaction.member.user.username)].OpenTrade = true;
    point.system[FindUsername(recipient)].OpenTrade = true;
    const embed = new MessageEmbed()
      .setTitle("Trade")
      .setThumbnail("https://i.redd.it/f6xxq6zoo6w61.jpg")
      .setDescription("Trade with " + recipient)
      .addFields(
        { name: "Ban", value: bool(point.system[FindUsername(recipient)].Trade[0].ban) },
        { name: "RD", value: bool(point.system[FindUsername(recipient)].Trade[0].rd) },
      )
      .setColor("#0099ff")
      .setTimestamp()
      interaction.channel.send({
        embeds : [embed] })
    interaction.reply({
      content: "Trade finished, waiting for " + recipient + " to accept or decline",
      ephemeral: true,
    })
  }
  else if(interaction.isButton() && interaction.customId.split(" ")[3] === "itaited"){
    const fs = require('fs');
    if(interaction.member.user.username != interaction.customId.split(" ")[1]){
      interaction.reply({
        content: "This is not your trade!",
        ephemeral: true,
      })
      return;
    }
    let trade = interaction.customId.split(" ")[0]; 
    let recipient = interaction.customId.split(" ")[1];
    let what = interaction.customId.split(" ")[2];
    if(what === "ban"){
      if(point.system[FindUsername(recipient)].ban === false){
        interaction.reply({
          content: recipient + " does not have a ban",
          ephemeral: true,
        })
        return;
      }
      point.system[FindUsername(recipient)].Trade[0].ban = true;
      point.system[FindUsername(recipient)].Trade[0].username = trade;
      interaction.reply({
        content: "You are putting up a ban",
        ephemeral: true,
      })
      fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
      }
    if(what === "rd"){
      if(point.system[FindUsername(recipient)].rd === false){
        interaction.reply({
          content: recipient + " does not have a RD",
          ephemeral: true,
        })
        return;
      }
      point.system[FindUsername(recipient)].Trade[0].rd = true;
      point.system[FindUsername(recipient)].Trade[0].username = trade;
      interaction.reply({
        content: "You are putting up a RD",
        ephemeral: true,
      })
      fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
      }
    if(what === "muted"){
      if(point.system[FindUsername(recipient)].Muted === false){
        interaction.reply({
          content: recipient + " does not have a muted",
          ephemeral: true,
        })
        return;
      }
      point.system[FindUsername(recipient)].Trade[0].muted = true;
      point.system[FindUsername(recipient)].Trade[0].username = trade;
      interaction.reply({
        content: "You are putting up a muted",
        ephemeral: true,
      })
      fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
      }
    }
});

function bool(isTrue){
  if(isTrue){
    return "Up for trade";
  }
  else{
    return "Not up for trade";
  }
}

client.on('messageCreate', (message) => {
  try{
    if(message.author.bot){
      return;
    }
    if(message.content === "!Clean"){
      message.channel.bulkDelete(100).then(() => {
        message.channel.send("Deleted 100 messages.").then(msg => msg.delete(3000));
      });
    }
  }
  catch(err){
    console.log(err);
  }
});

client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!offer"){
  const point = require('./points.json');
  if(point.system[FindUsername(message.member.user.username)].OpenTrade === false){
    message.reply("You dont have a trade open");
    return;
  }
  let recipient = point.system[FindUsername(message.member.user.username)].Trade[0].username;
  console.log(point.system[FindUsername(message.member.user.username)].Trade[0].Muted)
  const embed = new MessageEmbed()
    .setTitle("Trades with " + recipient)
    .setThumbnail("https://i.redd.it/f6xxq6zoo6w61.jpg")
    .setDescription("Trade with " + recipient)
    .addFields(
      {name: "RD ", value: bool(point.system[FindUsername(message.member.user.username)].Trade[0].rd)},
      {name: "Muted ", value: bool(point.system[FindUsername(message.member.user.username)].Trade[0].Muted)},
      { name: "Ban ", value: bool(point.system[FindUsername(message.member.user.username)].Trade[0].ban) },
    )
    .setColor("RANDOM")
    .setImage("https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg")
    .setTimestamp()
    message.channel.send({embeds : [embed] })
  }
});

client.on('messageCreate', (message) => {
try{   
    if(message.author.bot){
      return;
    }
    if(message.content.substring(0,7) === "!gamble"){
      const fs = require('fs');
      let money = Convert(message.content.split(" ")[1]);
      let num = Convert(message.content.split(" ")[2]);
      let random = Math.floor(Math.random() * 6) + 1;
      let OldPoints = parseInt(point.system[FindUsername(message.member.user.username)].points);
      console.log(random);
      if(message.content.split(" ") > 2){
        message.reply("Too many arguments");
        return;
      }
      if(isNaN(message.content.split(" ")[1]) || isNaN(message.content.split(" ")[2])){
        message.reply("Please use numbers");
        return;
      } 
      if(message.mentions.users.size != 0){
        message.reply("You cannot gamble with a mention");
        return;
      }
      if(money > point.system[FindUsername(message.member.user.username)].points){
        message.reply("You dont have enough points to gamble that much");
        return;
      }
      if(money === -1){
        message.reply("You need to enter a number");
        return;
      }
      if(money === 0){
        message.reply("You need to enter a number greater than 0");
        return;
      }
      if(num === -1){
        message.reply("You need to enter a number");
        return;
      }
      if(num > 6 || num < 1){
        message.reply("You need to enter a number between 1 and 6");
        return;
      }
      setTimeout(function(){
        message.channel.send("Rolling...🎲");
      }, 1000);
      setTimeout(function(){
        message.channel.send("Rolling...🎲");
      }, 2000);
      setTimeout(function(){
        message.channel.send("Results in 📝 and you...");
      }, 3000);
      setTimeout(function(){
      if(num === random){
        point.Bank[0].Money += money;
        point.system[FindUsername(message.member.user.username)].points += money * 2;
        let current = parseInt(point.system[FindUsername(message.member.user.username)].points);
        let amount = money * 2;
        point.system[FindUsername(message.member.user.username)].GambleWon += money;
        const won = new MessageEmbed()
          .setTitle("WINNER")
          .setAuthor(message.member.user.username, message.member.user.avatarURL())
          .setThumbnail(message.member.user.avatarURL())
          .setDescription("You won " + amount.toString() + " points")
          .setFields(
            {name: "You won ", value: amount.toString() , inline: true},
            {name: "You now have ", value: current.toString() , inline: true},
            {name: "Your old balance ", value: OldPoints.toString() , inline: true},
          )
          .setColor("RANDOM")
          .setImage("https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg")
          .setTimestamp()
        message.channel.send({embeds : [won] });
        fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
        return;
      }
      else{
        point.Bank[0].Money += money;
        point.system[FindUsername(message.member.user.username)].points -= money;
        point.system[FindUsername(message.member.user.username)].GambleLost += money;
        let current = parseInt(point.system[FindUsername(message.member.user.username)].points);
        const lost = new MessageEmbed()
          .setTitle("LOST")
          .setAuthor(message.member.user.username, message.member.user.avatarURL())
          .setThumbnail(message.member.user.avatarURL())
          .setDescription("You lost " + money.toString() + " points")
          .setFields(
            {name: "Number ", value: random.toString() , inline: true},
            {name: "You lost ", value: money.toString() , inline: true},
            {name: "You now have ", value: current.toString() , inline: true},
            {name: "Your old balance ", value: OldPoints.toString() , inline: true},
          )
          .setColor("RANDOM")
          .setImage("https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg")
          .setTimestamp()
        message.channel.send({embeds : [lost] });
        fs.writeFileSync('points.json', JSON.stringify(point, null , 2));
        return;
      }
      }, 5000);
    }
  }
  catch(err){
    message.reply("Make sure you typed it correctly");
    console.log(err);
  }
});

client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!stats gamble"){
    const embed = new MessageEmbed()
      .setTitle(message.member.nickname + " Gamble Stats")
      .setAuthor(message.member.user.username, message.member.user.avatarURL())
      .setThumbnail(message.member.user.avatarURL())
      .setDescription("Lets see how its looking")
      .addFields(
        {name: "Won ", value: point.system[FindUsername(message.member.user.username)].GambleWon.toString() + " Points", inline: true},
        {name: "Lost ", value: point.system[FindUsername(message.member.user.username)].GambleLost.toString() + "  Points", inline: true},
      )
      .setColor("RANDOM")
      .setImage("https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg")
      .setTimestamp()
    message.channel.send({embeds : [embed] });
  }
});


function ConvertToString(num){
  let string = "";
  let word = "";
  for (let i = 0; i < num.length; i++) {
    if(num === 0){
      string = "0";
    }
    if(num === 1){
      string = "1";
    }
    if(num === 2){
      string = "2";
    }
    if(num === 3){
      string = "3";
    }
    if(num === 4){
      string = "4";
    }
    if(num === 5){
      string = "5";
    }
    if(num === 6){
      string = "6";
    }
    if(num === 7){
      string = "7";
    }
    if(num === 8){
      string = "8";
    }
    if(num === 9){
      string = "9";
    }
    word += string;
  } 
  console.log(word);
  return word; 
}

//Make a help command
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!help"){
    const embed = new MessageEmbed()
      .setTitle("Help")
      .setAuthor(message.member.user.username, message.member.user.avatarURL())
      .setThumbnail(message.member.user.avatarURL())
      .setDescription("Lets see how its looking")
      .addFields(
        {name: "!stats", value: "Shows your stats", inline: true},
        {name: "!points", value: "Shows your points", inline: true},
        {name: "!gamble", value: "Gamble your points", inline: true},
        {name: "!help", value: "Shows this message", inline: true},
        {name: "!allpoints", value: "Shows all users points", inline: true},
      )
      .setColor("RANDOM")
      .setImage("https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg")
      .setTimestamp()
    message.channel.send({embeds : [embed] });
  }
});

function checker(message){
  let array = ["!stats", "!points", "!gamble", "!help", "!allpoints", "!stats gamble"];
  for(let i = 0; i < array.length; i++){
    if(message.includes(array[i])){
      return true;
    }
  }
  return false;
}
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!loan"){
    let MaxLoan = point.system[FindUsername(message.member.user.username)].points * 2; 
    const embed = new Discord.MessageEmbed()
      .setTitle("Loan")
      .setAuthor(message.member.user.username, message.member.user.avatarURL())
      .setThumbnail(message.member.user.avatarURL())
      .setDescription("Lets see how its looking")
      .addFields(
        {name: "Money in the bank", value: "$" + point.Bank[0].Money.toString(), inline: true},
        {name: "Your points", value: point.system[FindUsername(message.member.user.username)].points.toString(), inline: true},
        {name: "Max Loan", value: MaxLoan.toString() , inline: true},
      )
      .setColor("RANDOM")
      .setImage("https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg")
      .setTimestamp()
    message.channel.send({embeds : [embed] });
  }
});
  
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!Close trade"){
    if(point.system[FindUsername(message.member.user.username)].OpenTrade === true){
      const fs = require('fs');
      let person = point.system[FindUsername(message.member.user.username)];
      let person2 = point.system[FindUsername(message.member.user.username)].Trade[0].username;
      person.OpenTrade = false;
      person2.OpenTrade = false;
      person.Trade = [{username: "", points: 0,ban: false, rd: false, Muted: false, Coupon: false }];
      person2.Trade = [{username: "", points: 0,ban: false, rd: false, Muted: false, Coupon: false }];
      fs.writeFileSync('./points.json', JSON.stringify(point, null, 2));
      message.channel.send("Trade closed");
    }
    else{
      message.channel.send("You are not in a trade");
    }
  }
});



//Yusufs code
client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "Yusufs" ){
    const embed = new MessageEmbed()
      .setTitle("Yusufs")
      .setAuthor(message.member.user.username, message.member.user.avatarURL())
      .setThumbnail(message.member.user.avatarURL())
      .setDescription("Checking if your a shoe")
      .addFields(
        {name: "RESULTS", value: "SHOES", inline: true},
        {name: "Doctor" , value: "Doc Yusuf", inline: true},
      )
      .setColor("RANDOM")
      .setImage("https://www.innersloth.com/wp-content/uploads/2021/12/genericconsole_blank.png")
      .setTimestamp()
    message.channel.send({embeds : [embed] });  
    const attachment = new Discord.MessageAttachment('https://m.media-amazon.com/images/I/513whefE9ZL.jpg');
    message.author.send({ files : [attachment] }); 
    message.author.send("Your a big baked potato");
    message.member.voice.disconnect();
    message.channel.send("Get kicked out loser");
  }
});

getStockPrice('AAPL');

async function getStockPrice(symbol) {
  var url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.API_KEY}`;
  return new Promise((resolve) => {
      request.get(
          {
              url: url,
              json: true,
              headers: { "User-Agent": "request" },
          },
          (err, res, body) => {
              if (err) {
                  console.log(err);
                  resolve(err);
              } else {
                  const fs = require('fs');
                  console.log(body['Global Quote']['05. price']);
                  let money = [];
                  money = body['Global Quote']['05. price'].split(".")
                  stock.Stock[0].Name = symbol;
                  stock.Stock[0].price = parseInt(money[0]);
                  fs.writeFileSync('hello.json', JSON.stringify(stock, null, 2));
                  resolve(body);
                  return  body;
              }
          }
      );
  });
}

client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content === "!stock"){
    try {
      getStockPrice("AAPL");
      let price = parseInt(stock.Stock[0].price)
      const embed = new Discord.MessageEmbed()
        .setTitle("*Stock*")
        .setAuthor(message.member.user.username, message.member.user.avatarURL())
        .setThumbnail(message.member.user.avatarURL())
        .setDescription("Stock price of LYNVIA")
        .addFields(
          {name: "Price", value: "$" +  price.toString(), inline: true},
          {name: "Change", value: stock['Global Quote']['09. change'], inline: true},
          {name: "Change %", value: stock['Global Quote']['10. change percent'], inline: true},
        )
        .setColor("RANDOM")
        .setImage("https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg")
        .setTimestamp()
      message.channel.send({embeds : [embed] });
    } catch (error) {
      message.channel.send(error);
    }
      
  }
});

client.on('messageCreate', (message) => {
  if(message.author.bot){
    return;
  }
  if(message.content.substring(0,10) === "!buy stock"){
    getStockPrice("AAPL");
    var KeyWords = message.content.split(" ");
    let amount = KeyWords[2];
    let total = amount * Math.floor(stock['Global Quote']['05. price']/10);
    if(KeyWords.length != 3){
      message.reply("Make sure you have the correct amount of stock and format it correctly (!buy stock <amount>)");
      return
    }
    if(isNaN(amount)){
      message.reply("Invalid amount");
      return;
    }
    if(amount < 1){
      message.reply("Cannot buy 0 stocks, are you stupid?");
      return;
    }
    if(point.system[FindUsername(message.member.user.username)].points < total){
      message.reply("You do not have enough points");
      return;
    }
    const fs = require('fs');
    let person = point.system[FindUsername(message.member.user.username)];
    person.points = person.points - total;
    person.stock = person.stock + amount;
    const stocks = new Discord.MessageEmbed()  
      .setTitle("Receipt")
      .setAuthor(message.member.user.username, message.member.user.avatarURL())
      .setThumbnail(message.member.user.avatarURL())
      .setDescription("Stock bought")
      .addFields(
        {name: "Amount", value: amount, inline: true},
        {name: "Price", value: "$" +  Math.floor(stock['Global Quote']['05. price']/10).toString(), inline: true},
        {name: "Total", value: "$" +  total.toString(), inline: true},
      )
      .setColor("RANDOM")
      .setImage("https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_npcs_elden_ring_wiki_600px.jpg")
      .setTimestamp()
    message.channel.send({embeds : [stocks] });
    fs.writeFileSync('./points.json', JSON.stringify(point, null, 2));
  }
});

function hello(){
  setInterval(function(){
    const fs = require('fs');
    fs.writeFileSync('./hello.json', JSON.stringify(stock, null, 2));
  }
  , 15000);
}
hello();
function pup(){
  const open = require('open');
  open('https://discordapp.com/oauth2/authorize?client_id=723180989842791424&scope=bot&permissions=8');
  //puppeteer to click on the login button and login
  const puppeteer = require('puppeteer');
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://discordapp.com/oauth2/authorize?client_id=723180989842791424&scope=bot&permissions=8');
    await page.click('#login-button');
    await page.waitForNavigation();
    await page.click('#email');
    await page.keyboard.type('username');
    await page.click('#password');
    await page.keyboard.type('password');
    await page.click('#login-button');
    await page.waitForNavigation();
    await browser.close();
  })();
}

//{name: "Ban", value: "You can buy a ban for 1000 points", inline : true},
//{name: "RD", value: "You can buy a rd for 500 points" , inline : true},
//{name: "Muted", value: "You can buy a Muted for 100 points" , inline : true},
//{name: message.member.user.username + "Points", value: "You have " + point.system[FindUsername(message.member.user.username)].points + " points" , inline : true},