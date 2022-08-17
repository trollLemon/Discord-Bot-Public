const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("explains what the commands do"),

  async execute(interaction) {
    const reply = new MessageEmbed()
      .setColor(
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
      ) //random hex generator
      .setTitle("What The Commands Do")
      .addFields(
        {
          name: "Youtube player",
          value:
            "**play**: plays a youtube video from given search terms or a link\n " +
            "**leave**: makes the bot leave\n" +
            "**skip**: skips to next youtube video in the queue; when the queue is empty the bot leaves \n" +
            "**currentvideo**: Shows the current video the bot is playing if it is playing something\n" +
            "**loop**: Loops current video that the bot is playing\n" +
            "**viewqueue**: preview the next 5 items for the video player to play\n" +
            "**shuffle**: Shuffles the video players queue\n",
        },

        {
          name: "Random Videos",
          value:
            "**random-play**: grabs 5 random terms from a list you can add too (or remove things from), and searches a youtube video with the terms\n" +
            "**addword**: adds what ever you enter as input to a list of stuff the bot has\n" +
            "**removeword**: removes a term based on an index you give. Each term has a number assined to it, you can see what that number is by doing ***showwords***\n" +
            "**showvocab**: lists all the stuff the bot can use for the random youtube command. Here you can see the terms and the index for each\n",
        },

        {
          name: "Image Maniplulation",
          value:
            "**addcaption**: Add a caption to an image. Get a link to an image\n" +
            "(by copying the link to an image in the discord or getting one off the internet or something), then put the text you want, the font size, and what area to put the text in\n" +
            "**nukeimage**: Nukes image quality. Get the image the same way you do for the addcaption command\n",
        },

        {
          name: "Misc commands",
          value:
            "**randomdeathgrips**: sends a random lyric from Deathgrips songs \n",
        }
      )
      .setFooter(
        "If you have any recomondations for new commands or issues with current ones, message the bot people"
      );

    interaction.reply({ embeds: [reply] });
  },
};
