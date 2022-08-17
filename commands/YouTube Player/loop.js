const { SlashCommandBuilder } = require("@discordjs/builders");
const { getQueue } = require("../../util/queue");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("loop current video playing"),

  async execute(interaction) {
    const channel = interaction.member.voice.channel;

    if (!channel) interaction.reply("Join a vc to use this command");
    else {
      const queue = getQueue(interaction.guild.id);

      if (!queue.currentSong) interaction.reply("No song to loop");
      else {
        queue.loopToggle();
        interaction.reply(`loop: ${queue.loopStatus}`);
      }
    }
  },
};
