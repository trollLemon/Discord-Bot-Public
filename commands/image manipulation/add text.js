const { SlashCommandBuilder } = require("@discordjs/builders");
const Canvas = require("canvas");
const fs = require("fs");
const sizeOf = require("image-size");
const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch-commonjs"); //same thing as node fetch but its a commonjs module so we dont need to convert every require statement into an import lol
const { deleteImage } = require("../../util/imageTool");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("addcaption")
    .setDescription("add a caption to an image somewhere")
    .addStringOption((Option) =>
      Option.setName("image").setDescription("link").setRequired(true)
    )
    .addStringOption((Option) =>
      Option.setName("text").setDescription("the caption").setRequired(true)
    )
    .addIntegerOption((Option) =>
      Option.setName("size")
        .setDescription("The font size (in px)")
        .setRequired(true)
    )
    .addStringOption((Option) =>
      Option.setName("location")
        .setDescription("where to put the image")
        .addChoice("top left", "top left")
        .addChoice("top right", "top right")
        .addChoice("top middle", "top middle")
        .addChoice("left", "left")
        .addChoice("right", "right")
        .addChoice("middle", "middle")
        .addChoice("bottom left", "bottom left")
        .addChoice("bottom middle", "bottom middle")
        .addChoice("bottom right", "bottom right")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const link = interaction.options.getString("image");
    const choice = interaction.options.getString("location");
    const text = interaction.options.getString("text");
    const size = interaction.options.getInteger("size");
    //get the image before doing anything else, then continue with the command
    fetch(link).then((image) =>
      image.body.pipe(
        fs
          .createWriteStream(`./data/image.png`)
          .once("close", async () => {
            let dimensions;
            //try to get the dimensions of the image, if it errors back out of the command and let the user know
            try {
              dimensions = sizeOf("./data/image.png"); //get dimenstions
            } catch (error) {
              interaction.editReply(
                "That either isnt an image link or something weird happened"
              );
              deleteImage("./data/image.png"); //delete the image since its probably corrupted
              return;
            }

            const canvas = Canvas.createCanvas(
              dimensions.width,
              dimensions.height
            );
            const context = canvas.getContext("2d");

            const background = await Canvas.loadImage(`./data/image.png`);
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            //now decide where to put the text and what font size
            switch (choice) {
              case "top left":
                write(
                  context,
                  text,
                  size,
                  dimensions.width * 0.01,
                  dimensions.height * 0.1
                );
                break;
              case "top middle":
                write(
                  context,
                  text,
                  size,
                  dimensions.width * 0.5 - text.length,
                  dimensions.height * 0.1
                );
                break;
              case "top right":
                write(
                  context,
                  text,
                  size,
                  dimensions.width * 0.8,
                  dimensions.height * 0.1
                );
                break;
              case "left":
                write(
                  context,
                  text,
                  size,
                  dimensions.width * 0.1,
                  dimensions.height * 0.5
                );
                break;
              case "middle":
                write(
                  context,
                  text,
                  size,
                  dimensions.width * 0.5 - text.length,
                  dimensions.height * 0.5
                );
                break;
              case "right":
                write(
                  context,
                  text,
                  size,
                  dimensions.width * 0.8,
                  dimensions.height * 0.5
                );
                break;
              case "bottom left":
                write(
                  context,
                  text,
                  size,
                  dimensions.width * 0.1,
                  dimensions.height * 0.8
                );
                break;
              case "bottom middle":
                write(
                  context,
                  text,
                  size,
                  dimensions.width * 0.5 - text.length,
                  dimensions.height * 0.8
                );
                break;
              case "bottom right":
                write(
                  context,
                  text,
                  size,
                  dimensions.width * 0.8,
                  dimensions.height * 0.8
                );
                break;

              default:
                interaction.editReply("Error with the image");
                break;
            }

            //create the new image to send
            const attachment = new MessageAttachment(
              canvas.toBuffer(),
              `finalImage.png`
            );

            await interaction.editReply({ files: [attachment] });

            deleteImage("./data/image.png"); // we dont need the image anymore so we can delete it
          })
          .on("error", (err) => {
            console.log(err);
            interaction.editReply("Something went wrong");
          })
      )
    );
  },
};

/**
 *
 * @param {2d context} context
 * @param {String} text
 * @param {number} x
 * @param {number} y
 */
function write(context, text, fontSize, x, y) {
  context.font = `${fontSize}px Times New Roman`;
  context.fillStyle = "#ffffff";
  context.fillText(text, x, y);
}
