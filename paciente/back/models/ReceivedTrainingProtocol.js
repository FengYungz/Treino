const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    series: { type: Number, required: true }
});

const ReceivedTrainingProtocolSchema = new mongoose.Schema({
    protocolId: { type: String, required: true }, // Garantir que seja 'required'
    trainerId: { type: String, required: true },
    traineeId: { type: String, required: true },
    exercises: [ExerciseSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReceivedTrainingProtocol', ReceivedTrainingProtocolSchema);
