import { useState } from "react";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};


const Navbar = () => {
  // State to manage whether the dropdown is open or closed
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const scrolltoTop = () => {
    const homepage = document.getElementById("homepage");
    setIsDropdownOpen(!isDropdownOpen);
    if (homepage) {
      homepage.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrolltoskills = () => {
    setIsDropdownOpen(!isDropdownOpen);
    const skills = document.getElementById("skills");
    if (skills) {
      skills.scrollIntoView({ behavior: "smooth" });
    }
  };  
    const scrolltoservices = () => {
      setIsDropdownOpen(!isDropdownOpen);
    const service = document.getElementById("service");
    if (service) {
      service.scrollIntoView({ behavior: "smooth" });
    }
  };  
  const scrolltoProjects = () => {
    setIsDropdownOpen(!isDropdownOpen);
    const projects = document.getElementById("projects");
    if (projects) {
      projects.scrollIntoView({ behavior: "smooth" });
    }
  };  
  const scrolltoTimeline = () => {
    setIsDropdownOpen(!isDropdownOpen);
    const timeline = document.getElementById("timeline");
    if (timeline) {
      timeline.scrollIntoView({ behavior: "smooth" });
    }
  };  
  const scrolltoTestimonial = () => {
    setIsDropdownOpen(!isDropdownOpen);
    const testimonial = document.getElementById("testimonial");
    if (testimonial) {
      testimonial.scrollIntoView({ behavior: "smooth" });
    }
  };


  const scrolltoFeatured = () => {
    setIsDropdownOpen(!isDropdownOpen);
    const featuredwork = document.getElementById("featuredwork");
    if (featuredwork) {
      featuredwork.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrolltocontact = () => {
    setIsDropdownOpen(!isDropdownOpen);
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <div className="navbar fixed z-50">
      <div className="navbar-end w-full z-50">
        <div className="dropdown bg-purple-300 text-black rounded-full">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={toggleDropdown} // Toggle the dropdown on click
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-7 w-7 transform transition-transform ${
                isDropdownOpen ? "rotate-0" : "rotate-180"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          {/* Render the dropdown menu based on the state */}
          {isDropdownOpen && (
            <motion.ul
          
            variants={container}
            initial="hidden"
            animate="visible" className="menu container menu-sm dropdown-content mt-3 z-[1] p-2 py-8 text-white shadow right-4 bg-zinc-900 rounded-box w-80  flex justify-between  flex-col">
              <motion.li variants={item} className="hover:text-purple-400 item ">
                <button onClick={scrolltoTop} className="text-lg">Homepage</button>
              </motion.li>
              <motion.li variants={item} className="hover:text-purple-400 item ">
                <button onClick={scrolltoskills}  className="text-lg">Skills</button>
              </motion.li>
              <motion.li variants={item} className="hover:text-purple-400 item ">
                <button onClick={scrolltoservices} className="text-lg">Services</button>
              </motion.li>
              <motion.li variants={item} className="hover:text-purple-400 item ">
                <button onClick={scrolltoProjects} className="text-lg">Projects </button>
              </motion.li>
              <motion.li variants={item} className="hover:text-purple-400 item ">
                <button onClick={scrolltoTimeline} className="text-lg">Timeline </button>
              </motion.li>
              <motion.li variants={item} className="hover:text-purple-400 item ">
                <button onClick={scrolltoTestimonial} className="text-lg">Testimonial </button>
              </motion.li>{" "}
              <motion.li variants={item} className="hover:text-purple-400 item ">
                <button onClick={scrolltoFeatured} className="text-lg">Featured Work </button>
              </motion.li>{" "}
              <motion.li variants={item} className="hover:text-purple-400 item ">
                <button onClick={scrolltocontact} className="text-lg">Contact </button>
              </motion.li>
            </motion.ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
