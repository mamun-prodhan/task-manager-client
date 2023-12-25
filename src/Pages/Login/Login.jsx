import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // setError("");
    setSuccess("");
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess("successfully logged In");
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          title: "Successfull",
          text: "You have successfully logged In",
          icon: "success",
          button: "OK",
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setError("");
    setSuccess("");
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("Successfully logged in");
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          title: "Successfull",
          text: "You have successfully logged In",
          icon: "success",
          button: "OK",
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <div className="px-4 md:px-0">
      <h2 className="text-4xl font-bold text-center mt-10">
        Please <span className="text-[#FF6251]">Login</span>
      </h2>
      <div className="md:w-1/2 mx-auto">
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input input-bordered"
              required
            />
          </div>
          {error && <p className="text-red-400 font-bold my-4">{error}</p>}
          {success && (
            <p className="text-green-400 font-bold my-4">{success}</p>
          )}
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        {/* <div className="mt-3">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-primary w-full"
          >
            <FaGoogle></FaGoogle>
            <span>Login with Google </span>
          </button>
        </div> */}
        <p className="font-bold py-4">
          Dont have an account ? Please
          <Link to="/register" className="text-[#FF6251] ms-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
