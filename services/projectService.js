import dbConnect from '@/lib/db';
import Project from '@/models/project';

/**
 * Ensure provided student ID is not already used in any project.
 */
async function ensureStudentIdAvailable(studentId) {
  const normalizedId = String(studentId || '').trim();
  if (!normalizedId) return; // let mongoose handle required validation

  const conflict = await Project.findOne({ studentId: normalizedId }).lean();
  if (conflict) {
    throw new Error('This student ID is already registered to a project.');
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
    studentName: String(payload?.studentName || '').trim(),
    studentId: String(payload?.studentId || '').trim(),
    projectName: String(payload?.projectName || '').trim(),
    projectDesc: payload?.projectDesc ? String(payload.projectDesc).trim() : undefined,
  };

  // Enforce student ID uniqueness across all projects
  await ensureStudentIdAvailable(doc.studentId);

  // Mongoose validation will enforce required fields and types
  const created = await Project.create(doc);
  return created.toObject();
}
