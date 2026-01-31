
import React, { useState } from 'react';
import { User, RecommendedProject } from '../types';
import { getProjectRecommendations } from '../services/geminiService';
import { Rocket, Target, Code, Github, ArrowRight, Sparkles } from 'lucide-react';

const Projects: React.FC<{ user: User }> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedProject[]>([]);
  const [careerGoal, setCareerGoal] = useState('');

  const fetchRecommendations = async () => {
    if (!careerGoal) return;
    setLoading(true);
    try {
      const data = await getProjectRecommendations(user.skills, careerGoal);
      setRecommendations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            AI Recommendation Engine
          </div>
          <h2 className="text-5xl font-bold leading-tight">Build Real-World <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Experience</span></h2>
          <p className="text-xl text-slate-400">Tell us your career dream, and we'll architect the perfect portfolio projects to get you there.</p>
          
          <div className="flex gap-4">
            <input 
              type="text" 
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              placeholder="e.g. Senior Backend Engineer at Google"
              className="flex-1 bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button 
              onClick={fetchRecommendations}
              disabled={loading || !careerGoal}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-8 rounded-2xl font-bold transition-all whitespace-nowrap"
            >
              {loading ? 'Analyzing...' : 'Generate Roadmap'}
            </button>
          </div>
        </div>
        <div className="hidden lg:block w-72 h-72 relative">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse blur-3xl"></div>
          <Rocket className="w-full h-full text-purple-500/50 relative z-10 p-12" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {recommendations.length > 0 ? (
          recommendations.map((project, i) => (
            <div key={i} className="glass rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col group hover:border-purple-500/50 transition-all duration-500">
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 text-purple-400">
                    <Code className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-slate-500">
                    {project.difficulty}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech, j) => (
                    <span key={j} className="text-[10px] font-bold uppercase px-2 py-1 bg-purple-500/10 text-purple-400 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Milestones</p>
                  {project.roadmap.map((step, j) => (
                    <div key={j} className="flex gap-3 text-sm text-slate-400">
                      <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-[10px]">
                        {j + 1}
                      </div>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 border-t border-white/5 bg-white/5 flex gap-4">
                <button className="flex-1 bg-white text-slate-950 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                  <Github className="w-4 h-4" />
                  Clone Template
                </button>
                <button className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : !loading && (
          <div className="lg:col-span-3 py-20 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
              <Target className="w-10 h-10" />
            </div>
            <p className="text-slate-500 text-lg">Your personalized project lab is ready. Just enter a career goal above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
