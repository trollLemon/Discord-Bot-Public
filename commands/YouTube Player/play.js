"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const ytdl = require("ytdl-core");
const { joinVoiceChannel } = require("@discordjs/voice");
const { videoPlayer } = require("../../util/video-player");
const { Queue, getQueue } = require("../../util/queue");
const ytsr = require("ytsr");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play something from youtube")
    .addStringOption((Option) =>
      Option.setName("input")
        .setDescription("search terms or link")
        .setRequired(true)
    ),

  async execute(message) {
    await message.deferReply();
    const args = message.options.getString("input");

    //check if user is in a vc
    if (!message.member.voice.channel) {
      await message.editReply("Join a vc first");
      return;
    }

    let song = { title: "", url: "" };

    //look at the given input to see if its search terms to search or if its a link
    if (ytdl.validateURL(args)) {
      const video = await ytdl.getInfo(args);
      song.title = video.videoDetails.title;
      song.url = video.videoDetails.video_url;
    } else {
      //search with the serch terms
      const result = await ytsr(args);
      if (!result) {
        message.editReply("error getting video");
        return;
      }
      song.title = result.items[0].title;
      song.url = result.items[0].url;
    }

    const serverQueue = getQueue(message.guild.id);
    const channel = message.member.voice.channel;
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
      } catch (error) {
        newQueue.clear();
        newQueue.disconnect();
        message.editReply(`there was an error joining`);
        console.log(error);
        song = null;
      }
    } else {
      serverQueue.add(song);
      message.editReply(`Added ${song.title} to the queue ${song.url}`);
    }
  },
};
