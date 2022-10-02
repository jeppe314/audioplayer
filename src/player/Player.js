import React, { useRef } from "react"
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded"
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded"
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded"
import PauseRoundedIcon from "@mui/icons-material/PauseRounded"

export default function Player({
  songs,
  audioElem,
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
}) {
  const clickRef = useRef()
  function playPause() {
    setIsPlaying(!isPlaying)
  }

  function next() {
    const index = songs.findIndex((song) => song.title === currentSong.title)

    if (index === songs.length - 1) {
      setCurrentSong(songs[0])
    } else {
      setCurrentSong(songs[index + 1])
    }
    audioElem.current.currentTime = 0
  }
  function prev() {
    const index = songs.findIndex((song) => song.title === currentSong.title)

    if (index === 0) {
      setCurrentSong(songs[songs.length - 1])
    } else {
      setCurrentSong(songs[index - 1])
    }

    audioElem.current.currentTime = 0
  }

  function setProgress(e) {
    const width = clickRef.current.clientWidth
    const offset = e.nativeEvent.offsetX
    const progress = (offset / width) * 100
    audioElem.current.currentTime = (progress / 100) * currentSong.length
  }

  return (
    <div className="player-container">
      <div className="player-song-title-div">
        <h3>{currentSong.title}</h3>
      </div>
      <div className="player-buttons">
        <SkipPreviousRoundedIcon
          fontSize="large"
          className="player-button"
          onClick={() => prev()}
        />
        {isPlaying ? (
          <PauseRoundedIcon
            fontSize="large"
            className="player-button"
            onClick={() => playPause()}
          />
        ) : (
          <PlayArrowRoundedIcon
            fontSize="large"
            className="player-button"
            onClick={() => playPause()}
          />
        )}
        <SkipNextRoundedIcon fontSize="large" className="player-button" onClick={() => next()} />
      </div>
      <div className="player-search-bar-wrapper" ref={clickRef} onClick={setProgress}>
        <div className="player-search-bar" style={{ width: `${currentSong.progress + "%"}` }}></div>
      </div>
    </div>
  )
}
