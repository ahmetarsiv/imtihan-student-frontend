import React from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie'), {
    ssr: false,
});

interface ILottieAnimationProps {
    animationData: any;
}

const LottieAnimation = ({ animationData }: ILottieAnimationProps) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return <Lottie options={defaultOptions} />;
};

export default LottieAnimation;
