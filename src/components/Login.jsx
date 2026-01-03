import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("vivek@meta.com");
  const [password, setPassword] = useState("Vivek@5775");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    if (user) return navigate("/");
  });

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className='card bg-base-300 w-96 shadow-sm'>
        <div className='card-body items-center text-center'>
          <h2 className='card-title text-2xl'>LogIn</h2>
          <div className='w-full my-2'>
            <input
              className='w-full bg-base-200 p-2 '
              type='text'
              placeholder='Enter Email'
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div className='w-full my-2'>
            <input
              className='w-full bg-base-200 p-2 '
              type='text'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className='text-red-500 items-start'>{error}</div>}
          <div className='card-actions'>
            <button
              className='btn btn-primary'
              onClick={() => handleLogin()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
