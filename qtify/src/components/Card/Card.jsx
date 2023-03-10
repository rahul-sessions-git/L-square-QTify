import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ data }) {
  const { image, follows, title, slug } = data;
  return (
    <Link to={`/album/${slug}`}>
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
    </Link>
  );
}

export default Card;
