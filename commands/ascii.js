// commands/ascii.js
const figlet = require('figlet');  // Assure-toi d'avoir installé "figlet" via npm

module.exports = {
  name: 'ascii',
  description: 'Transforme un texte en ASCII Art',
  async execute(message, args, rl, client, selectedChat) {
    const text = args.join(' ') || 'Hello, World!';  // Utilise l'argument ou un texte par défaut

    // Crée l'ASCII art à partir du texte
    figlet(text, (err, data) => {
      if (err) {
        console.log('❌ Erreur lors de la création du ASCII art');
        message.reply('❌ Une erreur est survenue lors de la création de l\'ASCII art.');
      } else {
        // Affiche l'ASCII art dans le terminal
        console.log('Voici ton ASCII Art :\n');
        console.log(data);

        // Envoie l'ASCII art dans le chat
        message.reply(`Voici ton ASCII Art !\n\`\`\`\n${data}\n\`\`\``);
      }
    });
  }
};
