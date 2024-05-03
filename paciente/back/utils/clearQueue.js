const amqp = require('amqplib');

async function clearQueue() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const QUEUE_NAME = 'protocol_created';

    // Limpar a fila
    await channel.purgeQueue(QUEUE_NAME);
    console.log(`Queue ${QUEUE_NAME} cleared.`);

    await channel.close();
    await connection.close();
}

clearQueue().catch(console.error);