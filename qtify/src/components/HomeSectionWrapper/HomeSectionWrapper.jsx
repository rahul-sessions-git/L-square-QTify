import React from "react";
import { fetchNewAlbums, fetchTopAlbums } from "../../api/api";
import Section from "../Section/Section";
import styles from "./HomeSectionWrapper.module.css";

export default function HomeSectionWrapper() {
  return (
    <div className={styles.wrapper}>
      <Section title="Top Albums" dataSource={fetchTopAlbums} />
      <Section title="New Albums" dataSource={fetchNewAlbums} />
    </div>
  );
}
