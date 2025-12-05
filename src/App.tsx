import Piano from "./components/Piano"
import "./App.css"
import { useMIDIMessage } from "@react-midi/hooks";
import { useEffect, useState } from "react";

type NoteData = {
    note: number,
    channel: number
}

function App() {
    const [active_notes, set_active_notes] = useState<NoteData[]>([]);
    const midi_message = useMIDIMessage();

    function note_on(note: NoteData){
        set_active_notes(items => [...items, note])
    }

    function note_off(note: NoteData){
        set_active_notes(items => items.filter(note_data => (note_data.note != note.note || note_data.channel != note.channel)));
    }

    useEffect(() => {
        if(midi_message){
            let data = midi_message.data;
            if(data[0] >= 0x80 && data[0] <= 0x8F){ // NOTE OFF
                let note: NoteData = {
                    note: data[1],
                    channel: data[0] - 0x80
                }

                note_off(note);
            }
            if(data[0] >= 0x90 && data[0] <= 0x9F){ // NOTE ON
                let note: NoteData = {
                    note: data[1],
                    channel: data[0] - 0x90
                }
                
                if(data[2] == 0){
                    note_off(note);
                }else{
                    note_on(note);
                }
            }
        }
    }, [midi_message])

    return <div className="piano-test">
        <Piano active_notes={active_notes.map(note_data => note_data.note)}/>
    </div>
}

export default App