// Simple sound effects for Fractal Flow
// Using Web Audio API for crisp, instant feedback

class SoundEngine {
  private audioContext: AudioContext | null = null;
  private enabled = true;

  constructor() {
    // Initialize audio context on first user interaction
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio API not supported');
      this.enabled = false;
    }
  }

  private async ensureAudioContext() {
    if (!this.audioContext || !this.enabled) return null;
    
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
    return this.audioContext;
  }

  // Discovery sound - satisfying chime
  async playDiscovery() {
    const ctx = await this.ensureAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Beautiful discovery chord
    oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
    oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
    
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.8);
  }

  // Combination sound - soft whoosh
  async playCombine() {
    const ctx = await this.ensureAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3);
    
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }

  // Level up sound - triumphant
  async playLevelUp() {
    const ctx = await this.ensureAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Ascending notes
    oscillator.frequency.setValueAtTime(392, ctx.currentTime); // G4
    oscillator.frequency.setValueAtTime(523, ctx.currentTime + 0.15); // C5
    oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.3); // E5
    oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.45); // G5
    
    oscillator.type = 'triangle';
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.2);
  }

  // Symbol click sound - subtle feedback
  async playSymbolClick() {
    const ctx = await this.ensureAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }

  // Enable/disable sounds
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundEngine = new SoundEngine();