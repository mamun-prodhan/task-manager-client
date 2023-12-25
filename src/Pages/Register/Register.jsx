import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

// imgbb api key
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // get and submit form data
  const onSubmit = async (data) => {
    console.log(data);
    setLoginError("");
    // image upload to imgbb and get the url
    const imageFile = { image: data.photo[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // console.log(res);
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const users = {
        name: data.name,
        email: data.email,
        photo: res.data.data.display_url,
        password: data.password,
      };
      // post user data to database
      const userRes = await axiosPublic.post("/users", users);
      console.log(userRes.data);
      if (userRes.data.insertedId) {
        createUser(data.email, data.password)
          .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
            reset();
            Swal.fire({
              title: "Register Successfull",
              text: "You clicked the button!",
              icon: "success",
            });
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setLoginError(error.message);
          });
      }
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col shadow-2xl bg-base-100">
          <h2 className="text-4xl font-bold text-center mt-10">
            Please <span className="text-[#FF6251]">Register</span>
          </h2>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="name"
                className="input input-bordered"
                required
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                placeholder="Your photo"
                className="file-input input-bordered"
                required
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <span className="text-red-600 mt-2 text-sm font-bold">
                  Your Photo field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-600 mt-2 text-sm font-bold">
                  Email field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password", {
                  required: true,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  minLength: 6,
                  maxLength: 10,
                })}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600 mt-2 text-sm font-bold">
                  Password field is required
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600 mt-2 text-sm font-bold">
                  Password must have, One Uppercase, One Lowercase, One Number
                  and One Special Character
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 mt-2 text-sm font-bold">
                  Password must be 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600 mt-2 text-sm font-bold">
                  Password max length is 10
                </p>
              )}
            </div>
            {loginError && (
              <p className="font-bold text-red-600 my-5">{loginError}</p>
            )}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <p className="font-bold py-4 text-center">
            New to this Website ? Please{" "}
            <Link to="/login" className="text-[#FF6251]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
