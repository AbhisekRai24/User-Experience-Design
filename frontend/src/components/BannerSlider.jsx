import { useState, useEffect } from 'react';

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200',
      title: 'Discover Local Events',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200',
      title: 'Join Your Community',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200',
      title: 'Connect with Nature',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="carousel w-full rounded-xl overflow-hidden mb-8">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`carousel-item w-full ${index === currentSlide ? 'block' : 'hidden'
            }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-120 md:h-[900px] object-cover"
          />
        </div>
      ))}

      <div className="flex justify-center w-full py-2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`btn btn-xs ${index === currentSlide ? 'btn-primary' : 'btn-ghost'
              }`}
            onClick={() => setCurrentSlide(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;

