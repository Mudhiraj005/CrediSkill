
import React from 'react';
import { User } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { Zap, TrendingUp, Award, Clock, Lightbulb } from 'lucide-react';

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const skillsData = [
    { skill: 'React', level: 90 },
    { skill: 'TypeScript', level: 85 },
    { skill: 'Node.js', level: 75 },
    { skill: 'DB Design', level: 80 },
    { skill: 'UI/UX', level: 70 },
  ];

  const marketDemand = [
    { month: 'Jan', demand: 45 },
    { month: 'Feb', demand: 52 },
    { month: 'Mar', demand: 48 },
    { month: 'Apr', demand: 61 },
    { month: 'May', demand: 55 },
    { month: 'Jun', demand: 67 },
  ];

  const stats = [
    { label: 'Employability Score', value: `${user.employabilityScore}/100`, icon: Zap, color: 'text-orange-400' },
    { label: 'Market Demand Index', value: 'High', icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Verified Skills', value: user.skills.length, icon: Award, color: 'text-pink-400' },
    { label: 'Learning Hours', value: '124h', icon: Clock, color: 'text-blue-400' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Hello, {user.fullName.split(' ')[0]} 👋</h2>
          <p className="text-slate-400 mt-1">Here's what's happening with your professional growth today.</p>
        </div>
        <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Job Market is Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl group hover:border-purple-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-500">+12% this week</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] min-h-[400px]">
          <h3 className="text-xl font-bold mb-8">Career Growth & Market Demand</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketDemand}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="month" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#A855F7' }}
                />
                <Area type="monotone" dataKey="demand" stroke="#A855F7" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem]">
          <h3 className="text-xl font-bold mb-8">Skill Proficiency</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="skill" stroke="#ffffff40" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#ffffff10" tick={false} />
                <Radar
                  name="Proficiency"
                  dataKey="level"
                  stroke="#EC4899"
                  fill="#EC4899"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-[2.5rem]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-500">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Recommended for You</h3>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Advanced GraphQL Patterns', type: 'Course', level: 'Intermediate' },
              { title: 'Full-stack Performance Optimization', type: 'Lab', level: 'Advanced' },
              { title: 'System Design Interview Prep', type: 'Assessment', level: 'All Levels' }
            ].map((rec, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer">
                <div>
                  <p className="font-bold">{rec.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{rec.type} • {rec.level}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-purple-500 group-hover:text-white">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem]">
          <h3 className="text-xl font-bold mb-6">Recent Test Results</h3>
          <div className="space-y-4">
            {[
              { skill: 'React Architecture', score: 92, status: 'Passed', color: 'bg-green-500' },
              { skill: 'Data Structures', score: 88, status: 'Passed', color: 'bg-green-500' },
              { skill: 'AWS Cloud Basics', score: 45, status: 'Failed', color: 'bg-red-500' }
            ].map((test, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${test.color}/10 flex items-center justify-center text-lg font-bold ${test.color.replace('bg-', 'text-')}`}>
                  {test.score}%
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{test.skill}</p>
                  <div className="w-full bg-white/5 h-1.5 rounded-full mt-2">
                    <div className={`${test.color} h-full rounded-full`} style={{ width: `${test.score}%` }}></div>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${test.color}/10 ${test.color.replace('bg-', 'text-')}`}>
                  {test.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default Dashboard;
