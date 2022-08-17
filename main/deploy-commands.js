const fs = require("fs");
const path = require("path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("../main/config.json");

const commands = [];

//get a list ofdirectories:
const directoriesInDIrectory = fs
  .readdirSync("commands", { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((item) => item.name);

for (const dir of directoriesInDIrectory) {
  const commandFiles = fs
    .readdirSync("./commands/" + dir)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require("../commands/" + dir + "/" + file);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
