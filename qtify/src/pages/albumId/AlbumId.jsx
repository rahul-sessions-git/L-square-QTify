import React from "react";
import { useParams } from "react-router-dom";

export default function AlbumId() {
  const { albumId } = useParams();

  return <>{albumId}</>;
}
