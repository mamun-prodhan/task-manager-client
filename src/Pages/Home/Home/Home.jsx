import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i0.wp.com/getflowdotcom.wpcomstaging.com/wp-content/uploads/2020/06/task-management-workflow.jpg?fit=2000%2C1500&ssl=1)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <Link to="/login">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">
              Lets Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
