import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Shield, Check, ArrowRight, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { BehavioralCapture } from '../components/BehavioralCapture';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useApp } from '../contexts/AppContext';
import { worldBankScenarios, createUserFromScenario } from '../data/worldBankScenarios';

interface CaptureStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  duration: number;
  patterns: string[];
}

export const IdentityCapture: React.FC = () => {
  const navigate = useNavigate();
  const { behavioralCapture, setCurrentUser, demoMode } = useApp();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureProgress, setCaptureProgress] = useState(0);
  const [testInput, setTestInput] = useState('');
  const [selectedScenario, setSelectedScenario] = useState(worldBankScenarios[0]);

  const steps: CaptureStep[] = [
    {
      id: 'keystroke',
      title: 'Keystroke Dynamics',
      description: 'Type naturally to capture your unique typing patterns',
      icon: Fingerprint,
      duration: 30000,
      patterns: ['Dwell time measurement', 'Flight time calculation', 'Typing rhythm analysis']
    },
    {
      id: 'mouse',
      title: 'Mouse Movement',
      description: 'Move your cursor naturally across the interface',
      icon: Activity,
      duration: 20000,
      patterns: ['Velocity tracking', 'Acceleration patterns', 'Cursor positioning']
    },
    {
      id: 'navigation',
      title: 'Navigation Patterns',
      description: 'Navigate through the interface to capture behavior',
      icon: Brain,
      duration: 15000,
      patterns: ['Focus changes', 'Click patterns', 'Interaction timing']
    }
  ];

  useEffect(() => {
    if (demoMode) {
      // In demo mode, randomly select a scenario
      const randomScenario = worldBankScenarios[Math.floor(Math.random() * worldBankScenarios.length)];
      setSelectedScenario(randomScenario);
    }
  }, [demoMode]);

  const startCapture = () => {
    setIsCapturing(true);
    setCaptureProgress(0);
    setCurrentStep(0);
    
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;
    
    const interval = setInterval(() => {
      elapsed += 1000;
      const progress = (elapsed / totalDuration) * 100;
      setCaptureProgress(Math.min(progress, 100));
      
      // Move to next step based on elapsed time
      let stepElapsed = 0;
      for (let i = 0; i < steps.length; i++) {
        stepElapsed += steps[i].duration;
        if (elapsed <= stepElapsed) {
          setCurrentStep(i);
          break;
        }
      }
      
      if (elapsed >= totalDuration) {
        clearInterval(interval);
        completeCapture();
      }
    }, 1000);
    
    return () => clearInterval(interval);
  };

  const completeCapture = () => {
    const patterns = behavioralCapture.getPatterns();
    const confidence = behavioralCapture.getOverallConfidence();
    const signature = behavioralCapture.getSignature();
    
    // Create user from selected scenario
    const newUser = createUserFromScenario(selectedScenario);
    newUser.behavioralSignature = signature;
    newUser.verificationScore = Math.round(confidence * 100);
    
    setCurrentUser(newUser);
    setIsCapturing(false);
    
    setTimeout(() => {
      navigate('/verification');
    }, 2000);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Identity Capture
          </h1>
          <p className="text-xl text-gray-300">
            Creating your invisible identity with Jlyn Cipher behavioral biometrics
          </p>
        </div>

        {demoMode && (
          <GlassCard className="mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {selectedScenario.user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{selectedScenario.user.name}</h3>
                <p className="text-gray-300">{selectedScenario.user.demographics.occupation}, {selectedScenario.user.demographics.country}</p>
                <p className="text-sm text-gray-400 mt-1">{selectedScenario.story}</p>
              </div>
            </div>
          </GlassCard>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Capture Interface */}
          <div className="space-y-6">
            {!isCapturing ? (
              <GlassCard>
                <div className="text-center">
                  <div className="p-6 bg-blue-500/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-12 h-12 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Ready to Capture Your Identity
                  </h2>
                  <p className="text-gray-300 mb-8">
                    The Jlyn Cipher algorithm will analyze your unique behavioral patterns through natural interaction
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <step.icon className="w-5 h-5 text-blue-400" />
                        <div className="text-left">
                          <div className="text-white font-medium">{step.title}</div>
                          <div className="text-gray-300 text-sm">{step.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={startCapture}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg flex items-center gap-3 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Brain className="w-5 h-5" />
                    Start Capture
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard>
                <div className="text-center mb-6">
                  <div className="flex items-center gap-3 justify-center mb-4">
                    <currentStepData.icon className="w-8 h-8 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">
                      {currentStepData.title}
                    </h2>
                  </div>
                  <p className="text-gray-300 mb-6">
                    {currentStepData.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${captureProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  <div className="text-white font-bold text-lg mb-4">
                    {Math.round(captureProgress)}% Complete
                  </div>
                </div>

                {/* Interactive Elements */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <label className="block text-white font-medium">
                      Type naturally in the field below:
                    </label>
                    <textarea
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      className="w-full h-32 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none"
                      placeholder="Share your thoughts about financial inclusion, your goals, or simply type anything that comes to mind. Your typing patterns are being captured securely..."
                      autoFocus
                    />
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <label className="block text-white font-medium">
                      Move your mouse naturally around this area:
                    </label>
                    <div className="w-full h-48 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/20 rounded-lg flex items-center justify-center">
                      <p className="text-gray-300 text-center">
                        Move your cursor around this area<br />
                        Click on different spots<br />
                        Your mouse patterns are being captured
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <label className="block text-white font-medium">
                      Navigate through these interactive elements:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <button
                          key={i}
                          className="p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
                        >
                          Element {i}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Current Step Patterns */}
                <div className="mt-6 p-4 bg-black/20 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Capturing:</h4>
                  <div className="space-y-1">
                    {currentStepData.patterns.map(pattern => (
                      <div key={pattern} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        {pattern}
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )}

            {captureProgress === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <GlassCard>
                  <div className="p-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Capture Complete!
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Your behavioral signature has been generated using the Jlyn Cipher algorithm
                    </p>
                    <LoadingSpinner text="Redirecting to verification..." />
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>

          {/* Real-time Analysis */}
          <div className="space-y-6">
            <BehavioralCapture />
            
            {isCapturing && (
              <GlassCard>
                <h3 className="text-white font-bold text-lg mb-4">
                  Real-time Analysis
                </h3>
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < currentStep ? 'bg-green-500/20 text-green-400' :
                        index === currentStep ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {index < currentStep ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <step.icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          index <= currentStep ? 'text-white' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-sm text-gray-300">
                          {step.description}
                        </div>
                      </div>
                      {index === currentStep && (
                        <div className="text-blue-400">
                          <Activity className="w-4 h-4 animate-pulse" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};