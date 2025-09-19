import { User, Demographics } from '../types';

export const worldBankScenarios: Array<{
  user: Omit<User, 'id' | 'createdAt' | 'lastVerified'>;
  story: string;
  challenges: string[];
  impact: string;
}> = [
  {
    user: {
      email: 'rashida.farmer@example.bd',
      name: 'Rashida Begum',
      trustLevel: 'new',
      verificationScore: 0,
      behavioralSignature: '',
      socialProof: [],
      riskProfile: {
        overallRisk: 'medium',
        geographicRisk: 0.6,
        behavioralRisk: 0.2,
        temporalRisk: 0.3,
        deviceRisk: 0.7,
        lastAssessment: new Date()
      },
      demographics: {
        country: 'Bangladesh',
        region: 'Rural Rangpur',
        occupation: 'Smallholder Farmer',
        bankingStatus: 'unbanked',
        scenario: 'Rural farmer with seasonal income',
        challenges: ['No formal documents', 'Limited connectivity', 'Irregular income', 'Remote location']
      }
    },
    story: 'Rashida is a 32-year-old rice farmer in rural Bangladesh who grows crops seasonally and needs access to microfinance for seeds and equipment. She has never had a bank account due to lack of documentation and the nearest bank branch being 50km away.',
    challenges: [
      'No birth certificate or formal ID documents',
      'Seasonal income makes traditional credit assessment difficult',
      'Limited smartphone with intermittent internet connectivity',
      'Language barriers with formal financial institutions'
    ],
    impact: 'CryptoID enables Rashida to build a trusted digital identity through behavioral patterns, connecting her to mobile money services and agricultural microfinance programs.'
  },
  {
    user: {
      email: 'chidi.vendor@example.ng',
      name: 'Chidi Okoro',
      trustLevel: 'developing',
      verificationScore: 45,
      behavioralSignature: 'JLYN_demo_signature_001',
      socialProof: [],
      riskProfile: {
        overallRisk: 'low',
        geographicRisk: 0.3,
        behavioralRisk: 0.2,
        temporalRisk: 0.2,
        deviceRisk: 0.4,
        lastAssessment: new Date()
      },
      demographics: {
        country: 'Nigeria',
        region: 'Lagos Urban',
        occupation: 'Street Vendor',
        bankingStatus: 'underbanked',
        scenario: 'Urban informal economy worker',
        challenges: ['Irregular income', 'No business registration', 'Cash-only transactions']
      }
    },
    story: 'Chidi sells phone accessories and electronics in Lagos markets. Despite earning steady income, he cannot access formal banking due to lack of business registration and inconsistent documentation of his earnings.',
    challenges: [
      'All transactions are cash-based with no formal records',
      'Income varies daily based on market conditions',
      'No business license or tax identification',
      'Limited understanding of formal banking requirements'
    ],
    impact: 'Through CryptoID, Chidi can establish creditworthiness based on consistent behavioral patterns and peer verification from other market vendors.'
  },
  {
    user: {
      email: 'maria.domestic@example.ph',
      name: 'Maria Santos',
      trustLevel: 'verified',
      verificationScore: 78,
      behavioralSignature: 'JLYN_demo_signature_002',
      socialProof: [
        {
          verifierId: 'peer_001',
          verifierName: 'Rosa Martinez',
          trustScore: 0.85,
          verificationDate: new Date(),
          blockchainHash: '0x1234...abcd'
        }
      ],
      riskProfile: {
        overallRisk: 'low',
        geographicRisk: 0.2,
        behavioralRisk: 0.1,
        temporalRisk: 0.2,
        deviceRisk: 0.3,
        lastAssessment: new Date()
      },
      demographics: {
        country: 'Philippines',
        region: 'Metro Manila',
        occupation: 'Domestic Worker',
        bankingStatus: 'underbanked',
        scenario: 'Migrant worker sending remittances',
        challenges: ['High remittance fees', 'Limited branch access', 'Documentation barriers']
      }
    },
    story: 'Maria works as a domestic helper in Manila and sends money monthly to her family in the province. Traditional remittance services charge high fees and require extensive documentation.',
    challenges: [
      'High fees for money transfers (8-15% of transaction value)',
      'Limited access to bank branches during working hours',
      'Need multiple forms of ID for each transaction',
      'Long queues and waiting times for remittance services'
    ],
    impact: 'CryptoID allows Maria to use peer-to-peer networks for secure, low-cost remittances verified through behavioral biometrics.'
  },
  {
    user: {
      email: 'ahmed.refugee@example.ke',
      name: 'Ahmed Hassan',
      trustLevel: 'new',
      verificationScore: 12,
      behavioralSignature: '',
      socialProof: [],
      riskProfile: {
        overallRisk: 'high',
        geographicRisk: 0.8,
        behavioralRisk: 0.5,
        temporalRisk: 0.6,
        deviceRisk: 0.9,
        lastAssessment: new Date()
      },
      demographics: {
        country: 'Kenya',
        region: 'Dadaab Refugee Camp',
        occupation: 'Shop Keeper',
        bankingStatus: 'unbanked',
        scenario: 'Displaced person without documentation',
        challenges: ['No national ID', 'Restricted movement', 'Limited technology access']
      }
    },
    story: 'Ahmed fled conflict in Somalia and now lives in Dadaab refugee camp. He runs a small shop but cannot access any financial services due to lack of recognized identification documents.',
    challenges: [
      'No passport, national ID, or birth certificate',
      'Restricted movement outside refugee camp',
      'Limited access to smartphones or internet',
      'Cannot open bank accounts or access credit'
    ],
    impact: 'CryptoID provides Ahmed with a pathway to build trusted identity through community verification and behavioral patterns, enabling access to humanitarian financial services.'
  }
];

export const getRandomScenario = () => {
  return worldBankScenarios[Math.floor(Math.random() * worldBankScenarios.length)];
};

export const createUserFromScenario = (scenario: typeof worldBankScenarios[0]) => {
  return {
    ...scenario.user,
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
    lastVerified: new Date()
  };
};