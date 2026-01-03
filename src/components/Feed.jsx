import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getData = async () => {
    if (feed) return;
    const response = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(response.data));
    console.log(response);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    feed && (
      <div className='h-[90vh] flex justify-center items-center'>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
