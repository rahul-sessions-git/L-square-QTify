import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function AlbumId() {
  const { albumId } = useParams();

  return (
    <>
      <Navbar />
      {albumId}
    </>
  );
}
