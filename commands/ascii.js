// commands/ascii.js
const figlet = require('figlet');
const readline = require('readline');

module.exports = {
  name: 'ascii',
  execute(message, args, rl) {
    rl.question('✏️ Quel texte veux-tu transformer en ASCII art ? ', (inputText) => {
      if (!inputText || inputText.trim().length === 0) {
        message.reply('❌ Tu dois entrer un texte valide.');
        rl.close();
        return;
      }

      figlet(inputText, (err, data) => {
        if (err) {
          console.log('❌ Erreur lors de la génération de l\'ASCII art');
          message.reply('❌ Une erreur est survenue pendant la génération.');
        } else {
          console.log('\n🖼️ ASCII Art généré :\n');
          console.log(data);
          message.reply(`\`\`\`\n${data}\n\`\`\``);
        }

        rl.close(); // On ferme le readline ici, comme dans la 8ball
      });
    });
  }
};
