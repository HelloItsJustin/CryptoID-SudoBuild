import React from 'react';
import { Shield, ShieldCheck, Star, Crown } from 'lucide-react';
import { TrustLevel } from '../types';

interface TrustBadgeProps {
  level: TrustLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ level, score, size = 'md' }) => {
  const configs = {
    'new': {
      icon: Shield,
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/20',
      label: 'New User'
    },
    'developing': {
      icon: Shield,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      label: 'Developing Trust'
    },
    'verified': {
      icon: ShieldCheck,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      label: 'Verified'
    },
    'trusted': {
      icon: Star,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      label: 'Trusted'
    },
    'highly-trusted': {
      icon: Crown,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      label: 'Highly Trusted'
    }
  };

  const sizeClasses = {
    sm: { icon: 'w-4 h-4', text: 'text-xs', padding: 'px-2 py-1' },
    md: { icon: 'w-5 h-5', text: 'text-sm', padding: 'px-3 py-1.5' },
    lg: { icon: 'w-6 h-6', text: 'text-base', padding: 'px-4 py-2' }
  };

  const config = configs[level];
  const sizeClass = sizeClasses[size];
  const Icon = config.icon;

  return (
    <div className={`
      inline-flex items-center gap-2 rounded-full
      ${config.bgColor} ${config.color} ${sizeClass.padding}
      border border-current/20
    `}>
      <Icon className={sizeClass.icon} />
      <span className={`font-semibold ${sizeClass.text}`}>
        {config.label}
      </span>
      {score !== undefined && (
        <span className={`opacity-75 ${sizeClass.text}`}>
          ({Math.round(score)}%)
        </span>
      )}
    </div>
  );
};