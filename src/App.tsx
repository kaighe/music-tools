import Piano from "./components/Piano"
import "./App.css"
import useWebMIDI from "./hooks/useWebMIDI";
import useMIDINotes from "./hooks/useMIDINotes";

function App() {
    const midi = useWebMIDI();
    const midi_notes = useMIDINotes(midi.access);

    return <div className="piano-test">
        <Piano active_notes={midi_notes.map(item => item.note)}/>
    </div>
}

export default App