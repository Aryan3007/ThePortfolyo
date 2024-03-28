import { useEffect } from "react";

const Cursor = () => {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const cursor = document.getElementById("cursor");

      if (cursor) {
        cursor.style.left = event.clientX - 50 + "px";
        cursor.style.top = event.clientY - 50 + "px";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="cursor"
      className="cursor lg:flex hidden"
      style={{
        position: "fixed",
        width: "100px",
        height: "100px",
        background: "#E08BFF",
        borderRadius: "50%",
      }}
    ></div>
  );
};

export default Cursor;
