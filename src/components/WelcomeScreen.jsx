// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
//
// export default function WelcomeScreen() {
//     return (
//         <div className="welcome-screen">
//             <DotLottieReact
//                 src="https://lottie.host/650347c6-0911-4def-a579-56fb67bce83e/xID5SOPKlY.lottie"
//                 autoplay
//                 loop={false}
//             />
//         </div>
//     );
// }



import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAudioUnlock } from "../hooks/useAudioUnlock.jsx";

const WELCOME_DURATION = 4200;

export default function WelcomeScreen({ onFinish }) {
    useAudioUnlock();

    useEffect(() => {
        const t = setTimeout(onFinish, WELCOME_DURATION);
        return () => clearTimeout(t);
    }, [onFinish]);

    return (
        <div className="welcome-screen">
            {/* blur painter layer */}
            <div className="welcome-bg" />

            {/* isolated overlay */}
            <div className="welcome-overlay">
                <div className="welcome-lottie">
                    <DotLottieReact
                        src="https://lottie.host/650347c6-0911-4def-a579-56fb67bce83e/xID5SOPKlY.lottie"
                        autoplay
                        loop={false}
                        style={{ width: "100%" }}
                    />
                </div>
            </div>
        </div>
    );
}


