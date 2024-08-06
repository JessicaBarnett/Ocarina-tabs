import * as NOTESMAP from '@data/note-map.json';
import * as SONGS from '@data/songs.json';

import { useEffect, useState } from "react";

// based on a 200 x 200 canvas
const holeCoordinates = {
  1: {
    number: 1,
    size: 8,
    x: 158,
    y: 50
  },
  2: {
    number: 2,
    size: 8,
    x: 138,
    y: 60
  },
  3: {
    number: 3,
    size: 8,
    x: 124,
    y: 80
  },
  4: {
    number: 1,
    size: 8,
    x: 113,
    y: 104
  },
  5: {
    number: 5,
    size: 8,
    x: 77,
    y: 71
  },
  6: {
    number: 6,
    size: 8,
    x: 65,
    y: 93
  },
  7: {
    number: 7,
    size: 8,
    x: 50,
    y: 110
  },
  8: {
    number: 8,
    size: 8,
    x: 28,
    y: 122
  },
  9: {
    number: 9,
    size: 8,
    x: 135,
    y: 150
  },
  10: {
    number: 10,
    size: 8,
    x: 68,
    y: 173
  },
  11: {
    number: 9,
    size: 4,
    x: 107,
    y: 68
  },
  12: {
    number: 12,
    size: 4,
    x: 63,
    y: 126
  }
};

const DefaultLayout = () => {
    const { songs } = SONGS;
    const [selectedSong, setSelectedSong] = useState(songs[0]);

    useEffect(() => {
      drawNote('c6');
    }, [])

    const handleSongSelectBtnClick = (song) => {
      setSelectedSong(song)
    }

    const handleRemoveNoteBtnClick = (note) => {
      console.log(`remove note btn clicked for ${note}`)
    }

    const drawNote = (noteName) => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvas.height = canvas.width; // square
      const w = canvas.width;

      const pct = (px) => {
        return (px * w) / 200;
      }

      var img = new Image();
      img.onload = function() {
          ctx.drawImage(img, 0, 0, w, w);
      }
      img.src = '/images/ocarina.svg';

      NOTESMAP[noteName].holesCovered.forEach((holeNumber) => {
        const {x, y, size} = holeCoordinates[holeNumber];
        let circle = new Path2D();
        circle.arc(pct(x), pct(y), pct(size), 0, 2 * Math.PI);
        ctx.fill(circle);
      })
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

              {/* <img id="ocarina-svg" src="/images/ocarina.svg"></img> */}
              <canvas width="150px" id="canvas"></canvas>
              <div>
                <ol>
                  {selectedSong.notes.map((note, i) => (
                    <li key={`${selectedSong.id}-${i}`}>
                      <button type="button" onClick={() => handleRemoveNoteBtnClick(note)}>x</button>
                    </li>
                  ))}
                </ol>
              </div>
        </div>
      </div>
    );
  };

  export default DefaultLayout;