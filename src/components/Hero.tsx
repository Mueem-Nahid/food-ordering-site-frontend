import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import OptimizedImage from "./commons/OptimizedImage";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  swipeToSlide: true,
  touchMove: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        arrows: false,
      },
    },
  ],
};

const banners = [
  { src: "/images/banner-1.png", alt: "Banner 1", w: 1696, h: 608 },
  { src: "/images/banner-2.jpeg", alt: "Banner 2", w: 1600, h: 573 },
  { src: "/images/banner-3.jpeg", alt: "Banner 3", w: 1600, h: 573 },
];

const Hero: React.FC = () => {
  return (
    <Box sx={{ px: 1 }}>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={banner.src} style={{ borderRadius: 10, overflow: "hidden" }}>
            <OptimizedImage
              src={banner.src}
              alt={banner.alt}
              width={banner.w}
              height={banner.h}
              priority={index === 0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: 10 }}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Hero;
