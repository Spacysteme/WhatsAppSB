// commands/ascii.js
const figlet = require('figlet'); // npm install figlet

module.exports = {
  name: 'ascii',
  description: 'Transforme un texte en ASCII Art',
  async execute(message, args, rl, client, selectedChat) {
    const inputText = args.join(' ');

    // Si aucun texte fourni
    if (!inputText) {
      return message.reply('❗ Tu dois me donner un texte à transformer en ASCII !\nExemple : `ascii Hello world`');
    }

    // Crée l'ASCII art à partir du texte
    figlet(inputText, (err, data) => {
      if (err || !data) {
        console.error('Erreur figlet:', err);
        return message.reply('❌ Une erreur est survenue lors de la génération du texte ASCII.');
      }

      // Vérifie que l'art ASCII n’est pas trop long pour WhatsApp (~4000 caractères max)
      if (data.length > 3900) {
        return message.reply('⚠️ Ton texte est trop long pour être affiché en ASCII dans WhatsApp. Essaye avec quelque chose de plus court.');
      }

      // Envoie l'ASCII art dans le chat
      message.reply(`🖼️ Voici ton ASCII Art !\n\`\`\`\n${data}\n\`\`\``);
    });
  }
};
