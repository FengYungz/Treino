const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  series: { type: Number, required: true }
});

const TrainingProtocolSchema = new mongoose.Schema({
  //trainerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  //traineeId: { type: mongoose.Schema.Types.ObjectId, required: true },
  trainerId: { type: String, required: true }, // Alteração para String
  traineeId: { type: String, required: true }, // Alteração para String
  exercises: [ExerciseSchema],  // Uma lista de exercícios
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrainingProtocol', TrainingProtocolSchema);
