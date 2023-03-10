import React from "react";
import { useSwiper } from "swiper/react";
import styles from "./CarouselLeftNavigation.module.css";
import { ReactComponent as LeftArrow } from "../../../assets/LeftArrow.svg";

export default function CarouselLeftNavigation() {
  const swiper = useSwiper();

  return (
    <div className={styles.leftNavigation}>
      <LeftArrow onClick={() => swiper.slidePrev()} />
    </div>
  );
}
