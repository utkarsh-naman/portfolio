import { useEffect } from "react";

export let audioUnlocked = false;

export const unlockAudio = () => {
    audioUnlocked = true;
};

export const useAudioUnlock = () => {
    useEffect(() => {
        const unlock = () => {
            audioUnlocked = true;
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
        };

        window.addEventListener("pointerdown", unlock, { once: true });
        window.addEventListener("keydown", unlock, { once: true });

        return () => {
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
        };
    }, []);
};