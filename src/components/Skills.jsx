import { useData } from "../context/data";

const Skills = () => {
  const { data } = useData();

  // Filter enabled skills
  const enabledSkills = data.user.skills.filter((skill) => skill.enabled);

  // Sort enabled skills based on sequence
  enabledSkills.sort((a, b) => a.sequence - b.sequence);

  // Check if data and user are available before mapping over skills
  if (!data || !data.user || !data.user.skills || enabledSkills.length === 0) {
    return <p>No skills available</p>;
  }

  return (
    <div id="skills" className="p-8 bg-black lg:ml-96">
      <h2 className="font-black text-purple-300 text-5xl lg:text-7xl uppercase">
        My Skills
      </h2>
      <hr className="my-8 border-gray-400" />
      <div className="grid grid-cols-2 gap-6 justify-between md:grid-cols-2 xl:grid-cols-4">
        {enabledSkills.map((skill, index) => (
          <div
            key={index}
            className="group w-full z-10 rounded-lg bg-zinc-900 p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_#E99CFF]"
          >
            <p className="text-white text-2xl">{skill.name}</p>
            <p className="text-white text-sm">{skill.percentage} %</p>
            <img
              className="group-hover:opacity-100 absolute right-[10%] h-16 top-[50%] translate-y-[-50%] opacity-70 transition group-hover:scale-110 duration-300"
              src={skill.image.url}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
