const { MessageEmbed } = require("discord.js");
const { getQueue } = require("../../util/queue");

const { SlashCommandBuilder } = require("@discordjs/builders");
const currentSong = require("./current-song");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("viewqueue")
    .setDescription("view the first 5 items in the queue"),

  async execute(interaction) {
    const firstFive = [];
    const size = 5;
    const queue = getQueue(interaction.guild.id);

    for (let i = 0; i < size; i++) {
      try {
        const title = queue.songs[i].title;
        const url = queue.songs[i].title;

        let song = {
          title: title,
          url: url,
        };
        firstFive.push(song);
      } catch (error) {
        let song = {
          title: "empty",
          url: "empty",
        };
        firstFive.push(song);
      }
    }

    const reply = new MessageEmbed()
      .setColor(
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
      )
      .setTitle("Up Next")
      .addFields(
        { name: firstFive[0].title, value: firstFive[0].url },
        { name: firstFive[1].title, value: firstFive[1].url },
        { name: firstFive[2].title, value: firstFive[2].url },
        { name: firstFive[3].title, value: firstFive[3].url },
        { name: firstFive[4].title, value: firstFive[4].url }
      );

    interaction.reply({ embeds: [reply] });
  },
};
