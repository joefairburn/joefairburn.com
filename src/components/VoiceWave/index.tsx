'use client'

const audioFile = '/audio/audio.mp3'

import { useEffect, useRef, useState } from 'react'

export const VoiceWave = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyzerRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number>()
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bars] = useState(() => Array(32).fill(0))

  const SVG_WIDTH = 300
  const SVG_HEIGHT = 150
  const BAR_COUNT = 32
  const BAR_WIDTH = SVG_WIDTH / BAR_COUNT - 1

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      // Cleanup audio context
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const setupAudioContext = async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioFile)

        // Wait for audio to be loaded
        await new Promise((resolve, reject) => {
          if (!audioRef.current) return reject('No audio element')
          audioRef.current.addEventListener('canplaythrough', resolve)
          audioRef.current.addEventListener('error', (e) => reject(e))
          audioRef.current.load()
        })

        // Create and resume AudioContext (needed for browsers)
        audioContextRef.current = new AudioContext()
        await audioContextRef.current.resume()

        const source = audioContextRef.current.createMediaElementSource(
          audioRef.current
        )
        const analyzer = audioContextRef.current.createAnalyser()

        analyzer.fftSize = BAR_COUNT * 2
        analyzer.smoothingTimeConstant = 0.8
        source.connect(analyzer)
        analyzer.connect(audioContextRef.current.destination)
        analyzerRef.current = analyzer

        console.log('Audio setup complete')
      }
    } catch (err) {
      console.error('Audio setup error:', err)
      setError(err instanceof Error ? err.message : 'Failed to setup audio')
      throw err
    }
  }

  const updateVisualizer = () => {
    if (!analyzerRef.current) return

    const analyzer = analyzerRef.current
    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw)
      analyzer.getByteFrequencyData(dataArray)

      // Update DOM directly for better performance
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = document.getElementById(`bar-${i}`)
        if (bar) {
          const barHeight = (dataArray[i] / 255) * SVG_HEIGHT
          bar.setAttribute(
            'transform',
            `translate(0, ${SVG_HEIGHT - barHeight})`
          )
          bar.setAttribute('height', barHeight.toString())
        }
      }
    }

    draw()
  }

  const onPlay = async () => {
    try {
      setError(null)

      if (!isPlaying) {
        await setupAudioContext()
        if (!audioRef.current) return

        console.log('Starting playback...')
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          await playPromise
          console.log('Playback started successfully')
          updateVisualizer()
          setIsPlaying(true)
        }
      } else {
        if (!audioRef.current) return
        console.log('Stopping playback...')
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        // Reset bars
        for (let i = 0; i < BAR_COUNT; i++) {
          const bar = document.getElementById(`bar-${i}`)
          if (bar) {
            bar.setAttribute('transform', `translate(0, ${SVG_HEIGHT})`)
            bar.setAttribute('height', '0')
          }
        }
        setIsPlaying(false)
      }
    } catch (err) {
      console.error('Playback error:', err)
      setError(err instanceof Error ? err.message : 'Failed to play audio')
      setIsPlaying(false)
    }
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='border border-gray-700 rounded-lg bg-gray-900 p-4'>
        <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
          {bars.map((_, i) => {
            const hue = (i / BAR_COUNT) * 360
            return (
              <rect
                key={i}
                id={`bar-${i}`}
                x={i * (BAR_WIDTH + 1)}
                y={0}
                width={BAR_WIDTH}
                height={0}
                fill={`hsl(${hue}, 100%, 50%)`}
                style={{
                  transition: 'transform 50ms ease-out'
                }}
              />
            )
          })}
        </svg>
      </div>
      <button
        onClick={onPlay}
        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      {error && (
        <div className='text-red-500 text-sm mt-2'>Error: {error}</div>
      )}
    </div>
  )
}
