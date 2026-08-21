"use client";

// Web Audio API Synthesizer for Mechanical Keyboard Clicks & Chimes
// Zero external assets needed, ultra-low latency, works in all browsers.

class SoundManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true; // Enabled by default as requested

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.initCtx();
      this.playChime();
    }
    return this.isEnabled;
  }

  public getSoundEnabled(): boolean {
    return this.isEnabled;
  }

  public setSoundEnabled(val: boolean) {
    this.isEnabled = val;
    if (this.isEnabled) {
      this.initCtx();
    }
  }

  // Mechanical Keystroke click
  public playClick() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Subtle mechanical click envelope
      osc.type = "sine";
      osc.frequency.setValueAtTime(450 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio not permitted yet
    }
  }

  // Compile / Success Chime
  public playChime() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Audio error fallback
    }
  }
}

export const soundManager = new SoundManager();
