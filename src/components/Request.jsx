import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  try {
    const fetchRequests = async () => {
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    };
    useEffect(() => {
      fetchRequests();
    }, []);
  } catch (error) {
    console.log(error);
  }
  if (!requests) return;
  if (requests.length === 0)
    return <h1 className='my-20'>No Requests Found</h1>;
  return (
    <div className=' my-20 bg-base-100'>
      <h1 className='font-bold text-2xl text-center'>Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, age, gender, about, skills, photoURL } =
          request.fromUserId;
        return (
          <div
            className='p-4 my-4 bg-base-200 flex gap-10 w-1/2 m-auto'
            key={request._id}>
            <img
              src={photoURL}
              alt='user-photo'
              className='w-32 h-32'
            />
            <div className='flex flex-col gap-1'>
              <h2 className='text-xl font-semibold'>
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              {about && <p>{about}</p>}
              {skills && <p>{skills.join(", ")}</p>}
            </div>
            <div className='flex flex-wrap gap-2 items-center'>
              <button className='btn btn-secondary'>Reject</button>
              <button className='btn btn-accent'>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
