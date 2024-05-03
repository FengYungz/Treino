const amqp = require('amqplib');
const ReceivedTrainingProtocol = require('../models/ReceivedTrainingProtocol');

function validateMessage(data) {
    if (!data.protocolId || !data.trainerId || !data.traineeId || !Array.isArray(data.exercises)) {
        throw new Error("Mensagem incompleta ou inválida.");
    }
}

exports.receiveProtocolCreatedMessage = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const QUEUE_NAME = 'protocol_created';

        await channel.assertQueue(QUEUE_NAME);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE_NAME);
        
        channel.consume(QUEUE_NAME, (msg) => {
            if (msg !== null) {
                try {
                    const protocolData = JSON.parse(msg.content.toString());
                    console.log("Received:", protocolData);
        
                    if (!protocolData.protocolId || !protocolData.trainerId || !protocolData.traineeId || !Array.isArray(protocolData.exercises)) {
                        throw new Error("Mensagem incompleta ou dados faltando.");
                    }
        
                    ReceivedTrainingProtocol.create({
                        protocolId: protocolData.protocolId,
                        trainerId: protocolData.trainerId,
                        traineeId: protocolData.traineeId,
                        exercises: protocolData.exercises,
                        createdAt: new Date()
                    }).then(() => {
                        console.log("Protocol saved successfully.");
                        channel.ack(msg);
                    }).catch((dbError) => {
                        console.error("Database save error:", dbError);
                        channel.nack(msg);
                    });
                } catch (error) {
                    console.error('Error processing message:', error);
                    channel.nack(msg);
                }
            }
        }, {
            noAck: false
        });        
    } catch (error) {
        console.error(error);
    }
};

// controllers/receivedTrainingProtocolController.js

exports.getAllReceivedTrainingProtocols = async (req, res) => {
    try {
        const protocols = await ReceivedTrainingProtocol.find({});
        res.status(200).json(protocols);
    } catch (error) {
        console.error("Error fetching training protocols:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};