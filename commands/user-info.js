const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');

module.exports = {
  name: 'user-info',
  description: 'Affiche des infos sur un utilisateur (dans un groupe).',
  async execute(message, args, rl, client, chat) {
    if (!chat.isGroup) {
      message.reply('❌ Cette commande ne fonctionne que dans un groupe.');
      return;
    }

    const participants = chat.participants;
    console.log('\n👥 Membres du groupe :');
    for (let i = 0; i < participants.length; i++) {
      const contact = await client.getContactById(participants[i].id._serialized);
      console.log(`${i + 1}. ${contact.pushname || contact.number}`);
    }

    rl.question('\n👉 Choisis un membre (numéro) : ', async (num) => {
      const index = parseInt(num) - 1;
      const participant = participants[index];

      if (!participant) {
        console.log('❌ Numéro invalide.');
        rl.close();
        return;
      }

      const contact = await client.getContactById(participant.id._serialized);
      const profilePicUrl = await contact.getProfilePicUrl().catch(() => null);

      let infoMsg = `📄 Infos de l'utilisateur :\n`;
      infoMsg += `- Pseudo : ${contact.pushname || 'Non défini'}\n`;
      infoMsg += `- Numéro : ${contact.number}`;

      if (profilePicUrl) {
        try {
          const media = await MessageMedia.fromUrl(profilePicUrl);
          await client.sendMessage(chat.id._serialized, media, {
            caption: infoMsg
          });
        } catch (e) {
          console.log('❌ Erreur lors du téléchargement de la photo :', e.message);
          await message.reply(infoMsg + `\n\n(Photo non envoyée à cause d’une erreur)`);
        }
      } else {
        await message.reply(infoMsg + `\n\n(Pas de photo de profil trouvée)`);
      }

      // ⏳ Attente puis retour au menu
      setTimeout(() => {
        rl.close();
        const showChatMenu = require(path.join(__dirname, '..', 'index.js')).showChatMenu;
        showChatMenu(); // 👈 relance la liste des discussions
      }, 3000);
    });
  }
};
