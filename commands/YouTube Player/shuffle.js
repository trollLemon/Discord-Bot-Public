const { getQueue } = require("../../util/queue");
const { ArrayUtil } = require("../../util/ArrayUtil");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("shuffles the queue"),

  async execute(interaction) {
    const userConnection = interaction.member.voice.channel;
    const currentQueue = getQueue(interaction.guild.id);

    if (!userConnection) {
      interaction.reply("Join a vc first");
    } else {
      const currentQueueArray = currentQueue.songs;

      const shuffler = new ArrayUtil(currentQueueArray);
      shuffler.shuffle();
      currentQueue.songs = shuffler.target;

      interaction.reply("Shuffled!");
    }
  },
};
