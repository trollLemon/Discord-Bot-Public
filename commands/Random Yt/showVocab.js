const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { list } = require("../../util/json-logger");
const pathToData = __dirname + "/../../data/words.json";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("showwords")
    .setDescription("shows the list of words that will be picked"),

  async execute(interaction) {
    const reply = new MessageEmbed()
      .setColor(
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
      )
      .setTitle("List of words/random stuff I have")
      .setThumbnail("https://i.imgur.com/z1NMAbi.gif")
      .addFields({ name: "Stuff", value: list(pathToData) })
      .setFooter("Feel free to add more ");

    interaction.reply({ embeds: [reply] });
  },
};
