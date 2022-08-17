const { SlashCommandBuilder } = require("@discordjs/builders");
const { removeWord } = require("../../util/json-logger");
const pathToData = __dirname + "/../../data/words.json";
const { createBasicEmbed } = require("../../Handlers/embedHandeler");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("removeword")
    .setDescription("remove a word from the list")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription(
          "put index numbers here for the ones you want to remove"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const input = interaction.options.getString("input");
    await removeWord(pathToData, input);
    interaction.reply(createBasicEmbed("Removed Word:", `index: ${input}`));
  },
};
