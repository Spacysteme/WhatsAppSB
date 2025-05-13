// commands/hug.js
module.exports = {
    name: 'hug',
    execute(message, args) {
      const hugs = [
        'https://tenor.com/bVKMK.gif',
        'https://tenor.com/dbVSClh2OVI.gif',
        'https://tenor.com/bUwEv.gif',
        'https://tenor.com/h20S2J9RQBR.gif',
        'https://tenor.com/fEt4cKFd6tJ.gif'
      ];
  
      const randomHug = hugs[Math.floor(Math.random() * hugs.length)];
      message.reply(`🤗 *Gros câlin !* ${randomHug}`);
    }
  };
  