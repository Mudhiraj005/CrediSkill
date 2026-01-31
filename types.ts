
export enum UserStatus {
  NORMAL = 'Normal',
  WARNING = 'Warning',
  RESTRICTED = 'Restricted',
  BLOCKED = 'Blocked'
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  education: string;
  skills: string[];
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  employabilityScore: number;
  status: UserStatus;
  profilePhoto?: string;
  bio?: string;
  location?: string;
}

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Job {
  id: string;
  companyName: string;
  role: string;
  salary: string;
  location: string;
  skillsRequired: string[];
  matchScore: number;
}

export interface RecommendedProject {
  title: string;
  difficulty: string;
  techStack: string[];
  roadmap: string[];
  githubTemplate: string;
}

export interface Violation {
  type: string;
  timestamp: string;
  details: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
