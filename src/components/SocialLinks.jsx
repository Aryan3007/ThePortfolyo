/* eslint-disable no-unused-vars */

import PropTypes from "prop-types";
import { FiMail, FiUser, FiUsers } from "react-icons/fi";
import { useData } from "../context/data";

const SocialLinks = () => {
  const { data } = useData();

  const enabledSocial_handels = data.user.social_handles.filter(
    (social) => social.enabled
  );

  // Check if data and user are available before mapping over social handles
  if (
    !data ||
    !data.user ||
    !data.user.social_handles ||
    data.user.social_handles.length === 0
  ) {
    return <p>No social_handles available</p>;
  }

  const socialHandles = data.user.social_handles;

  return (
    <div id="contact" className="p-4 lg:ml-96">
      <h2 className="font-black text-white  text-5xl my-6 lg:text-5xl  uppercase">
        Social links
      </h2>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {enabledSocial_handels.map((handle, index) => (
          <Card
            key={index}
            title={handle.platform}
            href={handle.url}
            Icon={handle.image.url}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, Icon, href }) => {
  return (
    <a
      href={href}
      className="w-full p-4 z-30 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-r z-1 from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
      <img
        className="absolute z-10 -top-12 h-44 opacity-50 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300"
        src={Icon}
        alt=""
      />

      <img
        className="mb-2 h-12 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300"
        src={Icon}
        alt=""
      />
      <h3 className="font-medium text-lg text-slate-100 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
    </a>
  );
};

// PropTypes for Card
Card.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  href: PropTypes.string.isRequired,
};

export default SocialLinks;
