import "./App.css"
import { useState, useRef, useEffect } from "react"
import Player from "./player/Player"
import { songsData } from "./player/songsData"

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [songs, setSongs] = useState(songsData)
  const [currentSong, setCurrentSong] = useState(songsData[0])

  const audioEl = useRef()

  useEffect(() => {
    isPlaying ? audioEl.current.play() : audioEl.current.pause()
  }, [isPlaying])

  const playing = () => {
    const length = audioEl.current.duration
    const currentTime = audioEl.current.currentTime
    const progress = (currentTime / length) * 100
    setCurrentSong({ ...currentSong, progress: progress, length: length })
  }

  return (
    <div className="App">
      <audio src={currentSong.url} ref={audioEl} onTimeUpdate={() => playing()} />
      <Player
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioElem={audioEl}
      />
    </div>
  )
}

export default App
