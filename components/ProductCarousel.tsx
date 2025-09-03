'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

type ProductCarouselProps = {
  images: string[];
  title: string;
};

export default function ProductCarousel({ images, title }: ProductCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<unknown>(null);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Swiper
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Navigation, Pagination, Thumbs]}
        className="aspect-square rounded-lg overflow-hidden bg-gray-100"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full aspect-square">
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="thumbs-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="relative aspect-square rounded overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors">
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}