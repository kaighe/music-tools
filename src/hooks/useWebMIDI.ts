import { useEffect, useState } from "react";

function useWebMIDI() {
    const [access, setAccess] = useState<MIDIAccess | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        navigator.requestMIDIAccess({ sysex: false })
        .then(setAccess)
        .catch(setError);
    }, []);

    return { access, error };
}

export default useWebMIDI;