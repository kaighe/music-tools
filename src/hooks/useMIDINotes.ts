import { useEffect, useState } from "react";

type NoteData = {
    note: number,
    channel: number
}

function useMIDINotes(access: MIDIAccess | null) {
    const [notes, setNotes] = useState<NoteData[]>([]);

    function note_on(note: number, channel: number){
        setNotes(prev => {
            if (prev.some(n => n.note === note && n.channel === channel)) {
                return prev;
            }
            return [...prev, {note, channel}];
        })
    }

    function note_off(note: number, channel: number){
        setNotes(prev => {
            return prev.filter(item => !(item.note == note && item.channel == channel))
        })
    }
    
    const on_message = (msg: MIDIMessageEvent) => {
        if (!msg.data) return;

        const [status, note, velocity] = msg.data;

        let command = status & 0xF0;
        let channel = status & 0x0F;

        if(command == 0x90){
            if(velocity > 0){
                note_on(note, channel);
            }else{
                note_off(note, channel);
            }
        }else if(command == 0x80){
            note_off(note, channel);
        }
    }

    useEffect(() => {
        if (!access) return;

        const handlers: Array<[MIDIInput, (e: MIDIMessageEvent) => void]> = [];

        const attach = (input: MIDIInput) => {
            const handler = on_message;
            input.addEventListener("midimessage", handler);
            handlers.push([input, handler]);
        };

        for (const input of access.inputs.values()) {
            attach(input);
        }

        const stateHandler = (e: MIDIConnectionEvent) => {
            if (e.port?.type === "input" && e.port.state === "connected") {
                attach(e.port as MIDIInput);
            }
        };

        access.addEventListener("statechange", stateHandler);

        return () => {
            for (const [input, handler] of handlers) {
                input.removeEventListener("midimessage", handler);
            }
            access.removeEventListener("statechange", stateHandler);
        };
    }, [access]);

    return notes;
}

export default useMIDINotes;