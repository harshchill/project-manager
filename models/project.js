
import mongoose from 'mongoose';

// Define the schema for the Project model
const ProjectSchema = new mongoose.Schema({
  teammate1Name: {
    type: String,
    required: [true, 'Please provide the name of the first teammate.'],
  },
  teammate1Id: {
    type: String,
    required: [true, 'Please provide the ID of the first teammate.'],
  },
  teammate2Name: {
    type: String,
    required: [true, 'Please provide the name of the second teammate.'],
  },
  teammate2Id: {
    type: String,
    required: [true, 'Please provide the ID of the second teammate.'],
  },
  projectName: {
    type: String,
    required: [true, 'Please provide a project name.'],
  },
  projectDesc: {
    type: String,
    // This field is not required, so we just define the type.
  },
}, {
  // This option automatically adds createdAt and updatedAt fields
  timestamps: true,
});

// Export the model, preventing recompilation in a serverless environment
export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
