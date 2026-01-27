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


const WELCOME_DURATION = 4200;


export default function WelcomeScreen({ onFinish }) {
    useEffect(() => {
        const t = setTimeout(onFinish, WELCOME_DURATION);
        return () => clearTimeout(t);
    }, [onFinish]);


    return (
        <div className="welcome-screen">
            {/* STATIC blurred background */}
            <div className="welcome-bg" />


            {/* Animated content on separate layer */}
            <div className="welcome-content">
                <DotLottieReact
                    src="https://lottie.host/650347c6-0911-4def-a579-56fb67bce83e/xID5SOPKlY.lottie"
                    autoplay
                    loop={false}
                    style={{ width: "35%" }}
                />
            </div>
        </div>
    );
}