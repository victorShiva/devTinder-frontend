import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("jasmin@meta.com");
  const [password, setPassword] = useState("Jasmin@5775");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [error, setError] = useState("");
  console.log("login-c");

  const handleLogin = async () => {
    try {
      console.log("read handleLogin");
      console.log(BASE_URL);
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      console.log("read handleSignup");
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      console.log(res?.data?.data);
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      console.log("login useEffect");
      navigate("/");
    }
  }, []);

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className='card bg-base-300 w-96 shadow-sm'>
        <div className='card-body items-center text-center'>
          <h2 className='card-title text-2xl'>
            {isLoginForm ? "LogIn" : "SignUp"}
          </h2>
          {!isLoginForm && (
            <>
              <div className='w-full my-2'>
                <input
                  className='w-full bg-base-200 p-2 '
                  type='text'
                  placeholder='FirstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className='w-full my-2'>
                <input
                  className='w-full bg-base-200 p-2 '
                  type='text'
                  value={lastName}
                  placeholder='LastName'
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}
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
              className='w-full bg-base-200 p-2'
              type='text'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className='text-red-500 items-start self-start'>{error}</div>
          )}
          <div className='card-actions w-full'>
            <button
              className='btn btn-primary w-full'
              onClick={isLoginForm ? handleLogin : handleSignup}>
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            className='underline mt-1 cursor-pointer'
            onClick={() => setIsLoginForm(!isLoginForm)}>
            {isLoginForm
              ? "New User : SignUp Here"
              : "Existing User : LoginIn Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
