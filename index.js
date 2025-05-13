const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const client = new Client({
  authStrategy: new LocalAuth()
});

let qrData = null;

client.on('qr', qr => {
  qrData = qr;
  qrcode.generate(qr, { small: true });
  console.log('📱 Scanne le QR code avec WhatsApp');
});

client.on('ready', () => {
  console.log('✅ Connecté à WhatsApp !');
  mainMenu();
});

function mainMenu() {
  console.log('\n🌸 Menu Principal :');
  console.log('1. Messages privés');
  console.log('2. Groupes');
  console.log('3. Compte');
  console.log('4. Exit');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\n👉 Choisis une option (1-4) : ', async (choice) => {
    rl.close();
    switch (choice) {
      case '1':
        await showChatMenu(false); // DMs
        break;
      case '2':
        await showChatMenu(true); // Groupes
        break;
      case '3':
        return showAccountOptions();
      case '4':
        console.log('👋 Bye bye !');
        process.exit();
      default:
        console.log('❌ Option invalide.');
        mainMenu();
    }
  });
}

function showAccountOptions() {
  console.log('\n⚙️ Compte :');
  console.log('- reset : Supprimer la session et forcer un nouveau QR code');
  console.log('- qrcode : Réafficher le QR code actuel');
  console.log('- back : Retour au menu principal');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\n> ', async (input) => {
    const cmd = input.trim().toLowerCase();
    rl.close();

    if (cmd === 'reset') {
      const sessionPath = path.join(__dirname, '.wwebjs_auth');
      if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, { recursive: true, force: true });
        console.log('🔁 Session supprimée. Relance le bot pour générer un nouveau QR code.');
        process.exit();
      } else {
        console.log('❌ Aucune session trouvée.');
        showAccountOptions();
      }
    } else if (cmd === 'qrcode') {
      if (qrData) {
        qrcode.generate(qrData, { small: true });
        showAccountOptions();
      } else {
        console.log('❌ Aucun QR code disponible actuellement.');
        showAccountOptions();
      }
    } else if (cmd === 'back') {
      mainMenu();
    } else {
      console.log('❌ Commande invalide.');
      showAccountOptions();
    }
  });
}

async function showChatMenu(isGroup) {
  const chats = await client.getChats();
  const filteredChats = chats.filter(chat => chat.isGroup === isGroup);
  const sortedChats = filteredChats.sort((a, b) => b.timestamp - a.timestamp);

  if (sortedChats.length === 0) {
    console.log(isGroup ? '❌ Aucun groupe trouvé.' : '❌ Aucun message privé trouvé.');
    return mainMenu();
  }

  console.log(`\n📋 ${isGroup ? 'Groupes' : 'Messages privés'} récents :`);
  sortedChats.forEach((chat, index) => {
    console.log(`${index + 1}. ${chat.name || chat.formattedTitle || chat.id.user}`);
  });

  const backIndex = sortedChats.length + 1;
  console.log(`${backIndex}. 🔙 Retour au menu principal`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\n👉 Choisis un chat (numéro) : ', async (num) => {
    rl.close();
    const selectedIndex = parseInt(num);

    if (isNaN(selectedIndex) || selectedIndex < 1 || selectedIndex > backIndex) {
      console.log('❌ Chat invalide.');
      return showChatMenu(isGroup);
    }

    if (selectedIndex === backIndex) {
      console.log('🔙 Retour au menu principal...');
      return mainMenu();
    }

    const selectedChat = sortedChats[selectedIndex - 1];
    const availableCommands = ["kiss", "hug", "8ball", "ping", "ascii"];
    if (selectedChat.isGroup) {
      availableCommands.push("lovecalc", "user-info");
    }

    console.log(`\n🎯 Tape une commande (${availableCommands.map(c => `"${c}"`).join(', ')}, "exit") :`);
    const rl2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl2.question('> ', async (cmdName) => {
      if (cmdName === 'exit') {
        console.log('👋 Retour au menu principal !');
        rl2.close();
        return mainMenu();
      }

      if (!availableCommands.includes(cmdName)) {
        console.log('❌ Commande invalide pour ce chat.');
        rl2.close();
        return showChatMenu(isGroup);
      }

      try {
        const cmdPath = path.join(__dirname, 'commands', `${cmdName}.js`);
        const command = require(cmdPath);

        if (command.execute) {
          const fakeMessage = {
            from: 'Terminal',
            reply: (msg) => {
              client.sendMessage(selectedChat.id._serialized, msg);
              console.log(`✅ Message envoyé à ${selectedChat.name || selectedChat.formattedTitle}`);
              setTimeout(() => {
                rl2.close();
                showChatMenu(isGroup);
              }, 3000);
            }
          };

          await command.execute(fakeMessage, [], rl2, client, selectedChat);
        } else {
          console.log('❌ Ce fichier ne contient pas de fonction execute.');
          rl2.close();
          showChatMenu(isGroup);
        }
      } catch (err) {
        console.log(`❌ Impossible de charger la commande "${cmdName}"`);
        console.error(err.message);
        rl2.close();
        showChatMenu(isGroup);
      }
    });
  });
}

client.initialize();
