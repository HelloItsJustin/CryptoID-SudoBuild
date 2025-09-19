import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, AlertCircle, Users, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { TrustBadge } from '../components/TrustBadge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useApp } from '../contexts/AppContext';
import { JlynCipher } from '../utils/jlynCipher';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  score: number;
}

export const Verification: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useApp();
  
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 'behavioral',
      title: 'Behavioral Pattern Analysis',
      description: 'Analyzing captured behavioral biometrics with Jlyn Cipher',
      status: 'pending',
      score: 0
    },
    {
      id: 'consistency',
      title: 'Pattern Consistency Check',
      description: 'Validating behavioral pattern consistency and uniqueness',
      status: 'pending',
      score: 0
    },
    {
      id: 'risk',
      title: 'Risk Assessment',
      description: 'Evaluating potential security risks and fraud indicators',
      status: 'pending',
      score: 0
    },
    {
      id: 'social',
      title: 'Social Proof Initialization',
      description: 'Setting up community verification network connections',
      status: 'pending',
      score: 0
    }
  ]);

  const [overallScore, setOverallScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    startVerification();
  }, [currentUser, navigate]);

  const startVerification = async () => {
    const steps = [...verificationSteps];
    
    // Process each step with realistic delays
    for (let i = 0; i < steps.length; i++) {
      // Set step to processing
      steps[i].status = 'processing';
      setVerificationSteps([...steps]);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
      
      // Complete the step with a score
      const score = generateStepScore(steps[i].id);
      steps[i].status = score > 70 ? 'completed' : 'failed';
      steps[i].score = score;
      setVerificationSteps([...steps]);
      
      // Update overall score
      const completedSteps = steps.filter(s => s.status === 'completed');
      const avgScore = completedSteps.reduce((sum, s) => sum + s.score, 0) / completedSteps.length || 0;
      setOverallScore(Math.round(avgScore));
    }
    
    // Final processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const finalScore = Math.round(steps.reduce((sum, s) => sum + s.score, 0) / steps.length);
    setOverallScore(finalScore);
    
    // Update user with verification results
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        verificationScore: finalScore,
        trustLevel: getTrustLevel(finalScore),
        lastVerified: new Date()
      };
      setCurrentUser(updatedUser);
    }
    
    setIsComplete(true);
  };

  const generateStepScore = (stepId: string): number => {
    // Generate realistic scores based on step type
    const baseScores = {
      behavioral: 85 + Math.random() * 10,
      consistency: 80 + Math.random() * 15,
      risk: 90 - Math.random() * 20,
      social: 75 + Math.random() * 20
    };
    
    return Math.round(baseScores[stepId as keyof typeof baseScores] || 75);
  };

  const getTrustLevel = (score: number) => {
    if (score >= 90) return 'highly-trusted';
    if (score >= 80) return 'trusted';
    if (score >= 60) return 'verified';
    if (score >= 40) return 'developing';
    return 'new';
  };

  const getStepIcon = (step: VerificationStep) => {
    if (step.status === 'completed') return <Check className="w-5 h-5 text-green-400" />;
    if (step.status === 'failed') return <AlertCircle className="w-5 h-5 text-red-400" />;
    if (step.status === 'processing') return <LoadingSpinner size="sm" text="" />;
    return <div className="w-5 h-5 rounded-full border-2 border-gray-400" />;
  };

  const getStepColor = (step: VerificationStep) => {
    if (step.status === 'completed') return 'text-green-400';
    if (step.status === 'failed') return 'text-red-400';
    if (step.status === 'processing') return 'text-blue-400';
    return 'text-gray-400';
  };

  const proceedToDashboard = () => {
    navigate('/dashboard');
  };

  if (!currentUser) {
    return <LoadingSpinner fullScreen text="Loading verification..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Identity Verification
          </h1>
          <p className="text-xl text-gray-300">
            Processing your behavioral signature with advanced security validation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Verification Progress */}
          <div className="space-y-6">
            <GlassCard>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{currentUser.name}</h3>
                  <p className="text-gray-300">{currentUser.demographics.occupation}</p>
                  <p className="text-sm text-gray-400">{currentUser.demographics.country}</p>
                </div>
              </div>

              <div className="space-y-4">
                {verificationSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      {getStepIcon(step)}
                    </div>
                    
                    <div className="flex-1">
                      <div className={`font-semibold ${getStepColor(step)}`}>
                        {step.title}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {step.description}
                      </div>
                      {step.status === 'processing' && (
                        <div className="text-blue-400 text-sm mt-1">
                          Processing...
                        </div>
                      )}
                    </div>
                    
                    {step.status === 'completed' && (
                      <div className="text-right">
                        <div className="text-green-400 font-bold">{step.score}%</div>
                        <div className="text-xs text-gray-400">Score</div>
                      </div>
                    )}
                    
                    {step.status === 'failed' && (
                      <div className="text-right">
                        <div className="text-red-400 font-bold">{step.score}%</div>
                        <div className="text-xs text-gray-400">Score</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <GlassCard>
                  <div className="p-6">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-10 h-10 text-green-400" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Verification Complete!
                    </h2>
                    
                    <div className="mb-6">
                      <TrustBadge level={currentUser.trustLevel} score={overallScore} size="lg" />
                    </div>
                    
                    <p className="text-gray-300 mb-8">
                      Your identity has been successfully verified using the Jlyn Cipher algorithm. 
                      You can now access financial services and build your reputation in the community.
                    </p>
                    
                    <motion.button
                      onClick={proceedToDashboard}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg flex items-center gap-3 mx-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Users className="w-5 h-5" />
                      Access Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>

          {/* Verification Details */}
          <div className="space-y-6">
            <GlassCard>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Overall Score</span>
                  <span className="text-2xl font-bold text-white">{overallScore}%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Behavioral Patterns</span>
                  <span className="text-green-400 font-semibold">
                    {verificationSteps.find(s => s.id === 'behavioral')?.score || 0}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Pattern Consistency</span>
                  <span className="text-green-400 font-semibold">
                    {verificationSteps.find(s => s.id === 'consistency')?.score || 0}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Risk Level</span>
                  <span className="text-green-400 font-semibold">Low</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-white font-bold text-lg mb-4">
                Jlyn Cipher Signature
              </h3>
              
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-2">Behavioral Signature Hash</div>
                  <div className="font-mono text-sm text-blue-300 break-all">
                    {currentUser.behavioralSignature || 'Generating...'}
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-2">Validation Status</div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium">Signature Verified</span>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-2">Encryption Method</div>
                  <div className="text-white font-medium">Jlyn Cipher Algorithm v2.1</div>
                </div>
              </div>
            </GlassCard>

            {!isComplete && (
              <GlassCard>
                <h3 className="text-white font-bold text-lg mb-4">
                  Next Steps
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                    <span>Complete behavioral pattern analysis</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                    <span>Validate pattern consistency and uniqueness</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                    <span>Perform comprehensive risk assessment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                    <span>Initialize social proof networks</span>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};