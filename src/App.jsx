/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useData } from "./context/data";
import axios from "axios";
import Homepage from "./pages/HomePage";
import Skills from "./components/Skills";
import { Projects } from "./components/Projects";
import { HoverImageLinks } from "./components/HoverlmageLinks";
import { Testimonial } from "./components/Testimonial";
import Strips from "./components/Strips";
import SocialLinks from "./components/SocialLinks";
import TimeLine from "./components/TimeLine";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import FeaturedWork from "./components/FeaturedWork";

import AOS from "aos";
import "aos/dist/aos.css";
import SideBar from "./components/SideBar";

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
            <Navbar/>
            <SideBar />
            <Homepage />
            <Skills/>
            <HoverImageLinks />
            <Projects/>
            <TimeLine/>
            <Testimonial/>
            <FeaturedWork/>
            <SocialLinks/>
            <Footer/>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
