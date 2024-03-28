
import { useData } from "../context/data";
import Cursor from "./../components/Cursor";

const Hero = () => {
  const { data } = useData();

  // Check if data.user exists before accessing its properties
  if (!data || !data.user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Cursor />
      <section id="homepage" className="bg-black h-full lg:ml-96 z-10 lg:h-screen py-12 p-4 flex justify-center items-center">
        <div className="container px-6 py-10 mx-auto">
          <div className="mt-8 lg:-mx-6 lg:flex lg:items-start">
            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
              <p className="my-6 text-white">
                &ldquo; {data.user.about.quote} &ldquo;
              </p>
              <p className="text-xl text-purple-500 uppercase">
                {data.user.about.title}
              </p>

              <h1
                href="#"
                className="block mt-4 text-2xl font-semibold text-gray-200 underline"
              >
                {data.user.about.subTitle}
              </h1>
              <p className="mt-3 text-sm text-gray-300 md:text-sm">
                {data.user.about.description}
              </p>

              <div className="my-6 flex flex-wrap gap-4 z-20 relative text-white">
                <h1 className=" bg-gradient-to-tr to-purple-400 from-purple-500 w-fit px-4 py-2 rounded-full">
                  Experience of {data.user.about.exp_year} years
                </h1>
                <h1 className=" bg-gradient-to-tr to-purple-400 from-purple-500 w-fit px-4 py-2 rounded-full">
                  Worked on {data.user.about.some_total} + projects
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default Hero;