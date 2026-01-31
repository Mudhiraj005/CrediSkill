
import React from 'react';
import { UserStatus } from '../types';
import { Users, ShieldAlert, BarChart3, Settings, MoreHorizontal, UserX, UserCheck } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const users = [
    { id: '1', name: 'John Doe', status: UserStatus.NORMAL, score: 85, violations: 0 },
    { id: '2', name: 'Jane Smith', status: UserStatus.WARNING, score: 62, violations: 2 },
    { id: '3', name: 'Bob Wilson', status: UserStatus.RESTRICTED, score: 0, violations: 5 },
    { id: '4', name: 'Sarah Connor', status: UserStatus.NORMAL, score: 98, violations: 0 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold">Admin Hub</h2>
          <p className="text-slate-400">System-wide monitoring, user management, and violation logs.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="font-bold">1,240 Total Users</span>
          </div>
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            <span className="font-bold">12 Active Alerts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass rounded-[2.5rem] overflow-hidden border border-white/5">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-bold">User Management</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search user ID or email..." 
                className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm"
              />
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-white/5 text-slate-500 text-xs uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">User</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Score</th>
                <th className="px-8 py-4">Violations</th>
                <th className="px-8 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-4 font-semibold">{u.name}</td>
                  <td className="px-8 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      u.status === UserStatus.NORMAL ? 'bg-green-500/10 text-green-500' :
                      u.status === UserStatus.WARNING ? 'bg-orange-500/10 text-orange-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 font-mono">{u.score}%</td>
                  <td className="px-8 py-4 text-red-400">{u.violations}</td>
                  <td className="px-8 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-white/5 hover:text-green-400 transition-colors">
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 hover:text-red-400 transition-colors">
                        <UserX className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Quick Stats
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  <span>Server Load</span>
                  <span>42%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full">
                  <div className="w-[42%] h-full bg-purple-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  <span>Database Health</span>
                  <span>98%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full">
                  <div className="w-[98%] h-full bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-400" />
              System Control
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-sm">
                Clear System Cache
              </button>
              <button className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-sm">
                Broadcast Message
              </button>
              <button className="w-full text-left p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-bold">
                Enter Emergency Lockout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
