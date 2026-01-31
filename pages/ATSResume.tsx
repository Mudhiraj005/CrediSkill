
import React, { useState } from 'react';
import { User } from '../types';
import { analyzeResume } from '../services/geminiService';
import { FileText, Upload, CheckCircle, XCircle, AlertCircle, FileUp, Zap } from 'lucide-react';

const ATSResume: React.FC<{ user: User }> = ({ user }) => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [targetJob, setTargetJob] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const runAnalysis = async () => {
    if (!file) return;
    setAnalyzing(true);
    // Simulate reading file text - in reality you'd use a PDF parser library
    const mockText = `
      ${user.fullName}
      Experience: Senior Frontend Developer for 4 years.
      Education: ${user.education}
      Skills: ${user.skills.join(', ')}
    `;
    
    try {
      const data = await analyzeResume(mockText, targetJob);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">ATS Optimizer</h2>
            <p className="text-slate-400">Optimize your resume for applicant tracking systems using our enterprise-grade AI engine.</p>
          </div>

          <div className="glass p-8 rounded-[2rem] border-white/10 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Target Role (Optional)</label>
              <input 
                type="text" 
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-400">Upload Resume (PDF/DOCX)</label>
              <div className="relative group cursor-pointer">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className={`
                  border-2 border-dashed rounded-2xl p-8 text-center transition-all
                  ${file ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 hover:border-white/20'}
                `}>
                  <FileUp className={`w-12 h-12 mx-auto mb-4 ${file ? 'text-purple-500' : 'text-slate-600'}`} />
                  <p className="font-medium">{file ? file.name : 'Select or drop file'}</p>
                  <p className="text-xs text-slate-500 mt-2">Max file size: 5MB</p>
                </div>
              </div>
            </div>

            <button 
              disabled={!file || analyzing}
              onClick={runAnalysis}
              className="w-full bg-white text-slate-950 py-4 rounded-xl font-bold hover:bg-slate-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full"></div>
                  Parsing Neural Data...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-slate-950" />
                  Analyze Resume
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex-1">
          {results ? (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-8 rounded-[2rem] text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">ATS Score</p>
                  <p className={`text-5xl font-extrabold ${results.atsScore > 80 ? 'text-green-500' : 'text-orange-500'}`}>
                    {results.atsScore}
                  </p>
                </div>
                <div className="glass p-8 rounded-[2rem] text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Role Fit</p>
                  <p className="text-5xl font-extrabold text-purple-500">
                    {results.relevanceToRole}%
                  </p>
                </div>
                <div className="glass p-8 rounded-[2rem] text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Status</p>
                  <p className={`text-2xl font-bold mt-3 ${results.atsScore > 75 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {results.atsScore > 75 ? 'Interview Ready' : 'Needs Optimization'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[2.5rem]">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Missing Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.missingKeywords.map((kw: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass p-8 rounded-[2.5rem]">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Suggested Improvements
                  </h3>
                  <ul className="space-y-3">
                    {results.improvements.map((imp: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-400">
                        <AlertCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="glass p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-bold mb-4">AI-Optimized Summary</h3>
                <p className="text-slate-400 leading-relaxed italic">
                  "{results.suggestedSummary || "Ready to ship results... optimize keywords for better generation."}"
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] glass rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-white/5">
              <FileText className="w-20 h-20 text-slate-800 mb-6" />
              <h3 className="text-2xl font-bold text-slate-600">No Analysis Results</h3>
              <p className="text-slate-500 max-w-sm mx-auto mt-2">
                Upload your resume and click analyze to see how well it performs against modern hiring algorithms.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSResume;
