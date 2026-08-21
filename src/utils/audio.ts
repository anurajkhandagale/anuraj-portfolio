"use client";

// Web Audio API Synthesizer for Mechanical Keyboard Clicks, Chimes & Ambient Soundscapes
// Zero external assets needed, ultra-low latency, real-time procedural synthesis.

export type SoundscapeType = "lofi" | "rain" | "typing";

class SoundManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;

  // Soundscape active nodes
  private currentSoundscape: SoundscapeType | null = null;
  private soundscapeGain: GainNode | null = null;
  private soundscapeNodes: (AudioNode | number)[] = [];
  private soundscapeVolume: number = 0.35;
  private isSoundscapePlaying: boolean = false;

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
    } else {
      this.stopSoundscape();
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
    } else {
      this.stopSoundscape();
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
      // Audio fallback
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
      // Audio fallback
    }
  }

  // Physical Glass Knock Tap (*tap tap tap*)
  public playGlassKnock() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [0, 0.14, 0.28].forEach((offset) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, now + offset);
        osc.frequency.exponentialRampToValueAtTime(320, now + offset + 0.04);
        gain.gain.setValueAtTime(0.12, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.045);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.05);
      });
    } catch {
      // Audio fallback
    }
  }

  // =========================================================
  // REAL-TIME PROCEDURAL SOUNDSCAPE ENGINE (Web Audio API)
  // =========================================================

  public startSoundscape(type: SoundscapeType) {
    this.initCtx();
    if (!this.ctx) return;

    this.stopSoundscape();

    try {
      const now = this.ctx.currentTime;
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(this.soundscapeVolume, now + 1.2);
      masterGain.connect(this.ctx.destination);

      this.soundscapeGain = masterGain;
      this.currentSoundscape = type;
      this.isSoundscapePlaying = true;

      if (type === "lofi") {
        this.generateLoFiSoundscape(masterGain);
      } else if (type === "rain") {
        this.generateRainSoundscape(masterGain);
      } else if (type === "typing") {
        this.generateTypingSoundscape(masterGain);
      }
    } catch {
      // Soundscape fallback
    }
  }

  public stopSoundscape() {
    if (!this.ctx || !this.isSoundscapePlaying) return;

    try {
      const now = this.ctx.currentTime;
      if (this.soundscapeGain) {
        this.soundscapeGain.gain.setValueAtTime(this.soundscapeGain.gain.value, now);
        this.soundscapeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      }

      // Clear interval timers if any
      this.soundscapeNodes.forEach((node) => {
        if (typeof node === "number") {
          clearInterval(node);
        } else {
          try {
            (node as AudioNode).disconnect();
          } catch {}
        }
      });
      this.soundscapeNodes = [];

      setTimeout(() => {
        this.isSoundscapePlaying = false;
        this.currentSoundscape = null;
        this.soundscapeGain = null;
      }, 700);
    } catch {
      this.isSoundscapePlaying = false;
    }
  }

  public setSoundscapeVolume(vol: number) {
    this.soundscapeVolume = Math.max(0, Math.min(1, vol));
    if (this.soundscapeGain && this.ctx) {
      this.soundscapeGain.gain.setValueAtTime(this.soundscapeVolume, this.ctx.currentTime);
    }
  }

  public getSoundscapeState() {
    return {
      isPlaying: this.isSoundscapePlaying,
      type: this.currentSoundscape,
      volume: this.soundscapeVolume,
    };
  }

  // 1. Procedural Lo-Fi Chords & Sub-Bass Generator
  private generateLoFiSoundscape(destination: GainNode) {
    if (!this.ctx) return;

    // Calming Ebmaj7 -> Cm7 -> Fm7 -> Bb7 chord frequencies
    const chords = [
      [155.56, 196.0, 233.08, 293.66], // Ebmaj7
      [130.81, 155.56, 196.0, 233.08], // Cm7
      [174.61, 207.65, 261.63, 311.13], // Fm7
      [116.54, 174.61, 233.08, 261.63], // Bb7
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!this.ctx || !this.isSoundscapePlaying) return;

      const currentChord = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;

      const chordGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(550, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      chordGain.gain.setValueAtTime(0.001, now);
      chordGain.gain.linearRampToValueAtTime(0.12, now + 1.5);
      chordGain.gain.linearRampToValueAtTime(0.001, now + 5.8);

      currentChord.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        // Gentle subtle vibrato
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(4.2, now);
        lfoGain.gain.setValueAtTime(1.5, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + 6.0);

        osc.connect(filter);
        osc.start(now);
        osc.stop(now + 6.0);
      });

      filter.connect(chordGain);
      chordGain.connect(destination);
    };

    playChord();
    const interval = window.setInterval(playChord, 5600);
    this.soundscapeNodes.push(interval);
  }

  // 2. Procedural Rainy Cafe Ambience Generator (Pink Noise + Droplets)
  private generateRainSoundscape(destination: GainNode) {
    if (!this.ctx) return;

    // Pink Noise Buffer Generation
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(850, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(destination);
    whiteNoise.start(0);
    this.soundscapeNodes.push(whiteNoise, filter, rainGain);

    // Random soft raindrop taps
    const playDroplet = () => {
      if (!this.ctx || !this.isSoundscapePlaying) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(900 + Math.random() * 600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(destination);
      osc.start(now);
      osc.stop(now + 0.09);
    };

    const dropInterval = window.setInterval(() => {
      if (Math.random() > 0.3) playDroplet();
    }, 450);
    this.soundscapeNodes.push(dropInterval);
  }

  // 3. Procedural Mechanical Typing Rhythm Generator
  private generateTypingSoundscape(destination: GainNode) {
    if (!this.ctx) return;

    const playKey = () => {
      if (!this.ctx || !this.isSoundscapePlaying) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseFreq = 380 + Math.random() * 120;
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

      gain.gain.setValueAtTime(0.06 + Math.random() * 0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(destination);
      osc.start(now);
      osc.stop(now + 0.05);
    };

    const typeInterval = window.setInterval(() => {
      playKey();
      // Occasional rapid burst of 2-3 keystrokes
      if (Math.random() > 0.6) {
        setTimeout(playKey, 80);
      }
    }, 380);

    this.soundscapeNodes.push(typeInterval);
  }
}

export const soundManager = new SoundManager();
