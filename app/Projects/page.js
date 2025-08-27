
import Project from '@/models/project';
import dbConnect from '@/lib/db';

async function getProjects() {
  await dbConnect();
  const docs = await Project.find({}, {
    projectName: 1,
    studentName: 1,
    studentId: 1,
    createdAt: 1,
  }).sort({ createdAt: 1 }).lean(); // oldest -> newest (latest at bottom)
  return docs.map((d) => ({
    _id: String(d._id),
    projectName: d.projectName,
    studentName: d.studentName,
    studentId: d.studentId,
    createdAt: d.createdAt?.toISOString?.() || '',
  }));
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements - hidden on small screens for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden sm:block absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="hidden sm:block absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="hidden sm:block absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-start sm:items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 sm:mb-6 shadow-2xl">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </h1>
            <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-xl mx-auto px-2">
              Browse all submitted projects. Latest appear at the bottom.
            </p>
          </div>

          {/* List Container */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl p-4 sm:p-6 md:p-8">
            {projects.length === 0 ? (
              <div className="text-center py-8 sm:py-10 text-slate-300">
                No projects yet. Be the first to submit!
              </div>
            ) : (
              <ul className="space-y-3 sm:space-y-4">
                {projects.map((p, idx) => (
                  <li key={p._id} className="group">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-3 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:bg-white/15">
                      <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md text-sm sm:text-base">
                          {idx + 1}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-white font-semibold text-base sm:text-lg truncate">
                            {p.projectName}
                          </h3>
                          <div className="mt-1 text-slate-300 text-xs sm:text-sm leading-relaxed">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              <span className="inline-flex items-center gap-1">
                                <span className="text-white font-medium">Student:</span>
                                <span className="truncate max-w-[8rem] sm:max-w-[12rem]">{p.studentName}</span>
                                <span className="px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-200 font-mono text-[10px] sm:text-xs border border-purple-400/20">
                                  {p.studentId}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-1 md:pt-0 text-left md:text-right">
                        <div className="text-slate-400 text-[10px] sm:text-xs">
                          Created: {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—'}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-slate-400 text-xs sm:text-sm">
              Built by Mahto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
