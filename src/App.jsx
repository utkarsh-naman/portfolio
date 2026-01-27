// import gsap from "gsap";
// import {Draggable} from "gsap/Draggable";
// gsap.registerPlugin(Draggable);
// import {useEffect, useState} from "react";
//
//
// import BootScreen from "./components/BootScreen";
// import { audioUnlocked } from "./hooks/useAudioUnlock";
// import { Navbar, Dock } from "#components";
// import { Terminal } from "#windows";
//
//
//
// const App = () => {
//     const [booted, setBooted] = useState(false);
//
//     useEffect(() => {
//         if (!booted || !audioUnlocked) return;
//
//         const audio = new Audio("/boot/boot-sound-tiny.mp3");
//         audio.volume = 0.3;
//         audio.play().catch(() => {});
//     }, [booted]);
//
//
//     return (
//         <>
//             {!booted && <BootScreen onFinish={() => setBooted(true)} />}
//
//             {booted && (
//                 <main>
//                     <Navbar/>
//                     <Dock/>
//                     <Terminal/>
//                 </main>
//             )}
//         </>
//     );
// };
//
// export default App;


// src/App.jsx
import { useEffect, useState } from "react";
import BootScreen from "./components/BootScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import { audioUnlocked } from "./hooks/useAudioUnlock";
import { Navbar, Dock } from "#components";
import { Terminal } from "#windows";

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
                </main>
            )}
        </>
    );
};

export default App;