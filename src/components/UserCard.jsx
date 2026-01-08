import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const loggedInUser = useSelector((store) => store.user);
  const { firstName, lastName, photoURL, about, age, gender, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='card bg-base-200 w-96 min-h-112.5 shadow-sm absolute top-30 '>
      <figure>
        <img
          className='w-96 h-96'
          src={photoURL}
          alt='userPhoto'
        />
      </figure>
      <div className='card-body'>
        <div>
          <h2 className='card-title'>{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          {about && <p>{about}</p>}
          {skills.length && <p>{skills.join(", ")}</p>}
        </div>
        {!(loggedInUser?._id === user?._id) && (
          <div className='card-actions justify-between'>
            <button
              className='btn btn-outline btn-secondary'
              onClick={() => handleSendRequest("ignored", user._id)}>
              Ignore
            </button>
            <button
              className='btn btn-outline btn-success'
              onClick={() => handleSendRequest("intrested", user._id)}>
              Intrested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
