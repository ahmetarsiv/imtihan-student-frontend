import ApplicationLogo from '@/components/ApplicationLogo';
import LottieAnimation from '@/components/LottieAnimation';
import Lottie from '../../public/lottie/imtihan.json';
import React from 'react';

export default function SplashScreen() {
    return (
        <div className="flex flex-col h-screen w-screen m-auto justify-center items-center">
            <div>
                <ApplicationLogo width={144} height={32} />
            </div>
            <div className="absolute bottom-0 w-72 h-72">
                <LottieAnimation animationData={Lottie} />
            </div>
        </div>
    );
}
