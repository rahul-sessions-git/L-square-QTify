import React, { useEffect, useState } from "react";
import Hero from "./components/Hero/Hero";
import HomeSectionWrapper from "./components/HomeSectionWrapper/HomeSectionWrapper";
import Navbar from "./components/Navbar/Navbar";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Navbar />
        <Hero />
        <HomeSectionWrapper />
      </StyledEngineProvider>
    </>
  );
}

export default App;
