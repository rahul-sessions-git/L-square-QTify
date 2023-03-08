import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://qtify-backend-gye4ebhsbpfea8g9.z01.azurefd.net/albums/new")
      .then((response) => {
        setData(response.data || []);
      });
  }, []);

  return (
    <>
      <Navbar />
      {data.map((ele) => (
        <div key={ele.id}>
          <img src={ele.image} width={300}></img>
        </div>
      ))}
    </>
  );
}

export default App;
