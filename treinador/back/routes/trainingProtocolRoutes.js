const express = require('express');
const router = express.Router();
const trainingProtocolController = require('../controllers/trainingProtocolController');

// Rota para criar um novo protocolo de treinamento
router.post('/create', trainingProtocolController.createTrainingProtocol);

// Rota para buscar todos os protocolos de treinamento
router.get('/list', trainingProtocolController.getAllTrainingProtocols);

// Rota para atualizar um protocolo de treinamento
router.put('/update', trainingProtocolController.updateTrainingProtocol);

// Rota para deletar um protocolo de treinamento
router.delete('/delete', trainingProtocolController.deleteTrainingProtocol);

module.exports = router;