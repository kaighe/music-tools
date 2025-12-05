import "./Piano.css"

interface KeyProps{
    note: number
    active: boolean
}

const KEY_NAMES = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
]

function Key({note, active}: KeyProps){
    var name = KEY_NAMES[note % 12];
    if([1, 3, 6, 8, 10].includes(note % 12)){
        return <div className="key-black-container">
            <div className={`key black ${active ? "active": ""}`}>
                <div>{name}</div>
            </div>
        </div>
    }

    return <div className={`key white ${active ? "active": ""}`}>
        {note == 60 ? <div className="center-dot"/> : <></>}
        <div>{name}</div>
    </div>
}

interface PianoProps{
    active_notes: number[]
}

function Piano({ active_notes }: PianoProps){
    const keys = Array.from(Array(128).keys());

    return <div className="container">
        {keys.map(note => <Key key={note} note={note} active={active_notes.includes(note)}></Key>)}
    </div>
}

export default Piano;