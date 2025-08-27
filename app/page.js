"use client"
import { useState } from "react";

export default function Home() {
  const [project, setProject] = useState({
    teammate1Name: "",
    teammate1Id: "",
    teammate2Name: "",
    teammate2Id: "",
    projectName: "",
    projectDesc: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  console.log("This webapp is made by Harsh mahto")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to submit project");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Project Submission
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-md mx-auto">
              Submit your project details and let&apos;s bring your ideas to life
            </p>
          </div>

          {/* Form Container */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10">
            {submitted ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">Submission Successful! 🎉</h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">Project Summary</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-slate-300"><span className="font-semibold text-white">Teammate 1:</span> {project.teammate1Name} <span className="text-purple-300">({project.teammate1Id})</span></span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-slate-300"><span className="font-semibold text-white">Teammate 2:</span> {project.teammate2Name} <span className="text-blue-300">({project.teammate2Id})</span></span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="text-slate-300"><span className="font-semibold text-white">Project:</span> {project.projectName}</span>
                    </div>
                    {project.projectDesc && (
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-300"><span className="font-semibold text-white">Description:</span> {project.projectDesc}</span>
                      </div>
                    )}
                  </div>
                </div>
                
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 rounded-lg border border-red-400/40 bg-red-500/10 text-red-200 text-sm">
                    {error}
                  </div>
                )}
                {/* Teammate 1 Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    Teammate 1
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="teammate1Name" className="block text-sm font-medium text-slate-300">
                        Name
                      </label>
                      <input
                        type="text"
                        id="teammate1Name"
                        name="teammate1Name"
                        value={project.teammate1Name}
                        onChange={handleChange}
                        required
                        placeholder="Enter teammate name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="teammate1Id" className="block text-sm font-medium text-slate-300">
                        ID
                      </label>
                      <input
                        type="text"
                        id="teammate1Id"
                        name="teammate1Id"
                        value={project.teammate1Id}
                        onChange={handleChange}
                        required
                        placeholder="Enter teammate ID"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Teammate 2 Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    Teammate 2
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="teammate2Name" className="block text-sm font-medium text-slate-300">
                        Name
                      </label>
                      <input
                        type="text"
                        id="teammate2Name"
                        name="teammate2Name"
                        value={project.teammate2Name}
                        onChange={handleChange}
                        required
                        placeholder="Enter teammate name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="teammate2Id" className="block text-sm font-medium text-slate-300">
                        ID
                      </label>
                      <input
                        type="text"
                        id="teammate2Id"
                        name="teammate2Id"
                        value={project.teammate2Id}
                        onChange={handleChange}
                        required
                        placeholder="Enter teammate ID"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-pink-300 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="projectName" className="block text-sm font-medium text-slate-300">
                        Project Name
                      </label>
                      <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={project.projectName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your project name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="projectDesc" className="block text-sm font-medium text-slate-300">
                        Project Description <span className="text-slate-400 text-xs">(optional)</span>
                      </label>
                      <textarea
                        id="projectDesc"
                        name="projectDesc"
                        value={project.projectDesc}
                        onChange={handleChange}
                        placeholder="Describe your amazing project..."
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105 shadow-2xl hover:shadow-purple-500/25 active:scale-95"}`}
                >
                  <span className="flex items-center justify-center">
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                    {loading ? "Submitting..." : "Launch Project"}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-slate-400 text-sm">
              Built by ❤️ Mahto
            </p>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
