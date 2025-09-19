import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Zap, ArrowRight, Play, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { TrustBadge } from '../components/TrustBadge';
import { useApp } from '../contexts/AppContext';

export const Home: React.FC = () => {
  const { setDemoMode, isOnline } = useApp();
  const [animatedStats, setAnimatedStats] = useState({
    unbanked: 0,
    countries: 0,
    verification: 0
  });

  useEffect(() => {
    // Animate statistics on load
    const targets = { unbanked: 1600000000, countries: 120, verification: 99.7 };
    const duration = 2000;
    const steps = 60;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        unbanked: Math.round(targets.unbanked * easeOut),
        countries: Math.round(targets.countries * easeOut),
        verification: parseFloat((targets.verification * easeOut).toFixed(1))
      });

      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const startDemo = () => {
    setDemoMode(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, #8b5cf6 0%, transparent 50%)',
              'radial-gradient(circle at 40% 50%, #3b82f6 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        
        <div className="relative z-10 px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-8">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-medium">Powered by Jlyn Cipher Algorithm</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  CryptoID
                </span>
                <br />
                Invisible Identity
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
                Revolutionary behavioral biometrics platform serving 1.6 billion unbanked people worldwide
              </p>

              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                Advanced identity verification using the proprietary Jlyn Cipher encryption system for financial inclusion without traditional documentation
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/capture">
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Zap className="w-5 h-5" />
                    Start Identity Capture
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                <motion.button
                  onClick={startDemo}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Global Impact Statistics */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Global Financial Exclusion Crisis
            </h2>
            <p className="text-gray-300 text-lg">
              Real data from World Bank Global Findex Database 2021
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {animatedStats.unbanked.toLocaleString()}
              </div>
              <div className="text-white font-semibold mb-2">Unbanked Adults</div>
              <div className="text-gray-300 text-sm">
                People without access to formal financial services
              </div>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {animatedStats.countries}+
              </div>
              <div className="text-white font-semibold mb-2">Countries</div>
              <div className="text-gray-300 text-sm">
                Economies with significant unbanked populations
              </div>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {animatedStats.verification}%
              </div>
              <div className="text-white font-semibold mb-2">Accuracy</div>
              <div className="text-gray-300 text-sm">
                Jlyn Cipher behavioral verification rate
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-4 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Revolutionary Technology Stack
            </h2>
            <p className="text-gray-300 text-lg">
              Advanced behavioral biometrics with social proof verification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Jlyn Cipher</h3>
              <p className="text-gray-300 text-sm">
                Proprietary encryption for behavioral pattern signatures
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Social Proof</h3>
              <p className="text-gray-300 text-sm">
                Community-based identity verification networks
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Offline First</h3>
              <p className="text-gray-300 text-sm">
                Works completely offline with mesh networking
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Real-time</h3>
              <p className="text-gray-300 text-sm">
                Continuous authentication in 3-5 minutes
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Trust Levels Demo */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Progressive Trust Building
            </h2>
            <p className="text-gray-300 text-lg">
              Build reputation over time through consistent behavioral patterns
            </p>
          </div>

          <GlassCard>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <TrustBadge level="new" score={0} />
                  <p className="text-gray-300 mt-2 text-sm">Initial registration with basic verification</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">0-20%</div>
                  <div className="text-gray-400 text-sm">Trust Score</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <TrustBadge level="developing" score={45} />
                  <p className="text-gray-300 mt-2 text-sm">Regular usage with consistent patterns</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">21-50%</div>
                  <div className="text-gray-400 text-sm">Trust Score</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <TrustBadge level="verified" score={75} />
                  <p className="text-gray-300 mt-2 text-sm">Community endorsements and stable behavior</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">51-80%</div>
                  <div className="text-gray-400 text-sm">Trust Score</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <TrustBadge level="highly-trusted" score={95} />
                  <p className="text-gray-300 mt-2 text-sm">Extensive verification history and high reputation</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">81-100%</div>
                  <div className="text-gray-400 text-sm">Trust Score</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Start building your invisible identity today with CryptoID's revolutionary behavioral biometrics platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/capture">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  Begin Identity Capture
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300">
                  View Demo Dashboard
                </button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Status Indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
          isOnline ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
        } backdrop-blur-md border ${
          isOnline ? 'border-green-500/30' : 'border-red-500/30'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
    </div>
  );
};