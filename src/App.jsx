import {useEffect, useState} from "react";
import { Navbar, Dock } from "#components";
import BootScreen from "./components/BootScreen";

import { audioUnlocked } from "./hooks/useAudioUnlock";



const App = () => {
    const [booted, setBooted] = useState(false);

    useEffect(() => {
        if (!booted || !audioUnlocked) return;

        const audio = new Audio("/boot/boot-sound-tiny.mp3");
        audio.volume = 0.3;
        audio.play().catch(() => {});
    }, [booted]);


    return (
        <>
            {!booted && <BootScreen onFinish={() => setBooted(true)} />}

            {booted && (
                <main>
                    <Navbar/>
                    <Dock/>
                </main>
            )}
        </>
    );
};

export default App;