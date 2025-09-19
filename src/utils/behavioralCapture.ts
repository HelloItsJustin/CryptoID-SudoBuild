import { BehavioralPattern } from '../types';
import { JlynCipher } from './jlynCipher';

export class BehavioralCapture {
  private patterns: BehavioralPattern[] = [];
  private keystrokeData: Array<{ key: string; timestamp: number; type: 'down' | 'up' }> = [];
  private mouseData: Array<{ x: number; y: number; timestamp: number; type: string }> = [];
  private touchData: Array<{ x: number; y: number; pressure: number; timestamp: number }> = [];

  startCapture(): void {
    this.setupKeystrokeCapture();
    this.setupMouseCapture();
    this.setupTouchCapture();
    this.setupNavigationCapture();
  }

  private setupKeystrokeCapture(): void {
    const handleKeyDown = (e: KeyboardEvent) => {
      this.keystrokeData.push({
        key: e.key,
        timestamp: performance.now(),
        type: 'down'
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      this.keystrokeData.push({
        key: e.key,
        timestamp: performance.now(),
        type: 'up'
      });
      
      this.analyzeKeystrokePattern();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }

  private setupMouseCapture(): void {
    document.addEventListener('mousemove', (e) => {
      this.mouseData.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: performance.now(),
        type: 'move'
      });
    });

    document.addEventListener('click', (e) => {
      this.mouseData.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: performance.now(),
        type: 'click'
      });
      
      this.analyzeMousePattern();
    });
  }

  private setupTouchCapture(): void {
    document.addEventListener('touchstart', (e) => {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        this.touchData.push({
          x: touch.clientX,
          y: touch.clientY,
          pressure: (touch as any).force || 0.5,
          timestamp: performance.now()
        });
      }
    });
  }

  private setupNavigationCapture(): void {
    // Focus patterns
    document.addEventListener('focusin', () => {
      this.recordNavigationPattern('focus_in');
    });

    document.addEventListener('focusout', () => {
      this.recordNavigationPattern('focus_out');
    });

    // Scroll patterns
    document.addEventListener('scroll', () => {
      this.recordNavigationPattern('scroll');
    });
  }

  private analyzeKeystrokePattern(): void {
    if (this.keystrokeData.length < 4) return;

    const recentData = this.keystrokeData.slice(-4);
    const dwellTimes: number[] = [];
    const flightTimes: number[] = [];

    // Calculate dwell times (time between keydown and keyup)
    for (let i = 0; i < recentData.length - 1; i++) {
      if (recentData[i].type === 'down' && recentData[i + 1].type === 'up' 
          && recentData[i].key === recentData[i + 1].key) {
        dwellTimes.push(recentData[i + 1].timestamp - recentData[i].timestamp);
      }
    }

    // Calculate flight times (time between key releases and next key presses)
    for (let i = 0; i < recentData.length - 2; i++) {
      if (recentData[i].type === 'up' && recentData[i + 2].type === 'down') {
        flightTimes.push(recentData[i + 2].timestamp - recentData[i].timestamp);
      }
    }

    if (dwellTimes.length > 0 || flightTimes.length > 0) {
      const pattern: BehavioralPattern = {
        id: `keystroke_${Date.now()}`,
        type: 'keystroke',
        pattern: [...dwellTimes, ...flightTimes],
        confidence: this.calculateConfidence([...dwellTimes, ...flightTimes]),
        timestamp: new Date(),
        jlynSignature: JlynCipher.generateSignature([...dwellTimes, ...flightTimes])
      };

      this.patterns.push(pattern);
    }
  }

  private analyzeMousePattern(): void {
    if (this.mouseData.length < 5) return;

    const recentData = this.mouseData.slice(-5);
    const velocities: number[] = [];
    const accelerations: number[] = [];

    // Calculate velocities
    for (let i = 0; i < recentData.length - 1; i++) {
      const dx = recentData[i + 1].x - recentData[i].x;
      const dy = recentData[i + 1].y - recentData[i].y;
      const dt = recentData[i + 1].timestamp - recentData[i].timestamp;
      
      if (dt > 0) {
        const velocity = Math.sqrt(dx * dx + dy * dy) / dt;
        velocities.push(velocity);
      }
    }

    // Calculate accelerations
    for (let i = 0; i < velocities.length - 1; i++) {
      accelerations.push(Math.abs(velocities[i + 1] - velocities[i]));
    }

    if (velocities.length > 0) {
      const pattern: BehavioralPattern = {
        id: `mouse_${Date.now()}`,
        type: 'mouse',
        pattern: [...velocities, ...accelerations],
        confidence: this.calculateConfidence([...velocities, ...accelerations]),
        timestamp: new Date(),
        jlynSignature: JlynCipher.generateSignature([...velocities, ...accelerations])
      };

      this.patterns.push(pattern);
    }
  }

  private recordNavigationPattern(type: string): void {
    const timestamp = performance.now();
    const pattern: BehavioralPattern = {
      id: `nav_${Date.now()}`,
      type: 'navigation',
      pattern: [timestamp % 1000], // Simple pattern for demo
      confidence: 0.8,
      timestamp: new Date(),
      jlynSignature: JlynCipher.generateSignature([timestamp % 1000])
    };

    this.patterns.push(pattern);
  }

  private calculateConfidence(pattern: number[]): number {
    if (pattern.length === 0) return 0;
    
    // Simple confidence calculation based on pattern consistency
    const mean = pattern.reduce((a, b) => a + b) / pattern.length;
    const variance = pattern.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / pattern.length;
    const stdDev = Math.sqrt(variance);
    
    // Lower standard deviation = higher confidence
    return Math.max(0.3, Math.min(1.0, 1 - (stdDev / mean || 0)));
  }

  getPatterns(): BehavioralPattern[] {
    return this.patterns;
  }

  getOverallConfidence(): number {
    if (this.patterns.length === 0) return 0;
    
    const totalConfidence = this.patterns.reduce((sum, p) => sum + p.confidence, 0);
    return totalConfidence / this.patterns.length;
  }

  getSignature(): string {
    const allPatterns = this.patterns.flatMap(p => p.pattern);
    return JlynCipher.generateSignature(allPatterns);
  }

  reset(): void {
    this.patterns = [];
    this.keystrokeData = [];
    this.mouseData = [];
    this.touchData = [];
  }
}