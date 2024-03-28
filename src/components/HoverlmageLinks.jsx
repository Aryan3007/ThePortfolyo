/* eslint-disable no-unused-vars */
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import PropTypes from "prop-types"; // Import PropTypes
import { useData } from "../context/data";

export const HoverImageLinks = () => {
  const { data } = useData();
  const service = data.user.services;

  const enabledServices = data.user.services.filter(
    (service) => service.enabled
  );

  // Check if data and user are available before mapping over services
  if (
    !data ||
    !data.user ||
    !data.user.timeline ||
    data.user.timeline.length === 0
  ) {
    return <p>No timeline available</p>;
  }

  return (
    <section className="bg-zinc-950 lg:ml-96 w-full p-4 md:p-8">
      <h2 className="font-black text-purple-300  text-5xl lg:text-7xl  uppercase">
        Services I Offer
      </h2>
      <hr className="my-8 border-gray-200" />
      <div id="service" className=" max-w-[1100px] px-4">
        {enabledServices.map((service, index) => (
          <Link
            key={index}
            heading={service.name}
            subheading={service.desc}
            imgSrc={service.image.url}
            href="#"
            charge={service.charge}
          />
        ))}
      </div>
    </section>
  );
};

const Link = ({ heading, imgSrc, subheading, href, charge }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };
  // PropTypes validation
  Link.propTypes = {
    heading: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    subheading: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    charge: PropTypes.string.isRequired,
  };
  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-200 py-4 transition-colors duration-500 hover:border-neutral-300 md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-2xl font-bold text-neutral-300 transition-colors duration-500 group-hover:text-neutral-400 md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 w-full lg:w-2/3 block text-base text-neutral-400 transition-colors duration-500 group-hover:text-neutral-500">
          {subheading}
        </span>
        <span className="relative z-10 mt-2 w-32 text-center block text-base text-neutral-800 bg-white px-4 py-1 transition-colors duration-500 group-hover:text-neutral-900 rounded-full">
          {charge}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};
