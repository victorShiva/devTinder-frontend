import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoURL, about, age, gender } = user;

  return (
    <div className='card bg-base-200 w-96 min-h-112.5 shadow-sm absolute top-30 '>
      <figure>
        <img
          src={photoURL}
          alt='userPhoto'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        {about && <p>{about}</p>}
        <div className='card-actions justify-between'>
          <button className='btn btn-outline btn-secondary'>Ignore</button>
          <button className='btn btn-outline btn-success'>Intrested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
