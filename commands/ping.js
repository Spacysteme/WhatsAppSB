module.exports = {
  name: 'ping',
  async execute(message, args, rl, client, chat) {
    const start = Date.now();
    await client.sendMessage(chat.id._serialized, 'Ping!');
    const latency = Date.now() - start;
    message.reply(`🏓 Pong! ${latency}ms`);
  }
};
