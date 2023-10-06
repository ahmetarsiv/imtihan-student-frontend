'use client';

import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ISliderProps {
    images: string[];
}

export default function Slider({ images }: ISliderProps) {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}>
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <img src={image} alt={`Slide ${index}`} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
