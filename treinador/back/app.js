const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // Importando o pacote CORS
const app = express();
const PORT = process.env.PORT || 3002;

// Configuração do CORS para permitir todas as origens
app.use(cors());

app.use(express.json());

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost/trainingProtocolDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Servindo arquivos PDF estáticos
app.use('/treinos', express.static(path.join(__dirname, 'treinos')));

// Importando as rotas
const trainingProtocolRoutes = require('./routes/trainingProtocolRoutes');

// Usando as rotas
app.use('/api/training', trainingProtocolRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
