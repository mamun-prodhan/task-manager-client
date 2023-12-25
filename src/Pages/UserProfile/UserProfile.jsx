import useProfile from "../../hooks/useProfile";

const UserProfile = () => {
  const [loggedInUser, refetch, isLoading] = useProfile();
  console.log("logged in user from dashboard", loggedInUser);
  return (
    <div>
      <div>
        <img
          className="rounded-full object-cover w-40 h-40 "
          src={loggedInUser?.photo}
          alt="user photo"
        />
      </div>
      <div className="mt-3 font-semibold">
        <h2>Name: {loggedInUser?.name}</h2>
        <p>Email: {loggedInUser?.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
