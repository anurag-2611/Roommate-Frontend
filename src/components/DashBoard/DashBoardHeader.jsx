import RoomMatelogo from "../../assets/RoomMate logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AnthContext";
import { useNavigate } from "react-router-dom";

export const DashBoardHeader = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-1 px-3 sm:px-8 md:px-10 flex justify-between items-center sm:w-full sm:mx-4 w-[95%] sm:mt-0 mt-2 md:w-4/5 text-black rounded-full fixed z-10 top-2 sm:top-4 sm:left-[49%] left-[50%] transform -translate-x-1/2 shadow-lg bg-white/15 backdrop-blur-lg border border-white/10 ">
      <div className="w-33 flex justify-center items-center">
        <div>
          <img
            className="w-full max-w-25.5 sm:max-w-30 md:max-w-32.5"
            src={RoomMatelogo}
            alt=""
            loading="lazy"
            onError={(e) => {
              e.target.src = "/fallback.webp";
            }}
          />{" "}
        </div>
      </div>
      <div className=" flex justify-center items-center gap-3 p-2 px-4 list-none">
        <button onClick={handleLogout} className="find-btn">
          log out
        </button>
      </div>
    </div>
  );
};
