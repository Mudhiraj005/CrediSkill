
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, UserStatus, MCQ } from '../types';
import { generateSkillsTest } from '../services/geminiService';
import { Shield, AlertTriangle, Monitor, Maximize, BrainCircuit, CheckCircle2 } from 'lucide-react';

const TestPlatform: React.FC<{ user: User }> = ({ user }) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [violations, setViolations] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const startTest = async () => {
    if (!selectedSkill) return;
    setIsLoading(true);
    try {
      const generated = await generateSkillsTest(selectedSkill);
      setQuestions(generated);
      setIsTesting(true);
      setAnswers(new Array(generated.length).fill(-1));
      
      // Attempt fullscreen
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate test. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViolation = useCallback((type: string) => {
    if (!isTesting || isFinished) return;
    setViolations(prev => {
      const next = prev + 1;
      if (next >= 3) {
        alert(`CRITICAL VIOLATION: Multiple ${type} detected. Test terminated with zero score.`);
        setIsFinished(true);
        setIsTesting(false);
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      } else {
        alert(`WARNING: ${type} detected. Violations: ${next}/3. Next violation will terminate the test.`);
      }
      return next;
    });
  }, [isTesting, isFinished]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleViolation('Tab Switching');
      }
    };

    const handleBlur = () => {
      handleViolation('Window Focus Loss');
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      handleViolation('Right Click');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) {
        handleViolation('Shortcut Usage');
      }
    };

    if (isTesting && !isFinished) {
      window.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', handleBlur);
      window.addEventListener('contextmenu', handleContextMenu);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTesting, isFinished, handleViolation]);

  const submitTest = () => {
    setIsFinished(true);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (isFinished) {
    const score = violations >= 3 ? 0 : Math.round((answers.filter((a, i) => a === questions[i].correctAnswer).length / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-in zoom-in duration-300">
        <div className={`inline-flex p-6 rounded-full ${score > 50 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} mb-8`}>
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Assessment Complete</h2>
        <p className="text-xl text-slate-400 mb-8">
          You scored <span className="text-white font-bold">{score}%</span> in {selectedSkill} validation.
        </p>
        <div className="glass p-6 rounded-3xl mb-8">
          <p className="text-slate-400 mb-2">Anti-Cheat Report</p>
          <p className={`font-bold ${violations > 0 ? 'text-orange-500' : 'text-green-500'}`}>
            {violations} Violations Recorded
          </p>
        </div>
        <button 
          onClick={() => {
            setIsFinished(false);
            setIsTesting(false);
            setViolations(0);
          }}
          className="bg-white text-slate-950 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  if (isTesting) {
    const q = questions[currentQuestionIndex];
    return (
      <div ref={containerRef} className="fixed inset-0 bg-slate-950 z-[9999] flex flex-col p-8 select-none">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold">{selectedSkill} Validation</h3>
              <p className="text-slate-500">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <div className="flex gap-4">
              <div className="glass px-4 py-2 rounded-xl border-orange-500/30 flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-500">{violations} Violations</span>
              </div>
              <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-mono">15:00</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="glass p-12 rounded-[2.5rem] border-white/10 mb-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full"></div>
              <span className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-4 block">
                {q.difficulty}
              </span>
              <h2 className="text-3xl font-bold mb-10 leading-snug">
                {q.question}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {q.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const newAnswers = [...answers];
                      newAnswers[currentQuestionIndex] = idx;
                      setAnswers(newAnswers);
                    }}
                    className={`
                      text-left p-6 rounded-2xl border transition-all text-lg
                      ${answers[currentQuestionIndex] === idx 
                        ? 'bg-purple-600/20 border-purple-500 text-purple-400 font-bold shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                        : 'bg-white/5 border-white/5 hover:border-white/20'}
                    `}
                  >
                    <span className="mr-4 text-slate-500">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(i => i - 1)}
              className="px-8 py-3 rounded-xl border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex gap-2">
              {questions.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentQuestionIndex ? 'bg-purple-500 scale-125' : answers[i] !== -1 ? 'bg-purple-900' : 'bg-white/10'}`}
                ></div>
              ))}
            </div>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={submitTest}
                className="bg-green-600 hover:bg-green-500 px-10 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex(i => i + 1)}
                className="bg-purple-600 hover:bg-purple-500 px-10 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20"
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-extrabold tracking-tight">AI Skill Validation</h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Earn verified badges by completing our AI-generated assessments in a high-security environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-10 rounded-[2.5rem] border-white/10">
          <h3 className="text-2xl font-bold mb-6">Security Protocol</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 h-fit">
                <Maximize className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Fullscreen Mode</p>
                <p className="text-sm text-slate-400">Assessment must be completed in full screen. Exiting will trigger a violation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400 h-fit">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Focus Monitoring</p>
                <p className="text-sm text-slate-400">Switching tabs or windows is strictly prohibited and tracked by our AI.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 rounded-2xl bg-red-500/10 text-red-400 h-fit">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Immediate Penalties</p>
                <p className="text-sm text-slate-400">3 violations result in immediate failure and potential score restriction for 30 days.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-10 rounded-[2.5rem] bg-gradient-to-br from-purple-900/10 to-transparent">
          <h3 className="text-2xl font-bold mb-6">Start New Assessment</h3>
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Select Domain</label>
              <select 
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 px-4 focus:ring-2 focus:ring-purple-500 outline-none text-white appearance-none cursor-pointer"
              >
                <option value="">Choose a skill to validate...</option>
                <optgroup label="Core Programming">
                  <option value="Java (Spring Boot)">Java (Spring Boot)</option>
                  <option value="Python Data Science">Python Data Science</option>
                  <option value="C++ Systems Programming">C++ Systems Programming</option>
                  <option value="Go (Golang) Microservices">Go (Golang) Microservices</option>
                  <option value="Advanced TypeScript">Advanced TypeScript</option>
                </optgroup>
                <optgroup label="Frontend & Mobile">
                  <option value="React.js Development">React.js Development</option>
                  <option value="Flutter / Dart Development">Flutter / Dart Development</option>
                  <option value="Swift iOS Development">Swift iOS Development</option>
                  <option value="Kotlin Android Development">Kotlin Android Development</option>
                </optgroup>
                <optgroup label="Infrastructure & AI">
                  <option value="Node.js Backend Architecture">Node.js Backend Architecture</option>
                  <option value="Cloud Security (AWS/Azure)">Cloud Security (AWS/Azure)</option>
                  <option value="System Design">System Design</option>
                  <option value="Machine Learning (Scikit-learn)">Machine Learning (Scikit-learn)</option>
                  <option value="Cybersecurity Fundamentals">Cybersecurity Fundamentals</option>
                </optgroup>
              </select>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 italic text-slate-400 text-sm">
              "The AI will generate unique questions based on current industry standards. No two tests are ever the same."
            </div>

            <button 
              disabled={!selectedSkill || isLoading}
              onClick={startTest}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed py-5 rounded-2xl font-bold flex items-center justify-center gap-3 text-lg transition-all shadow-lg shadow-purple-500/20"
            >
              {isLoading ? (
                <div className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <BrainCircuit className="w-6 h-6" />
                  Generate My Test
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default TestPlatform;
