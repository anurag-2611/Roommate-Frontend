import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { StatusMessage } from "../components/StatusMessage";
import { getApiError, getSuccessStatus } from "../utils/apiError";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useGSAP(() => {
    gsap.fromTo(".login-form", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setStatus(null);
      await login({ email: data.email, password: data.password });
      setStatus(getSuccessStatus("You’re signed in. Taking you to your dashboard…"));
      reset();
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (error) {
      setStatus(getApiError(error, "We couldn’t sign you in. Check your email and password, then try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Header />
      <div className="bg-transparent p-10 flex flex-col items-center text-white border-2 border-black rounded-lg login-form w-[94%] sm:w-96">
        <h1 className="text-3xl text-black font-bold">Login</h1>
        <form className="flex flex-col gap-5 pt-10 w-full" onSubmit={handleSubmit(onSubmit)}>
          <StatusMessage status={status} />
          <div>
            <input placeholder="Enter your email" aria-invalid={Boolean(errors.email)} className="py-2 px-4 bg-transparent border text-black rounded-xl w-full outline-none" {...register("email", { required: "Email is required.", pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email address." } })} />
            {errors.email && <p className="text-red-600 text-sm mt-2 ml-2">{errors.email.message}</p>}
          </div>
          <div>
            <input placeholder="Enter your password" type="password" aria-invalid={Boolean(errors.password)} className="py-2 px-4 bg-transparent border text-black rounded-xl w-full outline-none" {...register("password", { required: "Password is required.", minLength: { value: 8, message: "Password must be at least 8 characters." } })} />
            {errors.password && <p className="text-red-600 text-sm mt-2 ml-2">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={loading} className={`w-full flex items-center justify-center gap-3 bg-[#84ea51] py-2 rounded-xl text-black font-medium mt-10 ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}>
            {loading ? <><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /><span>Logging in...</span></> : "Login"}
          </button>
        </form>
        <p className="text-black mt-4">Don't have an account? <Link to="/signup" className="text-blue-900 underline">Create one</Link></p>
      </div>
    </div>
  );
};
