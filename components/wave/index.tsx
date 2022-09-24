import { useCallback, useEffect, useRef, useState } from "react"
import { Wave } from "../../lib/wave.js"

import styles from "./Wave.module.scss"

interface WaveProps {
  colours: string[]
}

const WaveArea: React.FC<WaveProps> = ({ colours }) => {
  const canvasRef = useRef(null)

  const [wave, setWaveArea] = useState<Wave | null>(null);

  const handleVisualisation = useCallback(() => {
    const canvas = canvasRef.current

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    if (!canvas || !colours || !colours.length) return

    const audio = document.getElementById('audioElem') as HTMLAudioElement

    let localWave = wave

    if (!localWave) {
      localWave = new Wave(
        audio,
        canvas,
      )
      setWaveArea(localWave);
    }

    localWave.clearAnimations();

    localWave.addAnimation(new localWave.animations.Glob({
      fillColor: colours[0],
    }))

    localWave.addAnimation(new localWave.animations.Glob({
      fillColor: colours[1],
      diameter: canvas.height / 4,
    }))

    localWave.addAnimation(new localWave.animations.Glob({
      fillColor: colours[2],
      diameter: canvas.height / 8,
    }))
  }, [colours, wave])

  useEffect(() => {
    handleVisualisation()
    window.addEventListener('resize', handleVisualisation)

    return () => {
      window.removeEventListener('resize', handleVisualisation)
      if (wave) {
        wave.destroy()
        setWaveArea(null)
      }
    }
  }, [colours, wave])

  return (
    <canvas id="canvas" ref={canvasRef} className={styles.canvas} />
  )
}

export default WaveArea
