import dbConnect from '@/lib/db';
import Project from '@/models/project';

/**
 * Ensure provided teammate IDs are not already used in any project.
 * Throws an Error if a conflict is found or if IDs are equal.
 */
async function ensureTeammateIdsAvailable(id1, id2) {
  const normalizedId1 = String(id1 || '').trim();
  const normalizedId2 = String(id2 || '').trim();

  if (!normalizedId1 || !normalizedId2) return; // let mongoose handle required validation

  if (normalizedId1 === normalizedId2) {
    throw new Error('A teammate ID can only be linked to one project and cannot be reused. Both teammate IDs must be different.');
  }

  const conflict = await Project.findOne({
    $or: [
      { teammate1Id: { $in: [normalizedId1, normalizedId2] } },
      { teammate2Id: { $in: [normalizedId1, normalizedId2] } },
    ],
  }).lean();

  if (conflict) {
    throw new Error('One or both teammate IDs are already registered to a project.');
  }
}

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

  // Enforce teammate ID uniqueness across all projects
  await ensureTeammateIdsAvailable(doc.teammate1Id, doc.teammate2Id);

  // Mongoose validation will enforce required fields and types
  const created = await Project.create(doc);
  return created.toObject();
}
