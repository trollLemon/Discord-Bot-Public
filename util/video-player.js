"use strict";

const {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  StreamType,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const { getQueue } = require("./queue");
const ytdl = require("ytdl-core");

const videoPlayer = async (id, song, interaction) => {
  let songQueue = getQueue(interaction.guild.id);

  if (!song) {
    songQueue.disconnect();
    interaction.channel.send("queue finished");
  } else {
    const stream = ytdl(song.url, {
      filter: "audioonly",
      quality: "lowestaudio",
      dlChunckSize: 0,
      highWaterMark: 1 << 25,
    });
    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });
    const resource = createAudioResource(
      stream,
      { inlineVolume: true },
      { inputType: StreamType.Arbitrary }
    );
    resource.volume.setVolume(0.1);

    songQueue.connection.subscribe(player);
    songQueue.stream = stream;
    player.play(resource);

    player.on(AudioPlayerStatus.Idle, () => {
      if (!songQueue.loopStatus) songQueue.next();
      player.stop(true);
      videoPlayer(id, songQueue.songs[0], interaction);
    });

    player.on("error", (err) => {
      console.log(err);
      player.stop(true);
      interaction.channel.send("Opps, error: " + err);
      songQueue.disconnect();
    });
  }
};

module.exports = { videoPlayer };
