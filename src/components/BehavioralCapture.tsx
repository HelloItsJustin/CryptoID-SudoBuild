import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Zap, Shield } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { GlassCard } from './GlassCard';

export const BehavioralCapture: React.FC = () => {
  const { behavioralCapture } = useApp();
  const [patterns, setPatterns] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [signature, setSignature] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentPatterns = behavioralCapture.getPatterns();
      const currentConfidence = behavioralCapture.getOverallConfidence();
      const currentSignature = behavioralCapture.getSignature();
      
      setPatterns(currentPatterns.length);
      setConfidence(currentConfidence);
      setSignature(currentSignature);
      setIsCapturing(currentPatterns.length > 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [behavioralCapture]);

  const getConfidenceColor = (conf: number) => {
    if (conf < 0.3) return 'text-red-400';
    if (conf < 0.7) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Brain className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Jlyn Cipher Engine</h3>
          <p className="text-gray-300">Advanced Behavioral Biometrics</p>
        </div>
        {isCapturing && (
          <motion.div
            className="ml-auto p-2 bg-green-500/20 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Activity className="w-5 h-5 text-green-400" />
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">{patterns}</div>
          <div className="text-sm text-gray-300">Patterns Captured</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 ${getConfidenceColor(confidence)}`}>
            {Math.round(confidence * 100)}%
          </div>
          <div className="text-sm text-gray-300">Confidence</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Jlyn Signature</span>
        </div>
        <div className="bg-black/20 rounded-lg p-3 font-mono text-xs text-gray-300 break-all">
          {signature || 'Generating signature...'}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-300">
        <Zap className="w-4 h-4" />
        <span>Real-time behavioral analysis active</span>
      </div>

      {/* Visual feedback overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isCapturing 
            ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
            : 'transparent'
        }}
        transition={{ duration: 0.5 }}
      />
    </GlassCard>
  );
};