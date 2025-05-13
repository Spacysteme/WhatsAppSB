module.exports = {
  name: 'kiss',
  execute(message, args) {
    console.log('Commande !kiss exécutée');
    const kisses = [
      'https://tenor.com/kDilXawkxX4.gif',
      'https://tenor.com/bN9pn.gif',
      'https://tenor.com/jRVsCzxMYlx.gif'
    ];
    const random = kisses[Math.floor(Math.random() * kisses.length)];
    const target = args.join(' ') || message.from;

    message.reply(`😘 *Bisous !* ${random}`);
  }
};
