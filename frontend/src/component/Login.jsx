import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const url = "https://rirm-assignment-backend.onrender.com";
  const [current, setcurrent] = useState("Login");
  const [data, setdata] = useState({
    name: "",
    password: "",
  });
  const onChangeHandel = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (current === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/signup";
    }
    navigate("/home");
    const response = await axios.post(newUrl, data);

    // if (response.data.success) {
    //   settoken(response.data.token);
    //   localStorage.setItem("token", response.data.token);
    //   navigate("/home");
    //   setshow(false);
    // } else {
    //   alert(response.data.message);
    // }
  };

  return (
    <div className="absolute  w-[100%] h-[100%] bg-[#000000c6] grid">
      <form
        onSubmit={onSubmit}
        className="animate-fadeInPop place-self-center w-[420px] text-[#808080] bg-white flex flex-col gap-[25px] p-[25px_30px] rounded-[10px] font-[15px]"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-[500] text-black">{current}</h1>
          <img
            src={assets.cross_icon}
            alt=""
            className="w-[15px] cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-[20px]   ">
          {/* {current === "Sign-In" ? (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandel}
              type="text"
              placeholder="Your Name"
              required
              className="outline-none border-[1px] border-solid border-[#c9c9c9] p-[10px] rounded-[5px] "
            />
          ) : (
            <></>
          )} */}
          <input
            name="name"
            value={data.name}
            onChange={onChangeHandel}
            type="text"
            placeholder="(Name)For name =  demo"
            required
            className="outline-none border-[1px] border-solid border-[#c9c9c9] p-[10px] rounded-[5px] "
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandel}
            type="text"
            placeholder="(Password)For Password = demo"
            required
            className="outline-none border-[1px] border-solid border-[#c9c9c9] p-[10px] rounded-[5px] "
          />
        </div>
        <button
          type="submit"
          className="bg-[tomato] p-[10px] rounded-[10px] text-[20px] cursor-pointer text-white font-[500] border-none"
        >
          {current === "Sign-In" ? "Create account" : "Login"}
        </button>
        <div className="flex gap-[5px] items-start ">
          <input type="checkbox" className="mt-[6px]" />
          <p>By continuing, i agree to the term of use and privacy policy.</p>
        </div>
        {current === "Sign-In" ? (
          <p>
            Already have an account.
            <span
              onClick={() => setcurrent("Login")}
              className="text-red-700 cursor-pointer text-[20px]"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Create new account?
            <span
              onClick={() => setcurrent("Sign-In")}
              className="text-red-700 cursor-pointer text-[20px]"
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
