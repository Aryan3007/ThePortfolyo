/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useData } from "./context/data";
import axios from "axios";
import Loader from "./components/Loader";

import AOS from "aos";
import "aos/dist/aos.css";
import Homepage from "./pages/HomePage";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [error, setError] = useState(null);
  const { data, setData } = useData();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading delay (you can replace this with actual data fetching)
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        setData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="app-container">
        {loading ? (
          <Loader />
        ) : (
          <div className=" overflow-hidden">
                  <Navbar />
            <SideBar/>
            <Homepage />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
