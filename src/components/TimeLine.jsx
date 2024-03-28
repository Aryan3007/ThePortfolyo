/* eslint-disable no-unused-vars */
import { useData } from "../context/data";

const TimeLine = () => {
  const { data } = useData();

  // Check if data and user are available before mapping over services
  if (
    !data ||
    !data.user ||
    !data.user.timeline ||
    data.user.timeline.length === 0
  ) {
    return <p>No timeline available</p>;
  }

  // Filter enabled timelines for education and not for education
  const enabledTimelines = data.user.timeline.filter(
    (timeline) => timeline.enabled
  );
  const enabledTimelines_foreducation = enabledTimelines.filter(
    (timeline) => timeline.forEducation
  );
  const enabledTimelines_Notforeducation = enabledTimelines.filter(
    (timeline) => !timeline.forEducation
  );

  // Sort timelines based on sequence
  enabledTimelines_foreducation.sort((a, b) => a.sequence - b.sequence);
  enabledTimelines_Notforeducation.sort((a, b) => a.sequence - b.sequence);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div id="timeline" className="p-6 lg:ml-96">
      <h2 className="font-black text-purple-300 text-5xl lg:text-7xl  uppercase">
        Timeline
      </h2>
      <hr className="my-8 border-gray-800" />
      <h1 className="text-white text-5xl font-bold my-6">For Education</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        {enabledTimelines_foreducation.map((time, index) => (
          <article
            key={index}
            className="flex z-40 bg-white hover:bg-zinc-900 duration-200 rounded-xl shadow-lg hover:text-gray-100 text-gray-900 overflow-hidden transition hover:shadow-xl"
          >
            <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
              <time
                dateTime={time.endDate}
                className="flex items-center justify-between gap-4 text-xs font-bold uppercase "
              >
                <span>{formatDate(time.endDate)}</span>
                <span className="w-px flex-1 bg-gray-900/10"></span>
                <span>{formatDate(time.startDate)}</span>
              </time>
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                <a href="#">
                  <div className="flex gap-4 items-center">
                    <h1 className="h-8 w-8 bg-black text-white flex justify-center items-center rounded-full">
                      {index + 1}
                    </h1>
                    <h1 className="font-bold underline capitalize my-4 text-2xl">
                      {time.company_name}
                    </h1>
                  </div>
                  <h3 className="font-light text-sm uppercase bg-purple-300 w-fit px-4 py-1 rounded-full text-gray-900">
                    {time.jobTitle}
                  </h3>
                </a>
                <ul>
                  {time.bulletPoints.map((points, index) => (
                    <li key={index} className="mt-2 list-disc text-sm/relaxed ">
                      {points}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:flex sm:items-end sm:justify-end">
                <h1
                  href="#"
                  className="block bg-purple-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition"
                >
                  {time.jobLocation}
                </h1>
              </div>
            </div>
          </article>
        ))}
      </div>

      <h1 className="text-white text-5xl font-bold my-6">For Experience</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        {enabledTimelines_Notforeducation.map((time, index) => (
          <article
            key={index}
            className="flex z-40 bg-white hover:bg-zinc-900 duration-200 rounded-xl shadow-lg hover:text-gray-100 text-gray-900 overflow-hidden transition hover:shadow-xl"
          >
            <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
              <time
                dateTime={time.endDate}
                className="flex items-center justify-between gap-4 text-xs font-bold uppercase "
              >
                <span>{formatDate(time.endDate)}</span>
                <span className="w-px flex-1 bg-gray-900/10"></span>
                <span>{formatDate(time.startDate)}</span>
              </time>
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                <a href="#">
                  <div className="flex gap-4 items-center">
                    <h1 className="h-8 w-8 bg-black text-white flex justify-center items-center rounded-full">
                      {index + 1}
                    </h1>
                    <h1 className="font-bold underline capitalize my-4 text-2xl">
                      {time.company_name}
                    </h1>
                  </div>
                  <h3 className="font-light text-sm uppercase bg-purple-300 w-fit px-4 py-1 rounded-full text-gray-900">
                    {time.jobTitle}
                  </h3>
                </a>
                <ul>
                  {time.bulletPoints.map((points, index) => (
                    <li key={index} className="mt-2 list-disc text-sm/relaxed ">
                      {points}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:flex sm:items-end sm:justify-end">
                <h1
                  href="#"
                  className="block bg-purple-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition"
                >
                  {time.jobLocation}
                </h1>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
