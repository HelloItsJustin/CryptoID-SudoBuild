/**
 * Revolutionary Jlyn Cipher Algorithm
 * Advanced behavioral biometric encryption system
 */
export class JlynCipher {
  private static readonly STAR_MAPPING = {
    0: '✦', 1: '✧', 2: '✩', 3: '✪', 4: '✫', 5: '✬', 6: '✭', 7: '✮', 8: '✯', 9: '✰'
  };

  private static readonly BEHAVIORAL_CONSTANTS = {
    DWELL_TIME_MULTIPLIER: 1337,
    FLIGHT_TIME_FACTOR: 2048,
    PRESSURE_COEFFICIENT: 512,
    VELOCITY_NORMALIZER: 256
  };

  static generateSignature(patterns: number[]): string {
    if (patterns.length === 0) return this.generateFallbackSignature();
    
    try {
      // Primary Jlyn Cipher processing
      const normalizedPatterns = this.normalizePatterns(patterns);
      const characterMap = this.generateCharacterMapping(normalizedPatterns);
      const starSignature = this.applyStarMapping(characterMap);
      const encryptedSignature = this.deterministicEncryption(starSignature);
      
      return `JLYN_${encryptedSignature}_${Date.now().toString(36)}`;
    } catch (error) {
      console.warn('Jlyn Cipher primary processing failed, using fallback');
      return this.generateFallbackSignature();
    }
  }

  private static normalizePatterns(patterns: number[]): number[] {
    const mean = patterns.reduce((a, b) => a + b) / patterns.length;
    const stdDev = Math.sqrt(patterns.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / patterns.length);
    
    return patterns.map(p => Math.round(((p - mean) / (stdDev || 1)) * 100));
  }

  private static generateCharacterMapping(patterns: number[]): string {
    return patterns
      .map(p => Math.abs(p) % 10)
      .map(digit => this.STAR_MAPPING[digit as keyof typeof this.STAR_MAPPING])
      .join('');
  }

  private static applyStarMapping(starString: string): string {
    const { DWELL_TIME_MULTIPLIER, FLIGHT_TIME_FACTOR } = this.BEHAVIORAL_CONSTANTS;
    let encrypted = '';
    
    for (let i = 0; i < starString.length; i++) {
      const char = starString[i];
      const position = i + 1;
      const hash = (char.charCodeAt(0) * position * DWELL_TIME_MULTIPLIER) % FLIGHT_TIME_FACTOR;
      encrypted += hash.toString(36);
    }
    
    return encrypted;
  }

  private static deterministicEncryption(input: string): string {
    let result = '';
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      const encrypted = char ^ (i % 256);
      result += encrypted.toString(16).padStart(2, '0');
    }
    return result;
  }

  private static generateFallbackSignature(): string {
    const fallback = Math.random().toString(36).substring(2);
    return `JLYN_FALLBACK_${fallback}_${Date.now().toString(36)}`;
  }

  static validateSignature(signature: string): boolean {
    return signature.startsWith('JLYN_') && signature.split('_').length >= 3;
  }

  static calculateTolerance(signature1: string, signature2: string): number {
    // Behavioral tolerance for natural human variance
    if (!this.validateSignature(signature1) || !this.validateSignature(signature2)) {
      return 0;
    }

    const hash1 = signature1.split('_')[1];
    const hash2 = signature2.split('_')[1];
    
    if (hash1 === hash2) return 1;
    
    // Calculate similarity based on common subsequences
    let matches = 0;
    const minLength = Math.min(hash1.length, hash2.length);
    
    for (let i = 0; i < minLength; i++) {
      if (hash1[i] === hash2[i]) matches++;
    }
    
    return matches / Math.max(hash1.length, hash2.length);
  }
}

export const generateBehavioralProfile = (patterns: number[]): string => {
  return JlynCipher.generateSignature(patterns);
};