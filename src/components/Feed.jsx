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
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    feed && (
      <div className='flex justify-center items-center gap-5'>
        {feed.map((user, ind) => (
          <UserCard
            key={ind}
            user={user}
          />
        ))}
      </div>
    )
  );
};

export default Feed;
