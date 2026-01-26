import gsap from "gsap";
import {Draggable} from "gsap/Draggable";
gsap.registerPlugin(Draggable);
import {useEffect, useState} from "react";


import BootScreen from "./components/BootScreen";
import { audioUnlocked } from "./hooks/useAudioUnlock";
import { Navbar, Dock } from "#components";
import { Terminal } from "#windows";



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
                    <Terminal/>
                </main>
            )}
        </>
    );
};

export default App;