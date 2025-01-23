import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "./assets/style.css";

const Testimony = () => {
  return (
    <div className="mt-10 mb-10">
      {/* Typewriter Effect on "TRUSTED BY" */}
      <p className="typewriter p-5 bg-red-700 text-white font-extrabold text-3xl m-10">
        TRUSTED BY
      </p>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/6683cbf01130c4a4d07c7e80_ACI_250.webp"
            alt="Logo 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/66ab7e4e8e5f214bd649774c_Unilever%20Logo_250.webp"
            alt="Logo 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/66ab7f59e1260acd01d2e55d_Reckitt%20Logo_250.webp"
            alt="Logo 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/65ffdcf7933e34c3396dd43a_Nestle_250.png"
            alt="Logo 4"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/66ab8189b51a3948e3fd8dd8_Marico%20Logo_250.webp"
            alt="Logo 5"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/65ffda90d2372028bed532d6_Golden%20Harvest_250.jpeg"
            alt="Logo 6"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/65ffd922d2372028bed4c9c1_Colgate_250.png"
            alt="Logo 7"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/66ab807fc12ca8daa107e9bd_MGI_Logo_250.webp"
            alt="Logo 8"
          />
        </SwiperSlide>
      </Swiper>
      <p className="typewriter p-5 bg-red-700 text-white font-extrabold text-3xl m-10">
        TRUSTED BY
      </p>
    </div>
  );
};

export default Testimony;
