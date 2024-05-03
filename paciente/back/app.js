const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importando o pacote CORS
const app = express();
const PORT = process.env.PORT || 3001;
const receivedTrainingProtocolController = require('./controllers/receivedTrainingProtocolController');
const receivedTrainingProtocolRoutes = require('./routes/receivedTrainingProtocolRoutes');

app.use(express.json());

// Configuração do CORS para permitir todas as origens
app.use(cors());

// Use as rotas no aplicativo
app.use('/api', receivedTrainingProtocolRoutes);

mongoose.connect('mongodb://localhost/receivedTrainingProtocolDB')
    .then(() => {
        console.log('MongoDB Connected');
        receivedTrainingProtocolController.receiveProtocolCreatedMessage();
    })
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});