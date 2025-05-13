const readline = require('readline');

module.exports = {
  name: '8ball',
  execute(message, args, rl) {
    rl.question('❓ Quelle est ta question ? ', (question) => {
      const responses = [
        'Oui.', 'Non.', 'Peut-être...', 'Demande plus tard.',
        'C’est certain !', 'Je ne pense pas...', 'Absolument.', 'Pas sûr du tout.', 'Oublie ça direct.', 'Hmm, compliqué à dire...'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const response = `🎱 *${question}*\n\n> ${randomResponse}`;

      message.reply(response);
      rl.close(); // On ferme le readline SEULEMENT ici !
    });
  }
};
