const Loader = () => {
  return (
    <div className="h-screen loader-container w-screen flex justify-center items-center">
      <div className="loader">
        <div className="intern"></div>
        <div className="external-shadow">
          <div className="central"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
