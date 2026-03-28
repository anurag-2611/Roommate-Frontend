import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AnthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useGSAP(() => {
    gsap.fromTo(
      ".login-form",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
    );
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);

      toast.success("Login successful 🎉", {
        position: window.innerWidth < 600 ? "top-center" : "top-center", // Responsive position
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        className: "custom-toast-success", // For styling the container
        bodyClassName: "custom-toast-body", // For styling the text
        onClose: () => navigate("/dashboard"),
      });

      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Header />
      <div className="bg-transparent p-10 flex flex-col items-center text-white border-2 border-black rounded-lg login-form w-[94%] sm:w-96">
        <h1 className="text-3xl text-black font-bold">Login</h1>

        <form
          className="flex flex-col gap-5 pt-10 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              placeholder="Enter the email"
              className="py-2 px-4 bg-transparent border text-black rounded-xl w-full outline-none"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address.",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 ml-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              placeholder="Enter the password"
              type="password"
              className="py-2 px-4 bg-transparent border text-black rounded-xl w-full outline-none"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 ml-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <input
            className="bg-[#84ea51] py-1.5 rounded-xl text-black font-medium mt-10 cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>

        <p className="text-black mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-900 underline">
            Create
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};
