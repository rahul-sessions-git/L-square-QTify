import React, { useEffect, useState } from "react";
import Hero from "./components/Hero/Hero";
import HomeSectionWrapper from "./components/HomeSectionWrapper/HomeSectionWrapper";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeSectionWrapper />
    </>
  );
}

export default App;
