
import React, { useState, useRef } from 'react';
import { User, UserStatus } from '../types';
import { Camera, Mail, GraduationCap, MapPin, Plus, Trash2, ShieldCheck, BadgeCheck, User as UserIcon } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState<User>({ 
    ...user, 
    bio: user.bio || "Passionate software engineer focused on building scalable, user-centric web applications. Expert in the React ecosystem with a strong foundation in backend architecture and cloud security.",
    location: user.location || "San Francisco, CA"
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500 pb-20">
      <div className="relative h-48 rounded-[2.5rem] bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm"></div>
        <div className="absolute inset-0 animate-gradient bg-[length:200%_200%] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="px-8 -mt-24 relative z-10">
        <div className="glass p-8 rounded-[3rem] border-white/10 shadow-2xl flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="relative group">
            <img 
              src={formData.profilePhoto} 
              alt="Profile" 
              className="w-32 h-32 rounded-3xl border-4 border-slate-950 object-cover shadow-2xl transition-all group-hover:brightness-75"
            />
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoChange} 
              accept="image/*" 
              className="hidden" 
            />
            <button 
              onClick={triggerPhotoUpload}
              className="absolute bottom-2 right-2 p-2 rounded-xl bg-purple-600 text-white shadow-lg hover:scale-110 transition-transform opacity-0 group-hover:opacity-100 z-20"
              title="Change Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
              {isEditing ? (
                <div className="relative flex-1 max-w-sm">
                   <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                   <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-slate-900 border border-purple-500/30 rounded-xl py-2 pl-10 pr-4 text-xl font-bold focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Full Name"
                   />
                </div>
              ) : (
                <h2 className="text-3xl font-bold">{formData.fullName}</h2>
              )}
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-green-500/10 text-green-500 rounded-md h-fit w-fit mx-auto md:mx-0">
                <BadgeCheck className="w-3 h-3" />
                Verified Professional
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-400">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Email
                </span>
                {isEditing ? (
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                  />
                ) : (
                  <span className="text-sm">{formData.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" /> Education
                </span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.education}
                    onChange={(e) => setFormData({...formData, education: e.target.value})}
                    className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                  />
                ) : (
                  <span className="text-sm">{formData.education}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Location
                </span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                  />
                ) : (
                  <span className="text-sm">{formData.location}</span>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`
              px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap
              ${isEditing ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-white text-slate-950 hover:bg-slate-200'}
            `}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
        <div className="space-y-8">
          <div className="glass p-8 rounded-[2.5rem]">
            <h3 className="text-xl font-bold mb-6">Experience Level</h3>
            <div className="grid grid-cols-1 gap-3">
              {['Entry', 'Mid', 'Senior'].map((level) => (
                <button
                  key={level}
                  disabled={!isEditing}
                  onClick={() => setFormData({...formData, experienceLevel: level as any})}
                  className={`
                    p-4 rounded-2xl border text-left transition-all
                    ${formData.experienceLevel === level 
                      ? 'bg-purple-600/20 border-purple-500 text-purple-400 font-bold' 
                      : 'bg-white/5 border-white/5 hover:border-white/10'}
                    ${!isEditing && 'cursor-default'}
                  `}
                >
                  {level} Level
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border-orange-500/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Account Health</h3>
              <ShieldCheck className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-sm text-slate-400">Security Status</span>
                <span className="text-sm font-bold text-green-500">{formData.status}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-sm text-slate-400">Last Assessment</span>
                <span className="text-sm font-bold">Today</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-sm text-slate-400">Score Multiplier</span>
                <span className="text-sm font-bold text-purple-400">x1.2</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-10 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Technical Arsenal</h3>
              {isEditing && (
                <button 
                  onClick={() => {
                    const newSkill = prompt("Enter new skill:");
                    if (newSkill) setFormData({...formData, skills: [...formData.skills, newSkill]});
                  }}
                  className="p-2 rounded-xl bg-purple-600/20 text-purple-400 hover:bg-purple-600/40 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              {formData.skills.map((skill, i) => (
                <div key={i} className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-purple-500/30 transition-all cursor-default">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="font-semibold">{skill}</span>
                  {isEditing && (
                    <button 
                      onClick={() => setFormData({...formData, skills: formData.skills.filter(s => s !== skill)})}
                      className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-10 rounded-[2.5rem]">
            <h3 className="text-2xl font-bold mb-6">Professional Biography</h3>
            {isEditing ? (
              <textarea 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full bg-slate-900 border border-white/10 rounded-2xl p-6 min-h-[150px] focus:ring-2 focus:ring-purple-500 outline-none text-slate-300 leading-relaxed"
                placeholder="Write something about your professional journey..."
              ></textarea>
            ) : (
              <p className="text-slate-400 leading-relaxed italic">
                "{formData.bio}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
