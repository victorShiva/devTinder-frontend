import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log(user);

  const fetchData = async () => {
    try {
      console.log(user);
      if (!user) return navigate("/login");
      console.log("body-c");
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addUser(res?.data?.user));
    } catch (error) {
      if (error?.status === 401) return navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=''>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
