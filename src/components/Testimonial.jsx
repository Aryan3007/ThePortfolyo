import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import PropTypes from "prop-types";
import { useData } from "../context/data";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 7;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const Testimonial = () => {
  const { data } = useData();
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === data.user.testimonials.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < data.user.testimonials.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div
      id="testimonial"
      className="relative overflow-hidden bg-neutral-950 py-8"
    >
      <h2 className="font-black lg:ml-96 text-purple-300 text-5xl p-2 lg:px-12 lg:text-7xl  uppercase">
        Testimonials
      </h2>
      <hr className="my-8 border-gray-200" />
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab lg:ml-96 relative z-10 items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <GradientEdges />
    </div>
  );
};

Testimonial.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
};

const Images = ({ imgIndex }) => {
  const { data } = useData();

  const enabledtestimonials = data.user.testimonials.filter(
    (testimonial) => testimonial.enabled
  );

  // Check if data and user.testimonials are available before mapping over testimonials
  if (
    !data ||
    !data.user ||
    !data.user.testimonials ||
    data.user.testimonials.length === 0
  ) {
    return <p>No testimonials available</p>;
  }

  return (
    <>
      {enabledtestimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          animate={{
            scale: imgIndex === index ? 0.95 : 0.85,
          }}
          transition={SPRING_OPTIONS}
          className="h-full w-full flex justify-center items-center shrink-0 object-cover"
        >
          <section className="bg-white rounded-xl">
            <div className="container h-fit px-6 py-10 mx-auto">
              <div className="lg:-mx-6 lg:flex lg:items-center">
                <img
                  className="object-cover  object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[32rem]"
                  src={testimonial.image.url}
                  alt=""
                />
                <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
                  <p className="text-5xl font-semibold text-purple-500 ">“</p>
                  <h1 className="text-3xl font-bold text-gray-800  lg:text-5xl w-full">
                    {testimonial.position}
                  </h1>
                  <p className="max-w-lg mt-6 text-gray-500 400 ">
                    “ {testimonial.review} ”
                  </p>
                  <h3 className="mt-6 text-xl underline font-medium text-purple-500">
                    - {testimonial.name}
                  </h3>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      ))}
    </>
  );
};

Images.propTypes = {
  imgIndex: PropTypes.number.isRequired,
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};

export default Testimonial;
