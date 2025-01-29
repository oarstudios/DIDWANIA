import React from 'react';
import SliderImg1 from '../../Images/slider1.png';

// Import Swiper core and required modules
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Slider.css'; // Import the CSS file

function Slider() {
  return (
    <div className="slider-container">
      <Swiper
        className="testimonials_container"
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        // pagination={{ clickable: true }}
      >
        <SwiperSlide className="testimonial">
          <div className="certificate-image">
            <img src={SliderImg1} alt="" />
          </div>
        </SwiperSlide>

        <SwiperSlide className="testimonial">
          <div className="certificate-image">
            <img src={SliderImg1} alt="" />
          </div>
        </SwiperSlide>

        <SwiperSlide className="testimonial">
          <div className="certificate-image">
            <img src={SliderImg1} alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
