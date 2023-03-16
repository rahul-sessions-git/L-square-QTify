import React, { useEffect, useState } from "react";
import Hero from "./components/Hero/Hero";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { Outlet } from "react-router-dom";
import { fetchNewAlbums, fetchSongs, fetchTopAlbums } from "./api/api";

function App() {
  const [data, setData] = useState({});

  const generateData = (key, source) => {
    source().then((data) => {
      setData((prevState) => {
        // Object.assign would also work
        return { ...prevState, [key]: data };
      });
    });
  };

  useEffect(() => {
    generateData("topAlbums", fetchTopAlbums);
    generateData("newAlbums", fetchNewAlbums);
    generateData("songs", fetchSongs);
  }, []);

  const { topAlbums = [], newAlbums = [], songs = [] } = data;

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Navbar searchData={[...topAlbums, ...newAlbums]} />
        <Outlet context={{ data: { topAlbums, newAlbums, songs } }} />
      </StyledEngineProvider>
    </>
  );
}

export default App;
