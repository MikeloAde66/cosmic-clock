class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  public toggle(kpIndex: number = 2.1): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(kpIndex);
      return true;
    }
  }

  public start(kpIndex: number) {
    if (!this.ctx) return;

    // Master Gain / Volume Control
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime); // Soft background level
    this.gainNode.connect(this.ctx.destination);

    // Fundamental Frequency: 432 Hz
    const baseFreq = 432;
    const kpOffset = (kpIndex - 2.1) * 2; // Dynamic shift based on solar activity

    // Primary Oscillator: Warm Sine Wave
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = "sine";
    this.osc1.frequency.setValueAtTime(baseFreq + kpOffset, this.ctx.currentTime);
    this.osc1.connect(this.gainNode);

    // Harmonic Sub Oscillator: Perfect Fifth Down (-7 semitones / 288 Hz fundamental)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = "triangle";
    this.osc2.frequency.setValueAtTime((baseFreq / 1.5) + kpOffset, this.ctx.currentTime);
    this.osc2.connect(this.gainNode);

    this.osc1.start();
    this.osc2.start();
    this.isPlaying = true;
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      // Smooth fade out to prevent clicking
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        this.osc1?.stop();
        this.osc2?.stop();
        this.osc1?.disconnect();
        this.osc2?.disconnect();
        this.isPlaying = false;
      }, 500);
    }
  }

  public updateFrequency(kpIndex: number) {
    if (!this.isPlaying || !this.ctx || !this.osc1 || !this.osc2) return;
    const baseFreq = 432;
    const kpOffset = (kpIndex - 2.1) * 2;
    this.osc1.frequency.setTargetAtTime(baseFreq + kpOffset, this.ctx.currentTime, 0.1);
    this.osc2.frequency.setTargetAtTime((baseFreq / 1.5) + kpOffset, this.ctx.currentTime, 0.1);
  }
}

export const audioEngine = new CosmicAudioEngine();
