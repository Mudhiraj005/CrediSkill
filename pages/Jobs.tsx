
import React, { useState } from 'react';
import { User, Job } from '../types';
import { MapPin, DollarSign, Building2, ExternalLink, Filter } from 'lucide-react';

const Jobs: React.FC<{ user: User }> = ({ user }) => {
  const [filter, setFilter] = useState('Remote');

  const jobs: Job[] = [
    {
      id: 'j1',
      companyName: 'Lumina Tech',
      role: 'Frontend Engineer',
      salary: '$120k - $150k',
      location: 'Remote',
      skillsRequired: ['React', 'TypeScript', 'Tailwind'],
      matchScore: 95
    },
    {
      id: 'j2',
      companyName: 'Quantum Systems',
      role: 'Full Stack Architect',
      salary: '$160k - $200k',
      location: 'San Francisco, CA',
      skillsRequired: ['Node.js', 'PostgreSQL', 'Docker'],
      matchScore: 82
    },
    {
      id: 'j3',
      companyName: 'Neon Media',
      role: 'UI Developer',
      salary: '$90k - $110k',
      location: 'Remote',
      skillsRequired: ['React', 'Figma', 'CSS'],
      matchScore: 78
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">Hiring Portal</h2>
          <p className="text-slate-400">Curated opportunities matched to your skill profile and employability score.</p>
        </div>
        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
          {['All', 'Remote', 'On-site', 'Hybrid'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`
                px-4 py-2 rounded-xl text-sm font-bold transition-all
                ${filter === type ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:text-white'}
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="glass rounded-[2rem] border border-white/5 overflow-hidden flex flex-col group hover:border-purple-500/50 transition-all duration-300">
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center text-2xl">
                  {job.companyName.charAt(0)}
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Match Score</div>
                  <div className={`text-xl font-bold ${job.matchScore > 90 ? 'text-green-500' : 'text-purple-500'}`}>
                    {job.matchScore}%
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{job.role}</h3>
              <p className="text-slate-400 flex items-center gap-1 mt-1 mb-6 text-sm">
                <Building2 className="w-3.5 h-3.5" />
                {job.companyName}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  {job.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  {job.salary}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.map((skill, i) => (
                  <span key={i} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-white/5 bg-white/5">
              <button className="w-full bg-white text-slate-950 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                Quick Apply
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-12 rounded-[2.5rem] border border-white/5 text-center">
        <h3 className="text-2xl font-bold mb-4">Want more targeted roles?</h3>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">Complete more skill assessments and projects to increase your employability score and unlock high-paying premium roles.</p>
        <button className="px-8 py-3 bg-purple-600/10 text-purple-400 border border-purple-500/20 rounded-xl font-bold hover:bg-purple-500/20 transition-all">
          Upgrade My Profile
        </button>
      </div>
    </div>
  );
};

export default Jobs;
