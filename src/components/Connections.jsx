import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
      console.log(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return <h1 className='my-20 text-center'>No Connetions Found</h1>;
  }
  return (
    <div className=' my-20 bg-base-100'>
      <h1 className='font-bold text-2xl text-center'>Connetions</h1>
      {connections.map((connection, ind) => {
        const { firstName, lastName, age, gender, about, skills, photoURL } =
          connection;
        return (
          <div
            className='p-4 my-4 bg-base-200 flex gap-10 w-1/2 m-auto'
            key={ind}>
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
