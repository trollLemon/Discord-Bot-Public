
//It should take in what ever text is passed in and create a message embed out of it
const { MessageEmbed } = require('discord.js');


module.exports = {

    createBasicEmbed(text, subText) {
        const reply = new MessageEmbed()
            .setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
            .addFields(
                { name: text, value: subText }
            );

        return ({ embeds: [reply] });
    },

    createCoolEmbed(title, text, subText, path) {
        const reply = new MessageEmbed()
            .setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
            .setTitle(title)
            .setImage(path)
            .addFields(
                { name: subText, value: text }
            );

        return ({ embeds: [reply] });
    }





};
