import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Hero: React.FC = () => {
  return (
    <Slider {...settings}>
      <div>
        <img src="/images/2.png" alt="Banner" className="banner-img" />
      </div>
      <div>
        <img src="/images/3.png" alt="Banner" className="banner-img" />
      </div>
      <div>
        <img src="/images/4.png" alt="Banner" className="banner-img" />
      </div>
    </Slider>
  );
};

export default Hero;
