//required functions/files
const { SlashCommandBuilder } = require("@discordjs/builders");
const { videoPlayer } = require("../../util/video-player");
const { getQueue } = require("../../util/queue");
const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("skips current song, bot leaves if queue is finished"),

  async execute(interaction) {
    //get the connection (if it exists)
    const connection = getVoiceConnection(interaction.channel.guild.id);
    if (!connection) {
      await interaction.reply("you need to be in a vc to use this command");
      return;
    }

    const queue = getQueue(interaction.guild.id);
    if (!queue.connection) {
      interaction.reply("im not in a vc");
    } else {
      queue.next();
      if (queue.loopStatus === true) queue.loopToggle();

      interaction.reply("Skipped, going to next video");
      videoPlayer(interaction.guild.id, queue.songs[0], interaction);
    }
  },
};
