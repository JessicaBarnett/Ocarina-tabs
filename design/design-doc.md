# Design Doc

## Overall Goal

Build An app that:

- Displays selectable list of saved songs
- display selected Song in any/all of 3 formats...
    - text
    - tabulature
    - musical staff
- edit song using the same formats
    - text
    - images of tabs
    - images of notes on musical staff
- save the song after edit is finished

Limits

- not recording any time information at this point.  Just the pitch.


## Application State

Sequence: the current sequence of notes on the staff/tabs

Notes: dictionary to look up notes by letter/octave/accidental


## Display Components

TabNotationCmp
    Inputs:
        - NoteObj
    renders:
        image of Oca w/ notes covered, and note letter

StaffNotationCmp
    inputs:
        - note
        - octave
    renders:
        position of note on a g-clef musical staff

SongCmp
    user inputs:
        - hide/show staff/tab,
        - Txt input which has the notes displayed in the letter notation I'm using to key, ex: "A4 C6 D5E"
        - Song name
    inputs:
        - Sequence Obj if initing with a saved sequence
    Renders
        - StaffNotationCmp & TabNotationCmp for each note, displayed one above the other, in a grid side-by-side, if the box is checked
        - Textarea to edit directly, if box is checked

SongSelectCmp
    Displays list of saved songs

KeyboardCmp
    desc:
        displays all 12 tabs and/or staff notes as buttons.  When clicking a button, will add that note to the sequence
    user input:
        - hide/show staff or tabs
        - click buttons to add notes to the song

## Page Components

ViewPage
    Data Needed
        - Saved Songs
    State Managed
        - selected song
    User Actions/Inputs
        - Edit (renders editPage)
    Displays Components:
        - SongCmp (pass selected song)
        - SongSelectCmp (pass saved songs)

EditPage
    Data Needed
        - Selected song
    User Actions/Inputs
        - Save (saves song to the json file?  not sure yet)
        - cancel (discards changes / opens ViewPage)
        - edit the Textarea or staff/tab view. Changing one must change the other.
        - clicking buttons in keyboardcmp updates song
        - updating text in textarea saves it somewhere?
            - if on blur, text is valid, update song
            - else, error and do not update until changes are made.
            - if song is updated via keyboard, update field based on that

    Displays Components:
        - SongCmp (pass selected song)
        - KeyboardCmp

AppCmp



## Objects


### Note (Natural)

Mapping for a natural note.

```js
{
    name: 'A',
    octave: 4,
    accidental: false,
    holesCovered: [1,2,3,4,5,6,7,8,9,10,11,12]
}
```

### Note (Accidental)

Same as a Note but the name is split into sharp/flat.
App will always default to sharp unless there's some user-dictated reason.

```js
{
    name: {
        sharp:'A♯',
        flat:'B♭'
    },
    octave: 4,
    accidental: true,
    holesCovered: [1,2,3,4,5,6,7,8,9,10,12]
}
```

### Song

Object that saves Generated Songs

```
{
    name: 'My song name',
    notes: ["A4", "A5", "C5"]
}
```