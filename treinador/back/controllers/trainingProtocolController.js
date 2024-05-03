const TrainingProtocol = require('../models/TrainingProtocol');
const { generateTrainingProtocolPDF } = require('../utils/pdfGenerator');
const amqp = require('amqplib');

exports.getAllTrainingProtocols = async (req, res) => {
    try {
        const protocols = await TrainingProtocol.find();
        res.status(200).json(protocols);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createTrainingProtocol = async (req, res) => {
    try {
        const { trainerId, traineeId, exercises } = req.body;
        const newProtocol = new TrainingProtocol({
            trainerId,
            traineeId,
            exercises
        });
        const savedProtocol = await newProtocol.save();
        
        // Enviar mensagem para o RabbitMQ
        await sendProtocolCreatedMessage(savedProtocol._id, trainerId, traineeId, exercises);
        
        const pdfPath = generateTrainingProtocolPDF(savedProtocol);
        const pdfUrl = `http://localhost:3000/treinos/${savedProtocol._id}.pdf`;
    
        res.status(201).json({ protocol: savedProtocol, pdfPath: pdfPath, pdfUrl: pdfUrl });
    } catch (error) {
        res.status(500).json(error);
    }
};

async function sendProtocolCreatedMessage(protocolId, trainerId, traineeId, exercises) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        
        const QUEUE_NAME = 'protocol_created';
        await channel.assertQueue(QUEUE_NAME);
        
        // Enviar dados do protocolo e traineeId como uma única mensagem
        const message = JSON.stringify({ protocolId, trainerId, traineeId, exercises });
        await channel.sendToQueue(QUEUE_NAME, Buffer.from(message));

        console.log(" [x] Sent 'Protocol Created'");
        
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error(error);
    }
}

exports.getTrainingProtocolById = async (req, res) => {
    try {
        const protocol = await TrainingProtocol.findById(req.params.id);
        if (!protocol) return res.status(404).send('Protocol not found');
        res.status(200).json(protocol);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateTrainingProtocol = async (req, res) => {
    try {
        const { id, trainerId, traineeId, exercises } = req.body;
        const updatedProtocol = await TrainingProtocol.findByIdAndUpdate(
            id,
            { trainerId, traineeId, exercises },
            { new: true }
        );
        if (!updatedProtocol) {
            return res.status(404).send('Protocol not found');
        }
        res.status(200).json(updatedProtocol);
    } catch (error) {
        res.status(500).json(error);
    }
};


exports.deleteTrainingProtocol = async (req, res) => {
    try {
        const { id } = req.body; // Recebe o ID pelo body ao invés de req.params
        const deletedProtocol = await TrainingProtocol.findByIdAndDelete(id);
        if (!deletedProtocol) {
            return res.status(404).send('Protocol not found');
        }
        res.status(200).send('Protocol has been deleted');
    } catch (error) {
        res.status(500).json(error);
    }
};
