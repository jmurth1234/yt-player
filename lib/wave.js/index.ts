import { IAnimation } from "./types"
import { Arcs, IArcsOptions } from "./animations/Arcs";
import { Circles, ICirclesOptions } from "./animations/Circles";
import { Cubes, ICubesOptions } from "./animations/Cubes";
import { Flower, IFlowerOptions } from "./animations/Flower";
import { Glob, IGlobOptions } from "./animations/Glob";
import { Lines, ILinesOptions } from "./animations/Lines";
import { Shine, IShineOptions } from "./animations/Shine";
import { Square, ISquareOptions } from "./animations/Square";
import { Turntable, ITurntableOptions } from "./animations/Turntable";
import { Wave as WaveAnimation, IWaveOptions } from "./animations/Wave";

export type { IArcsOptions, ICirclesOptions, ICubesOptions, IFlowerOptions, IGlobOptions, ILinesOptions, IShineOptions, ISquareOptions, ITurntableOptions, IWaveOptions };

// fork of https://github.com/foobar404/Wave.js to handle cross page initialising
export class Wave {
    public animations = {
        "Arcs": Arcs,
        "Circles": Circles,
        "Cubes": Cubes,
        "Flower": Flower,
        "Glob": Glob,
        "Lines": Lines,
        "Shine": Shine,
        "Square": Square,
        "Turntable": Turntable,
        "Wave": WaveAnimation
    };
    private _activeAnimations: IAnimation[] = [];
    private _audioElement: HTMLAudioElement;
    private _canvasElement: HTMLCanvasElement;
    private _canvasContext: CanvasRenderingContext2D;
    private _audioAnalyser: AnalyserNode;

    private static _audioContext: AudioContext;
    private static _audioSource: MediaElementAudioSourceNode;

    constructor(audioElement: HTMLAudioElement, canvasElement: HTMLCanvasElement) {
        this._audioElement = audioElement;
        this._canvasElement = canvasElement;
        this._canvasContext = this._canvasElement.getContext("2d");

        this._initAudioContext();
    }

    private _initAudioContext(): void {
        if (!Wave._audioContext) {
            Wave._audioContext = new AudioContext();
            Wave._audioSource = Wave._audioContext.createMediaElementSource(this._audioElement);
        }
        this._audioAnalyser = Wave._audioContext.createAnalyser();
        this._play();
    }

    public destroy(): void {
        this._audioElement.removeEventListener("play", this._initAudioContext);

        try {
            if (Wave._audioSource && Wave._audioSource.channelCount > 0) {
                Wave._audioSource.disconnect(this._audioAnalyser);
                Wave._audioSource.disconnect(Wave._audioContext.destination);
            }
        } catch (e) {
            console.log(e);
        }

        this._audioAnalyser = null;
        this._activeAnimations = [];
    }

    private _play(): void {
        Wave._audioSource.connect(this._audioAnalyser);
        Wave._audioSource.connect(Wave._audioContext.destination);
        this._audioAnalyser.smoothingTimeConstant = .85;
        this._audioAnalyser.fftSize = 1024;
        let audioBufferData = new Uint8Array(this._audioAnalyser.frequencyBinCount);

        let tick = () => {
            if (!this || !this._audioAnalyser) {
                return;
            }
            this._audioAnalyser.getByteFrequencyData(audioBufferData);
            this._canvasContext.clearRect(0, 0, this._canvasContext.canvas.width, this._canvasContext.canvas.height);
            this._activeAnimations.forEach((animation) => {
                animation.draw(audioBufferData, this._canvasContext);
            })
            window.requestAnimationFrame(tick);
        }
        tick();
    }

    public addAnimation(animation: IAnimation): void {
        this._activeAnimations.push(animation);
    }

    public clearAnimations(): void {
        this._activeAnimations = [];
    }
}