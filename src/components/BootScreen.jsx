import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {useAudioUnlock} from "../hooks/useAudioUnlock.jsx";


const WELCOME_DURATION = 4200; // ms (tune if needed)

const BootScreen = ({ onFinish }) => {
    useAudioUnlock();
    const [phase, setPhase] = useState("apple");


    useEffect(() => {
        const appleTimer = setTimeout(() => {
            setPhase("welcome");
        }, 2200);

        return () => clearTimeout(appleTimer);
    }, []);

    useEffect(() => {
        if (phase !== "welcome") return;

        const welcomeTimer = setTimeout(() => {
            onFinish(); // 🔥 GUARANTEED exit
        }, WELCOME_DURATION);

        return () => clearTimeout(welcomeTimer);
    }, [phase, onFinish]);

    // macOS boot sound
    // useEffect(() => {
    //     if (phase !== "welcome") return;
    //
    //     const audio = new Audio("/boot/boot-sound.mp3");
    //     audio.volume = 0.6;
    //
    //     const playSound = () => {
    //         audio.play().catch(() => {});
    //         window.removeEventListener("pointerdown", playSound);
    //         window.removeEventListener("keydown", playSound);
    //     };
    //
    //     window.addEventListener("pointerdown", playSound, { once: true });
    //     window.addEventListener("keydown", playSound, { once: true });
    //
    //     return () => {
    //         window.removeEventListener("pointerdown", playSound);
    //         window.removeEventListener("keydown", playSound);
    //     };
    // }, [phase]);



    return (
        <div className="boot-screen">
            {phase === "apple" && (
                <img
                    src="/boot/apple.svg"
                    alt="Apple Boot Logo"
                    className="apple-boot"
                />
            )}

            {phase === "welcome" && (
                <DotLottieReact
                    src="https://lottie.host/650347c6-0911-4def-a579-56fb67bce83e/xID5SOPKlY.lottie"
                    autoplay
                    loop={false}
                    style={{ width: '35%', margin: '0 auto' }}
                />
            )}
        </div>
    );
};

export default BootScreen;
