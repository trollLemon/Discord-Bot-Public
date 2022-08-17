const { SlashCommandBuilder } = require("@discordjs/builders");
const Canvas = require("canvas");
const fs = require("fs");
const sizeOf = require("image-size");
const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch-commonjs"); //same thing as node fetch but its a commonjs module so we dont need to convert every require statement into an import lol
const { deleteImage } = require("../../util/imageTool.js");
const sharp = require("sharp");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nukeimage")
    .setDescription(" make an image look like shite")
    .addStringOption((Option) =>
      Option.setName("image").setDescription("link").setRequired(true)
    )
    .addIntegerOption((Option) =>
      Option.setName("nukefactor")
        .setDescription("nuke the image")
        .addChoice("a little", 8)
        .addChoice("a decent amount", 5)
        .addChoice("a lot", 2)
        .addChoice("minecraft painting", 1)
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const scaleFactor = interaction.options.getInteger("nukefactor");

    const link = interaction.options.getString("image");

    const currentTime = Date.now(); //current date since 1/1/1970, we will have this included in the file names to ensure unique names

    fetch(link).then((image) =>
      image.body.pipe(
        fs
          .createWriteStream(`./data/image${currentTime}.png`)
          .once("close", async () => {
            let origonalDimensions;
            //try to get the dimensions of the image, if it errors back out of the command and let the user know
            try {
              origonalDimensions = sizeOf(`./data/image${currentTime}.png`); //get dimenstions
            } catch (error) {
              interaction.editReply(
                "That either isnt an image link or something weird happened"
              );
              deleteImage(`./data/image${currentTime}.png`);
              return;
            }

            //now we can begin rescaling the image
            await sharp(`./data/image${currentTime}.png`)
              .metadata()
              .then((origonalDimensions) =>
                sharp(`./data/image${currentTime}.png`)
                  .resize(
                    Math.trunc(origonalDimensions.width * (scaleFactor * 0.05)),
                    Math.trunc(origonalDimensions.height * (scaleFactor * 0.05))
                  )
                  .toFile(`./data/newImage${currentTime}.png`)
              );

            //after we have rescaled the image, make a canvas with the origonal dimensions and stretch the new image across it
            const canvas = Canvas.createCanvas(
              origonalDimensions.width,
              origonalDimensions.height
            );
            const context = canvas.getContext("2d");

            const background = await Canvas.loadImage(
              `./data/newImage${currentTime}.png`
            );
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            const attachment = new MessageAttachment(
              canvas.toBuffer(),
              `finalImage.png`
            );

            interaction.editReply({ files: [attachment] });
            // we dont need the images anymore, so we can delete them so we dont fill up the disk with images
            deleteImage(`./data/newImage${currentTime}.png`);
            deleteImage(`./data/image${currentTime}.png`);
          })
          .on("error", (err) => {
            console.log(err);
             interaction.editReply("Something went wrong");

            try {
              deleteImage(`./data/newImage${currentTime}.png`);
              deleteImage(`./data/image${currentTime}.png`);
            } catch (error) {
              console.log(error);
            }
          })
      )
    );
  },
};
