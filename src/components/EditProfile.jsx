import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, about, gender, photoURL },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  return (
    user && (
      <div className='flex justify-center gap-5'>
        <div className='flex justify-center my-20'>
          <div className='card bg-base-300 w-96 shadow-sm'>
            <div className='card-body items-center text-center'>
              <h2 className='card-title text-2xl'>Edit Profile</h2>
              <div className='w-full my-2'>
                <div className='text-start mb-1'>
                  <span className='label'>FirstName :</span>
                </div>
                <input
                  className='w-full bg-base-200 p-2 '
                  type='text'
                  placeholder='Enter FirstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className='w-full my-2'>
                <div className='text-start mb-1'>
                  <span className='label'>LastName :</span>
                </div>
                <input
                  className='w-full bg-base-200 p-2 '
                  type='text'
                  placeholder='Enter FirstName'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className='w-full my-2'>
                <div className='text-start mb-1'>
                  <span className='label'>Age :</span>
                </div>
                <input
                  className='w-full bg-base-200 p-2 '
                  type='text'
                  placeholder='Enter FirstName'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className='w-full my-2'>
                <div className='text-start mb-1'>
                  <span className='label'>Gender :</span>
                </div>
                <input
                  className='w-full bg-base-200 p-2 '
                  type='text'
                  placeholder='Enter Gender'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className='w-full my-2'>
                <div className='text-start mb-1'>
                  <span className='label'>About :</span>
                </div>
                <input
                  className='w-full bg-base-200 p-2 '
                  type='text'
                  placeholder='Enter About'
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div className='w-full my-2'>
                <div className='text-start mb-1'>
                  <span className='label'>PhotoUrl :</span>
                </div>
                <input
                  className='w-full bg-base-200 p-2 '
                  type='text'
                  placeholder='Enter PhotoUrl'
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>
              {error && <div className='text-red-500 items-start'>{error}</div>}
              <div className='card-actions'>
                <button
                  className='btn btn-primary'
                  onClick={saveProfile}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <UserCard user={user} />
        </div>
        {showToast && (
          <div className='toast toast-top toast-center z-10'>
            <div className='alert alert-success'>
              <span>Message sent successfully.</span>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default EditProfile;
