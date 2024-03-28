import { useEffect, useState } from "react";
import { useData } from "../context/data";

export const Projects = () => {
  const { data } = useData();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterbtn, setFilterBtn] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    // Function to open the modal
    const openModal = () => {
      const modal = document.getElementById("my_modal_3");
      if (modal) {
        modal.showModal();
      }
    };

    // Open the modal when selectedProject is updated
    if (selectedProject) {
      openModal();
    }
  }, [selectedProject]);

  // Check if data and user.projects are available before mapping over projects
  if (
    !data ||
    !data.user ||
    !data.user.projects ||
    data.user.projects.length === 0
  ) {
    return <p>No projects available</p>;
  }

  const enabledProjects = data.user.projects.filter(
    (project) => project.enabled
  );

  // Sort the enabledProjects based on the sequence property
  enabledProjects.sort((a, b) => a.sequence - b.sequence);

  const handleFilterByTech = (tech) => {
    // Filter projects based on the selected tech stack
    const filteredProjects = enabledProjects.filter((project) => {
      const included = project.techStack.some(
        (techItem) => techItem.trim() === tech.trim()
      );

      return included;
    });

    // Update state with filtered projects
    setFilteredProjects(filteredProjects);
    setFilterBtn(false); // Close the filter dropdown after selecting a tech stack
  };

  const handleShowAllProjects = () => {
    // Show all projects and sort them based on sequence
    const allProjects = data.user.projects.filter((project) => project.enabled);
    allProjects.sort((a, b) => a.sequence - b.sequence);
    setFilteredProjects(allProjects);
    setFilterBtn(false); // Close the filter dropdown after selecting a tech stack
  };
  const projectsToDisplay =
    filteredProjects.length > 0 ? filteredProjects : enabledProjects;

  return (
    <>
      <section id="projects" className="p-6 bg-black lg:ml-96">
        <div className="flex lg:flex-row flex-col justify-between  lg:items-end">
          <h2 className="font-black text-purple-300 text-5xl lg:text-7xl uppercase">
            check out <br /> my latest work
          </h2>

          <div className="my-4 flex items-end lg:w-fit w-full justify-end cursor-pointer z-20">
            <div className="relative">
              <div
                onClick={() => setFilterBtn(!filterbtn)}
                className="inline-flex items-center overflow-hidden rounded-md border bg-white"
              >
                <h1 className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                  Filter Projects
                </h1>
                <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                  <span className="sr-only">Menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {filterbtn ? (
                <div className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-xl">
                  <div className="p-2">
                    {/* Add an option to show all projects */}
                    <h1
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      onClick={() => handleShowAllProjects()}
                      role="menuitem"
                    >
                      All Projects
                    </h1>

                    {[
                      ...new Set(
                        data.user.projects.flatMap((project) =>
                          project.techStack.map((tech) => tech.trim())
                        )
                      ),
                    ].map((tech, index) => (
                      <h1
                        key={index}
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        onClick={() => handleFilterByTech(tech)}
                        role="menuitem"
                      >
                        {tech}
                      </h1>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="container flex flex-col pb-10 mx-auto">
          <hr className="my-8 border-gray-800" />
          <div className="grid grid-cols-1 gap-6 justify-between md:grid-cols-2 xl:grid-cols-3">
            {projectsToDisplay.map((project, index) => (
              <div
                key={index}
                className="bg-zinc-100 border-2 hover:shadow-2xl flex flex-col justify-between duration-200 hover:-translate-y-2 z-10 p-4 h-full rounded-3xl"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    className="object-cover hover:scale-105 duration-150 object-center w-full h-44 rounded-lg lg:h-44"
                    src={project.image.url}
                    alt=""
                  />
                </div>
                <div className="mt-8">
                  <h1 className="mt-4 text-xl font-bold text-gray-800">
                    {project.title}
                  </h1>

                  <div className="flex items-center justify-between mt-4">
                    <div className="w-full">
                      <div className="flex gap-3 flex-wrap">
                        {project.techStack.map((tech, index) => (
                          <h1
                            key={index}
                            className="whitespace-nowrap rounded-full h-fit bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
                          >
                            {tech}
                          </h1>
                        ))}
                      </div>
                      <div className="flex w-full gap-2 my-3">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="w-full btn my-6 hover:bg-white hover:text-black border-2 border-black bg-black text-white text-sm px-8 py-2"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for project details */}
        {selectedProject && (
          <>
            <dialog id="my_modal_3" className="modal text-black w-full">
              <div
                key={selectedProject._id}
                className="group flex-col lg:flex-row relative flex gap-4 p-4 lg:w-[900px] md:w-[400px] w-screen overflow-hidden bg-neutral-100 rounded-xl"
              >
                <div className="lg:h-fit w-full h-1/2 flex justify-center items-center lg:w-1/2 rounded-lg bg-gradient-to-r overflow-hidden from-purple-400  to-purple-600">
                  <img
                    className="bg-center bg-cover"
                    src={selectedProject.image.url}
                    alt=""
                  />
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center gap-4">
                  <p className="bg-purple-300 py-1 rounded-full w-fit px-4">
                    {selectedProject.title}
                  </p>

                  <p>{selectedProject.description}</p>
                  <div className="flex gap-3 flex-wrap">
                    {selectedProject.techStack.map((item, index) => (
                      <h1
                        key={index}
                        className="bg-zinc-200 w-fit px-3 rounded-md"
                      >
                        {item}
                      </h1>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={selectedProject.liveurl}>
                      <button className="w-fit z-40 hover:bg-white rounded-xl duration-150 hover:text-black border-2 border-black bg-black text-white text-sm px-8 py-2">
                        Live Link
                      </button>
                    </a>
                    <a href={selectedProject.liveurl}>
                      <button className="w-fit z-40 hover:bg-white rounded-xl duration-150 hover:text-black border-2 border-black bg-black text-white text-sm px-8 py-2">
                        Github
                      </button>
                    </a>
                  </div>
                  <div className="modal-action">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="btn btn-sm bg-black text-white hover:bg-zinc-800 btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </dialog>
          </>
        )}
      </section>
    </>
  );
};

export default Projects;
