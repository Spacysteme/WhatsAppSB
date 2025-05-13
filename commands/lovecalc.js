module.exports = {
  name: 'lovecalc',
  description: 'Calcule le taux d’amour entre deux personnes 💘',
  async execute(message, args, rl, client, selectedChat) {
    const participants = await selectedChat.participants || [];
    const contacts = await Promise.all(participants.map(p => client.getContactById(p.id._serialized)));

    console.log('\n💞 Liste des participants :');
    contacts.forEach((contact, index) => {
      const name = contact.pushname || contact.name || contact.number || 'Inconnu';
      console.log(`${index + 1}. ${name}`);
    });

    // Demande la 1re personne
    rl.question('\n🥰 Choisis la première personne (numéro) : ', (num1) => {
      rl.question('💘 Choisis la deuxième personne (numéro) : ', (num2) => {
        const p1 = contacts[parseInt(num1) - 1];
        const p2 = contacts[parseInt(num2) - 1];

        if (!p1 || !p2) {
          message.reply('❌ Numéros invalides. Essaie encore !');
          return;
        }

        const name1 = p1.pushname || p1.name || p1.number || 'Inconnu';
        const name2 = p2.pushname || p2.name || p2.number || 'Inconnu';
        const lovePercent = Math.floor(Math.random() * 101);
        let advice = '';

        if (lovePercent > 90) advice = "🔥 Âmes sœurs cosmiques ! 💍";
        else if (lovePercent > 70) advice = "💖 Très bonne alchimie !";
        else if (lovePercent > 50) advice = "😊 Il y a un petit quelque chose...";
        else if (lovePercent > 30) advice = "🤔 Peut mieux faire, mais qui sait ?";
        else advice = "💔 C'est mort, jcrois ? 😬";

        message.reply(
          `💘 *Love Match entre ${name1} et ${name2}* :\n` +
          `💞 Compatibilité : *${lovePercent}%*\n` +
          `💡 Conseil : "${advice}"`
        );
      });
    });
  }
};
