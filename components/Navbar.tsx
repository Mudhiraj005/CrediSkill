
import React from 'react';
import { User } from '../types';
import { Bell, Search, ShieldCheck } from 'lucide-react';

const Navbar: React.FC<{ user: User }> = ({ user }) => {
  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-40 bg-slate-950/50">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search skills, jobs, or tutorials..." 
            className="w-full bg-slate-900 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-pink-500 w-2 h-2 rounded-full border-2 border-slate-950"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">{user.fullName}</p>
            <div className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-wider text-purple-400 font-bold">
              <ShieldCheck className="w-3 h-3" />
              {user.status}
            </div>
          </div>
          <img src={user.profilePhoto} alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-500/30 object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
