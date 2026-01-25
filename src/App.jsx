// import {Navbar} from "#components";
// const App = () => {
//     return (
//         <main>
//             <Navbar/>
//         </main>
//     );
// };
// export default App

import {useEffect, useState} from "react";
import { Navbar } from "#components";
import BootScreen from "./components/BootScreen";

import { audioUnlocked } from "./hooks/useAudioUnlock";



const App = () => {
    const [booted, setBooted] = useState(false);

    useEffect(() => {
        if (!booted || !audioUnlocked) return;

        const audio = new Audio("/boot/boot-sound.mp3");
        audio.volume = 0.6;
        audio.play().catch(() => {});
    }, [booted]);


    return (
        <>
            {!booted && <BootScreen onFinish={() => setBooted(true)} />}

            {booted && (
                <main>
                    <Navbar/>
                </main>
            )}
        </>
    );
};

export default App;