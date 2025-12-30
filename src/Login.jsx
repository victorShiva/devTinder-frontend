import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("shivam@meta.com");
  const [password, setPassword] = useState("Shivam@5775");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log("Login successful: ", res.data);
    } catch (error) {
      console.error("Login failed : ", error);
    }
  };

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
