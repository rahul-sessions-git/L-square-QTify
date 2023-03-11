import React from "react";
import {
  fetchFilters,
  fetchNewAlbums,
  fetchSongs,
  fetchTopAlbums,
} from "../../api/api";
import Section from "../Section/Section";
import styles from "./HomeSectionWrapper.module.css";

export default function HomeSectionWrapper() {
  return (
    <div className={styles.wrapper}>
      <Section title="Top Albums" dataSource={fetchTopAlbums} type="album" />
      <Section title="New Albums" dataSource={fetchNewAlbums} type="album" />
      <Section
        title="Songs"
        dataSource={fetchSongs}
        filterSource={fetchFilters}
        type="song"
      />
    </div>
  );
}
