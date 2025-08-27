
import mongoose from 'mongoose';

// Define the schema for the Project model
const ProjectSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Please provide the student\'s name.'],
  },
  studentId: {
    type: String,
    required: [true, 'Please provide the student\'s ID.'],
    unique: true,
    index: true,
  },
  projectName: {
    type: String,
    required: [true, 'Please provide a project name.'],
  },
  projectDesc: {
    type: String,
    required: [true, 'Please provide a project link.'],
  },
}, {
  timestamps: true,
});

// Export the model, preventing recompilation in a serverless environment
export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
