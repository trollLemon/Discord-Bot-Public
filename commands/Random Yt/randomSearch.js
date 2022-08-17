"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { fetchWords } = require("../../util/json-logger");
const pathToData = require("../../data/words.json");
const { joinVoiceChannel } = require("@discordjs/voice");
const { videoPlayer } = require("../../util/video-player");
const { Queue, getQueue } = require("../../util/queue");
const ytsr = require("ytsr");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-play")
    .setDescription(
      "play a random youtube video based on a random list of words"
    ),
  async execute(message) {
    await message.deferReply();
    const args = message.options.getString("input");
    const channel = message.member.voice.channel;
    if (!channel) {
      await message.reply("Bot needs to be in a vc to use this");
      return;
    }

    let song = { title: "", url: "" };

    const randomStuff = fetchWords(pathToData);

    //search with the serch terms
    const result = await ytsr(randomStuff);
    if (!result) {
      message.editReply("error getting video");
      return;
    }
    song.title = result.items[0].title;
    song.url = result.items[0].url;

    const serverQueue = getQueue(message.guild.id);
    if (!serverQueue) {
      const newQueue = new Queue(channel, message.channel, message.guild.id);
      newQueue.add(song);

      //join vc and start playing the song
      try {
        newQueue.connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: message.guild.id,
          adapterCreator: message.guild.voiceAdapterCreator,
          selfDeaf: false,
        });

        message.editReply(`Playing ${song.title} ${song.url}`);

        videoPlayer(message.guild.id, newQueue.songs[0], message);
        message.channel.send(`Random stuff used: ${randomStuff}`);
      } catch (error) {
        newQueue.clear();
        newQueue.disconnect();
        message.editReply(`there was an error joining`);
        console.log(error);
        song = null;
      }
    } else {
      message.channel.send(`Added ${song.title} to the queue ${song.url}`);
      message.channel.send(`Random stuff used: ${randomStuff}`);
      serverQueue.add(song);
    }
  },
};
