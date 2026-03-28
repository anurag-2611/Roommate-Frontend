import React from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { registerUser } from "../Api/auth.api";

export const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useGSAP(() => {
    gsap.fromTo(
      ".signup-form",
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
      const result = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      if (result.statusCode >= 400) {
        toast.error("User already registered", {
          position: window.innerWidth < 600 ? "top-center" : "top-center", // Responsive position
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          className: "custom-toast-success", // For styling the container
          bodyClassName: "custom-toast-body", // For styling the text
        });
      } else {
        toast.success(result.message, {
          position: window.innerWidth < 600 ? "top-center" : "top-center", // Responsive position
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          className: "custom-toast-success", // For styling the container
          bodyClassName: "custom-toast-body", // For styling the text
        });

        reset();

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: window.innerWidth < 600 ? "top-center" : "top-center", // Responsive position
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        className: "custom-toast-success", // For styling the container
        bodyClassName: "custom-toast-body", // For styling the text
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Header />
      <div className="shadow-lg p-10 flex flex-col items-center text-white border-2 border-black rounded-lg signup-form w-[90%] sm:w-96">
        <h1 className="text-3xl text-black font-bold">Create Account</h1>

        <form
          className="flex flex-col gap-5 pt-10 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              placeholder="Enter the Firstname"
              className="py-2 px-4 bg-transparent border text-black rounded-xl w-full outline-none"
              {...register("firstName", {
                required: "First name is required.",
              })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2 ml-2">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <input
              placeholder="Enter the Lastname"
              className="py-2 px-4 bg-transparent border text-black rounded-xl w-full outline-none"
              {...register("lastName")}
            />
          </div>

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
              <p className="text-red-500 text-sm mt-2 ml-2 ">
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
            className="bg-[#84ea51] py-1.5 rounded-xl text-black font-medium cursor-pointer"
            type="submit"
          />
          <p className="text-black ml-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-900 underline">
              login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
