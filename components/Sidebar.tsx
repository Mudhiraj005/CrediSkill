
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User as UserIcon, ShieldAlert, Rocket, Briefcase, FileText, Settings, LogOut } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  logout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, logout }) => {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/profile', label: 'My Profile', icon: UserIcon },
    { to: '/test', label: 'Skill Validation', icon: ShieldAlert },
    { to: '/projects', label: 'Project Lab', icon: Rocket },
    { to: '/jobs', label: 'Hiring Portal', icon: Briefcase },
    { to: '/ats', label: 'ATS Checker', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-white/10 flex flex-col h-full sticky top-0 left-0">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg shadow-purple-500/20"></div>
          <h1 className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            SkillMatch<span className="text-purple-500">AI</span>
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}
            `}
          >
            <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110`} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <NavLink
          to="/admin"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Admin Panel</span>
        </NavLink>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-pink-400 hover:bg-pink-400/5 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
