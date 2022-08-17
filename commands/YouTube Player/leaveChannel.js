//required functions/files
const { SlashCommandBuilder } = require("@discordjs/builders");
const { getQueue } = require("../../util/queue");
const { createBasicEmbed } = require("../../Handlers/embedHandeler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("leaves the vc"),

  async execute(interaction) {
    //get the connection (if it exists)
    const channel = interaction.member.voice.channel;
    if (!channel) {
      interaction.reply("you need to be in a vc to use this command");
    } else {
      const queue = getQueue(interaction.guild.id);
      if (!queue) {
        interaction.reply("im not in a vc");
      } else {
        interaction.reply("goodbye");
        queue.disconnect();
      }
    }
  },
};
