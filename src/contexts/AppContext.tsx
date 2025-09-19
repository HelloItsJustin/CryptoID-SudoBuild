import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, VerificationSession, PeerConnection } from '../types';
import { BehavioralCapture } from '../utils/behavioralCapture';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  verificationSession: VerificationSession | null;
  setVerificationSession: (session: VerificationSession | null) => void;
  isOnline: boolean;
  behavioralCapture: BehavioralCapture;
  peerConnections: PeerConnection[];
  setPeerConnections: (connections: PeerConnection[]) => void;
  demoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [verificationSession, setVerificationSession] = useState<VerificationSession | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [behavioralCapture] = useState(new BehavioralCapture());
  const [peerConnections, setPeerConnections] = useState<PeerConnection[]>([]);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Start behavioral capture when app loads
    behavioralCapture.startCapture();
    
    return () => {
      behavioralCapture.reset();
    };
  }, [behavioralCapture]);

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    verificationSession,
    setVerificationSession,
    isOnline,
    behavioralCapture,
    peerConnections,
    setPeerConnections,
    demoMode,
    setDemoMode
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};