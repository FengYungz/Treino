// routes/receivedTrainingProtocolRoutes.js
const express = require('express');
const router = express.Router();
const receivedTrainingProtocolController = require('../controllers/receivedTrainingProtocolController');

// Definindo a rota POST para receber protocolos de treinamento via RabbitMQ
// Certifique-se de que o método que você quer usar está corretamente exportado e definido no controlador.
router.post('/receive', receivedTrainingProtocolController.receiveProtocolCreatedMessage);

// Rota para obter todos os protocolos de treinamento recebidos
router.get('/protocols', receivedTrainingProtocolController.getAllReceivedTrainingProtocols);

module.exports = router;