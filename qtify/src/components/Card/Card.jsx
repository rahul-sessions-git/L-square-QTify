import React from "react";
import styles from "./Card.module.css";

function Card({ data }) {
  const { image, follows, title } = data;
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img src={image} alt="album" loading="lazy" />
        <div className={styles.banner}>
          <div className={styles.pill}>
            <p>{follows} Follows</p>
          </div>
        </div>
      </div>
      <div className={styles.titleWrapper}>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default Card;
