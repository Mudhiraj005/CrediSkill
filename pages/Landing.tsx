
import React, { useState } from 'react';
import { User, UserStatus } from '../types';
import { Mail, Lock, User as UserIcon, GraduationCap, ChevronRight } from 'lucide-react';

const Landing: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    education: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would hit an API
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      fullName: formData.fullName || 'New User',
      email: formData.email,
      education: formData.education || 'High School',
      skills: ['HTML', 'CSS', 'JavaScript'],
      experienceLevel: 'Entry',
      employabilityScore: 50,
      status: UserStatus.NORMAL,
      profilePhoto: `https://picsum.photos/seed/${formData.email}/200`
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center p-4">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px]"></div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hidden md:block">
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Elevate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 animate-gradient">Professional</span> Potential
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-lg">
            SkillMatch AI uses advanced neural networks to validate your skills, suggest personalized learning paths, and connect you with high-growth careers.
          </p>
          <div className="flex gap-4">
            <div className="glass px-6 py-4 rounded-2xl">
              <p className="text-3xl font-bold">10k+</p>
              <p className="text-sm text-slate-500">Skills Verified</p>
            </div>
            <div className="glass px-6 py-4 rounded-2xl">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-slate-500">Top Recruiters</p>
            </div>
          </div>
        </div>

        <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-slate-400">{isLogin ? 'Enter your details to continue your journey.' : 'Start your AI-powered career growth today.'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Education</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      required
                      placeholder="University or Degree"
                      className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      onChange={(e) => setFormData({...formData, education: e.target.value})}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-4 rounded-xl font-bold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 group transition-all"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
