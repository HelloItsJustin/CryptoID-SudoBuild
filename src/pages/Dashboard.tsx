import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Shield, TrendingUp, Globe, Activity, Award, 
  CreditCard, Smartphone, Wifi, WifiOff, RefreshCw 
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import { GlassCard } from '../components/GlassCard';
import { TrustBadge } from '../components/TrustBadge';
import { useApp } from '../contexts/AppContext';
import { worldBankScenarios, createUserFromScenario, getRandomScenario } from '../data/worldBankScenarios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

export const Dashboard: React.FC = () => {
  const { currentUser, setCurrentUser, isOnline, demoMode, peerConnections } = useApp();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [trustHistory, setTrustHistory] = useState([65, 68, 72, 75, 78, 82, 85]);
  const [verificationCount, setVerificationCount] = useState(0);

  useEffect(() => {
    // If no user exists, create a demo user
    if (!currentUser) {
      const scenario = getRandomScenario();
      const demoUser = createUserFromScenario(scenario);
      demoUser.verificationScore = 85;
      demoUser.trustLevel = 'trusted';
      demoUser.behavioralSignature = 'JLYN_demo_comprehensive_signature_' + Date.now();
      setCurrentUser(demoUser);
    }
  }, [currentUser, setCurrentUser]);

  useEffect(() => {
    // Simulate verification count updates
    const interval = setInterval(() => {
      setVerificationCount(prev => prev + Math.random() > 0.7 ? 1 : 0);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const trustData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Current'],
    datasets: [
      {
        label: 'Trust Score',
        data: trustHistory,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const riskData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        data: [75, 20, 5],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderColor: ['#059669', '#d97706', '#dc2626'],
        borderWidth: 2
      }
    ]
  };

  const verificationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Successful Verifications',
        data: [12, 19, 15, 22, 28, 35],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  };

  const refreshData = () => {
    setTrustHistory(prev => [
      ...prev.slice(1),
      Math.min(100, prev[prev.length - 1] + (Math.random() * 4 - 1))
    ]);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'identity', label: 'Identity', icon: Shield },
    { id: 'social', label: 'Social Proof', icon: Users },
    { id: 'financial', label: 'Financial', icon: CreditCard },
    { id: 'network', label: 'Network', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-gray-300">
              Your invisible identity dashboard powered by Jlyn Cipher
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              isOnline ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
            }`}>
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              {isOnline ? 'Online' : 'Offline Mode'}
            </div>
            
            <button
              onClick={refreshData}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        <GlassCard className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{currentUser.name}</h2>
              <p className="text-gray-300 mb-3">
                {currentUser.demographics.occupation} • {currentUser.demographics.country}
              </p>
              <TrustBadge level={currentUser.trustLevel} score={currentUser.verificationScore} />
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{currentUser.verificationScore}%</div>
                <div className="text-sm text-gray-300">Trust Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{verificationCount + 23}</div>
                <div className="text-sm text-gray-300">Verifications</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{currentUser.socialProof.length + 8}</div>
                <div className="text-sm text-gray-300">Endorsements</div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <GlassCard>
                <h3 className="text-white font-bold text-lg mb-4">Trust Score Evolution</h3>
                <div className="h-64">
                  <Line 
                    data={trustData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false }
                      },
                      scales: {
                        x: { 
                          ticks: { color: '#9ca3af' },
                          grid: { color: 'rgba(255,255,255,0.1)' }
                        },
                        y: { 
                          ticks: { color: '#9ca3af' },
                          grid: { color: 'rgba(255,255,255,0.1)' }
                        }
                      }
                    }}
                  />
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-white font-bold text-lg mb-4">Verification History</h3>
                <div className="h-64">
                  <Bar
                    data={verificationData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false }
                      },
                      scales: {
                        x: { 
                          ticks: { color: '#9ca3af' },
                          grid: { display: false }
                        },
                        y: { 
                          ticks: { color: '#9ca3af' },
                          grid: { color: 'rgba(255,255,255,0.1)' }
                        }
                      }
                    }}
                  />
                </div>
              </GlassCard>
            </div>

            <div className="space-y-6">
              <GlassCard>
                <h3 className="text-white font-bold text-lg mb-4">Risk Assessment</h3>
                <div className="h-48">
                  <Doughnut
                    data={riskData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: { color: '#9ca3af' }
                        }
                      }
                    }}
                  />
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Identity Verified</div>
                      <div className="text-green-300 text-sm">First successful verification</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-500/20 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Trust Builder</div>
                      <div className="text-blue-300 text-sm">Reached 80% trust score</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-500/20 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Community Member</div>
                      <div className="text-purple-300 text-sm">5+ peer endorsements</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {selectedTab === 'identity' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <GlassCard>
              <h3 className="text-white font-bold text-lg mb-6">Behavioral Signature</h3>
              <div className="space-y-4">
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Jlyn Cipher Hash</div>
                  <div className="font-mono text-blue-300 text-sm break-all">
                    {currentUser.behavioralSignature}
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Last Updated</div>
                  <div className="text-white">
                    {currentUser.lastVerified.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Pattern Confidence</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: `${currentUser.verificationScore}%` }}
                      />
                    </div>
                    <span className="text-green-400 font-semibold">
                      {currentUser.verificationScore}%
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-white font-bold text-lg mb-6">Demographics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Country</span>
                  <span className="text-white font-medium">{currentUser.demographics.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Region</span>
                  <span className="text-white font-medium">{currentUser.demographics.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Occupation</span>
                  <span className="text-white font-medium">{currentUser.demographics.occupation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Banking Status</span>
                  <span className="text-white font-medium capitalize">
                    {currentUser.demographics.bankingStatus}
                  </span>
                </div>
                <div className="mt-6">
                  <div className="text-gray-300 mb-2">Challenges</div>
                  <div className="space-y-2">
                    {currentUser.demographics.challenges.map(challenge => (
                      <div key={challenge} className="text-sm text-gray-400 bg-black/20 rounded px-3 py-2">
                        {challenge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {selectedTab === 'social' && (
          <div className="space-y-6">
            <GlassCard>
              <h3 className="text-white font-bold text-lg mb-6">Social Proof Network</h3>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">
                  Build your reputation through community endorsements
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
                  Find Community Members
                </button>
              </div>
            </GlassCard>
          </div>
        )}

        {selectedTab === 'financial' && (
          <div className="space-y-6">
            <GlassCard>
              <h3 className="text-white font-bold text-lg mb-6">Financial Services Access</h3>
              <div className="text-center py-12">
                <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">
                  Access financial services through verified identity
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg">
                  Explore Services
                </button>
              </div>
            </GlassCard>
          </div>
        )}

        {selectedTab === 'network' && (
          <div className="space-y-6">
            <GlassCard>
              <h3 className="text-white font-bold text-lg mb-6">Peer Network</h3>
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">
                  Connect with peers for mutual verification
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg">
                  Join Network
                </button>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};