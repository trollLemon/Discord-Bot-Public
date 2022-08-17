const { SlashCommandBuilder } = require("@discordjs/builders");
const { addWord } = require("../../util/json-logger");
const pathToData = __dirname + "/../../data/words.json";
const { createBasicEmbed } = require("../../Handlers/embedHandeler");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("addword")
    .setDescription("add a word to the list")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Add something the bot might search up")
        .setRequired(true)
    ),
  async execute(interaction) {
    const input = interaction.options.getString("input");
    await addWord(pathToData, input);
    interaction.reply(createBasicEmbed("Added word:", input));
  },
};
