import React from "react";

const Slider = () => {
  return (
    <div className="mt-10">
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/6720b9bddc217b2fa1ecbab8_BIG%20SAVINGS%20SLIDER%20BANNER_DESKTOP_1552.png"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/672772cf870366949abeb846_SPREAD%20BANNER_D_1552.png"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/6755a17f51233c71826aabf4_REKITT%20(2)_1552.jpeg"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://d2t8nl1y0ie1km.cloudfront.net/images/thumbs/677a3335970c19a3ff07e758_FREE%20DELIVERY%20BANNER_DESKTOP_1552.png"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
