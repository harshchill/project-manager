import dbConnect from '@/lib/db';
import Project from '@/models/project';

/**
 * Create a project document after connecting to the database.
 * @param {Object} payload - Project fields from the form
 * @returns {Promise<Object>} The created project document
 */
export async function createProject(payload) {
  await dbConnect();

  // Basic normalization
  const doc = {
    teammate1Name: String(payload?.teammate1Name || '').trim(),
    teammate1Id: String(payload?.teammate1Id || '').trim(),
    teammate2Name: String(payload?.teammate2Name || '').trim(),
    teammate2Id: String(payload?.teammate2Id || '').trim(),
    projectName: String(payload?.projectName || '').trim(),
    projectDesc: payload?.projectDesc ? String(payload.projectDesc).trim() : undefined,
  };

  // Mongoose validation will enforce required fields and types
  const created = await Project.create(doc);
  return created.toObject();
}
