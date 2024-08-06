import * as SONGS from '@data/songs.json';

import { useState } from "react";

import NoteCmp from '@components/NoteCmp';

const DefaultLayout = () => {
    const { songs } = SONGS;
    const [selectedSong, setSelectedSong] = useState(songs[0]);

    const handleSongSelectBtnClick = (song) => {
      setSelectedSong(song)
    }

    const handleRemoveNoteBtnClick = (note) => {
      console.log(`remove note btn clicked for ${note}`)
    }

    return (
      <div>
        <p>Selected song: {selectedSong.name}</p>
        <div class="aside">
          <ul>
            {songs.map((song) => (
                <li key={song.id}>
                  <button type="button" onClick={() => handleSongSelectBtnClick(song)}>{song.name}</button>
                </li>
              ))}
          </ul>
        </div>
        <div class="main">
              <label htmlFor="song-name">Song Name:</label>
              <input type="text" id="song-name" name="song-name" value={selectedSong.name}/>

              <label htmlFor="song-notes-text">Song Notes:</label>
              <textarea type="text" id="song-notes-text" name="song-notes-text" value={selectedSong.notes}/>

              <div>
                <ol>
                  {selectedSong.notes.map((note, i) => (
                    <li key={`${selectedSong.id}-${i}`}>
                      <button type="button" onClick={() => handleRemoveNoteBtnClick(note)}>x</button>
                      <NoteCmp noteName={note}></NoteCmp>
                    </li>
                  ))}
                </ol>
              </div>
        </div>
      </div>
    );
  };

  export default DefaultLayout;