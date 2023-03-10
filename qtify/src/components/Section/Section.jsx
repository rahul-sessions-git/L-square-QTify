import React, { useEffect } from "react";
import { useState } from "react";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

export default function Section({ title, dataSource }) {
  const [data, setData] = useState([]);
  const [carouselToggle, setCarouselToggle] = useState(true);

  const fetchData = async (source) => {
    const data = await source();
    setData(data || []);
  };

  const handleToggle = () => {
    setCarouselToggle((prevState) => !prevState);
  };

  useEffect(() => {
    fetchData(dataSource);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <h3>{title}</h3>
        <h4 className={styles.toggleText} onClick={handleToggle}>
          {!carouselToggle ? "Collapse All" : "Show All"}
        </h4>
      </div>
      <div>
        {!carouselToggle ? (
          <div className={styles.wrapper}>
            {data.map((ele) => (
              <Card data={ele} />
            ))}
          </div>
        ) : (
          <Carousel
            data={data}
            renderComponent={(data) => <Card data={data} />}
          />
        )}
      </div>
    </>
  );
}
