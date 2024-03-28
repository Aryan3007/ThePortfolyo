import Hero from "../components/Hero";
import { useData } from "../context/data";
import Cursor from "./../components/Cursor";


import Skills from "../components/Skills";
import { Projects } from "../components/Projects";
import { HoverImageLinks } from "../components/HoverlmageLinks";
import { Testimonial } from "../components/Testimonial";

import SocialLinks from "../components/SocialLinks";
import TimeLine from "../components/TimeLine";
import Footer from "../components/Footer";

import FeaturedWork from "../components/FeaturedWork";

import Contact from "../components/Contact";

const Homepage = () => {
  const { data } = useData();

  // Check if data.user exists before accessing its properties
  if (!data || !data.user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Cursor />


      <Hero />

      <Skills />
      <HoverImageLinks />
      <Projects />
      <TimeLine />
      <Testimonial />
      <FeaturedWork />
      <SocialLinks />
      <Contact />
      <Footer />
    </>
  );
};

export default Homepage;
