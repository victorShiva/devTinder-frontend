import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.log("error" + error);
    }
  };
  return (
    <div className='navbar bg-base-200 shadow-sm fixed top-0 z-2'>
      <div className='flex-1'>
        <Link
          to='/'
          className='btn btn-ghost text-xl'>
          {" "}
          👦DevTinder
        </Link>
      </div>
      <div className='flex gap-2 mr-2'>
        {user && (
          <div className='dropdown dropdown-end flex items-center gap-2'>
            <div>Welcome {user.firstName}</div>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img
                  alt='user-avatar'
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex='-1'
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow top-10'>
              <li>
                <Link
                  to='/profile'
                  className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </Link>
              </li>
              <li>
                <Link to={"/user/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/user/request/received"}>Requests</Link>
              </li>
              <li onClick={() => handleLogOut()}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
