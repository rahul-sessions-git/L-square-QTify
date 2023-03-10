import React from "react";
import { useSwiper } from "swiper/react";
import styles from "./CarouselRightNavigation.module.css";
import { ReactComponent as RightArrow } from "../../../assets/RightArrow.svg";

export default function CarouselRightNavigation() {
  const swiper = useSwiper();
  return (
    <div className={styles.rightNavigation}>
      <RightArrow onClick={() => swiper.slideNext()} />
    </div>
  );
}
