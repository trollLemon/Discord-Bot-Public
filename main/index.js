// Require the necessary discord.js classes
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  client.user.setActivity("Put something here", { type: "PLAYING" });
  console.log("Ready!");
});

client.commands = new Collection(); //collection of commands

//get a list ofdirectories:
const directoriesInDIrectory = fs
  .readdirSync("commands", { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((item) => item.name);

//dynamically send commands to the client (https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files)
for (const dir of directoriesInDIrectory) {
  const commandFiles = fs
    .readdirSync("./commands/" + dir)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require("../commands/" + dir + "/" + file);
    client.commands.set(command.data.name, command);
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});


// Login to Discord with your client's token
client.login(token);
