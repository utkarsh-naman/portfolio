import { useEffect, useState } from "react";
import BootScreen from "./components/BootScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import { audioUnlocked } from "./hooks/useAudioUnlock";
import { Navbar, Dock } from "#components";
import {Safari, Terminal} from "#windows";

const App = () => {
    const [stage, setStage] = useState("boot");

    // play audio on desktop
    useEffect(() => {
        if (stage !== "desktop") return;
        if (!audioUnlocked) return;


        const audio = new Audio("/boot/boot-sound-tiny.mp3");
        audio.volume = 0.3;
        audio.play().catch(() => {});
    }, [stage]);

    return (
        <>
            {stage === "boot" && (
                <BootScreen onFinish={() => setStage("welcome")} />
            )}

            {stage === "welcome" && (
                <WelcomeScreen onFinish={() => setStage("desktop")} />
            )}

            {stage === "desktop" && (
                <main>
                    <Navbar />
                    <Dock />
                    <Terminal />
                    <Safari />
                </main>
            )}
        </>
    );
};

export default App;