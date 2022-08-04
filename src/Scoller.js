import circle from "./resources/cirlce.png";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import iconOne from "./resources/red.png";
import iconTwo from "./resources/silver.png";
import iconThree from "./resources/black.png";



export default function Scroller({ setGlassesColor }) {
  const [swiperIndex, setSwiperIndex] = useState(1);
  const [swiper, setSwiper] = useState();

  function handleSlideChange(swiper) {
    setSwiperIndex(swiper.activeIndex);
  }

  useEffect(() => {

    if (swiperIndex === 0) { setGlassesColor(1) }
    else if (swiperIndex === 1) { setGlassesColor(2) }
    else if (swiperIndex === 2) { setGlassesColor(3) }
    else if (swiperIndex === 3) { setGlassesColor(4) }


  }, [swiperIndex])

  function initSwiper(swiper) {
    swiper.slideTo(1, 0)
  }
  return (
    <div>
      <Swiper
        style={{ maxWidth: "806px", width: "110vw", position: "absolute", bottom: "0px", marginLeft: "50%", transform: `translateX(calc(-50% - 17px))`, zIndex: "1001" }}
        spaceBetween={0}
        centeredSlides={true}
        slidesPerView={7}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
        onSwiper={(swiper) => { initSwiper(swiper); setSwiper(swiper) }}
      >


        <SwiperSlide onClick={() => swiper.slideTo(0, 300)} id={0} >
          <img style={{ position: "relative", left: "50%", top: "50%", transform: `translate(-50%) ${(swiperIndex === 0) ? "scale(0.75)" : "scale(0.5)"}` }} src={iconOne} />
        </SwiperSlide>

        <SwiperSlide onClick={() => swiper.slideTo(1, 300)} id={1}>
          <img style={{ position: "relative", left: "50%", top: "50%", transform: `translate(-50%) ${(swiperIndex === 1) ? "scale(0.75)" : "scale(0.5)"}` }} src={iconTwo} />
        </SwiperSlide>

        <SwiperSlide onClick={() => swiper.slideTo(2, 300)} id={2}>
          <img style={{ position: "relative", left: "50%", top: "50%", transform: `translate(-50%) ${(swiperIndex === 2) ? "scale(0.75)" : "scale(0.5)"}` }} src={iconThree} />
        </SwiperSlide>


      </Swiper>
      <img style={{ position: "absolute", marginLeft: "50%", transform: "translateX(-50%)", bottom: "15px", height: "90px", zIndex: "1000" }} src={circle} />
    </div>
  );
}