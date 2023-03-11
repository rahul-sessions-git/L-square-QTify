import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ data, type }) {
  const getCard = (type) => {
    switch (type) {
      case "album": {
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
      case "song": {
        const { image, likes, title } = data;

        return (
          <div className={styles.wrapper}>
            <div className={styles.card}>
              <img src={image} alt="song" loading="lazy" />
              <div className={styles.banner}>
                <div className={styles.pill}>
                  <p>{likes} Likes</p>
                </div>
              </div>
            </div>
            <div className={styles.titleWrapper}>
              <p>{title}</p>
            </div>
          </div>
        );
      }
      default:
        return <></>;
    }
  };
  return getCard(type);
}

export default Card;
