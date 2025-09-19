export interface User {
  id: string;
  email: string;
  name: string;
  trustLevel: TrustLevel;
  verificationScore: number;
  behavioralSignature: string;
  createdAt: Date;
  lastVerified: Date;
  socialProof: SocialProof[];
  riskProfile: RiskProfile;
  demographics: Demographics;
}

export interface Demographics {
  country: string;
  region: string;
  occupation: string;
  bankingStatus: 'unbanked' | 'underbanked' | 'banked';
  scenario: string;
  challenges: string[];
}

export interface BehavioralPattern {
  id: string;
  type: 'keystroke' | 'mouse' | 'touch' | 'navigation';
  pattern: number[];
  confidence: number;
  timestamp: Date;
  jlynSignature: string;
}

export interface SocialProof {
  verifierId: string;
  verifierName: string;
  trustScore: number;
  verificationDate: Date;
  blockchainHash: string;
}

export interface RiskProfile {
  overallRisk: 'low' | 'medium' | 'high';
  geographicRisk: number;
  behavioralRisk: number;
  temporalRisk: number;
  deviceRisk: number;
  lastAssessment: Date;
}

export type TrustLevel = 'new' | 'developing' | 'verified' | 'trusted' | 'highly-trusted';

export interface VerificationSession {
  id: string;
  userId: string;
  startTime: Date;
  patterns: BehavioralPattern[];
  status: 'active' | 'completed' | 'failed';
  confidence: number;
}

export interface PeerConnection {
  id: string;
  peerId: string;
  status: 'connecting' | 'connected' | 'disconnected';
  latency: number;
  verifications: number;
}

export interface BlockchainCertificate {
  id: string;
  userId: string;
  hash: string;
  ipfsHash: string;
  smartContractAddress: string;
  confirmations: number;
  createdAt: Date;
}