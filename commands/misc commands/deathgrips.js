

//get required json files
const lyrics = require('./deathgrips.json')//get the json file
const { SlashCommandBuilder } = require('@discordjs/builders');
const { createCoolEmbed } = require("../../Handlers/embedHandeler");

module.exports = {

	data: new SlashCommandBuilder()
		.setName('randomdeathgrips')
		.setDescription('Replies a random deathgrips lyric, stay noided'),

	async execute(interaction) {
		await interaction.reply(getRandomDeathGrips());
	}


};

//returns a random deathgrips lyric
const getRandomDeathGrips = () => {

	const limit = Object.keys(lyrics).length;//get length of the array in the json file

	let rng = Math.floor(Math.random() * limit);//get a random number
	//return lyrics[rng].text;//get a random lyric
	return createCoolEmbed("Random Death Grips", lyrics[rng].text, "lyric:", "https://cdn.discordapp.com/app-icons/887896958579122217/244c1d656f084be9f65f46ad0c27111e.png?size=256");
}
