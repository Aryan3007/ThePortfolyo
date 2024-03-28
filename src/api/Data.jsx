/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useData } from "../context/data";

const Data = () => {
  const [error, setError] = useState(null);
  const { data, setData } = useData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [setData]);

  return;
};

export default Data;
