const { SlashCommandBuilder } = require("@discordjs/builders");
const { getQueue } = require("../../util/queue");
const { createBasicEmbed } = require("../../Handlers/embedHandeler");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("currentvideo")
    .setDescription("list current video playing"),

  async execute(interaction) {
    const channel = interaction.member.voice.channel;

    if (!channel) interaction.reply("Join a vc to use this command");
    else {
      const queue = getQueue(interaction.guild.id);
      if (!queue.connection) {
        interaction.reply("im not in a vc");
      } else {
        const currentSong = getQueue(interaction.guild.id).currentSong;

        await interaction.reply(
          createBasicEmbed(
            "Currently playing: ",
            `${currentSong.title}, ${currentSong.url}`
          )
        );
      }
    }
  },
};
