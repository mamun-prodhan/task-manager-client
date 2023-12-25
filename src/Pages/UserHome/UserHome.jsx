import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import useTask from "../../hooks/useTask";
import { useEffect, useState } from "react";

const UserHome = () => {
  const [todo, setTodo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [tasks, refetch, isLoading] = useTask();
  console.log(tasks);

  // get and submit form data
  const onSubmit = async (data) => {
    console.log(data);
    const currentDate = new Date();
    const tasks = {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      priority: data.priority,
      createdAt: currentDate,
      email: user?.email,
      status: "todo",
    };
    // post task data to database
    const taskRes = await axiosPublic.post("/tasks", tasks);
    console.log(taskRes.data);
    if (taskRes.data.insertedId) {
      refetch();
      reset();
      Swal.fire({
        title: "Task Added",
        text: "Task added successfully",
        icon: "success",
      });
    }
  };

  // handle ongoing
  const handleOngoing = (_id) => {
    axiosPublic.patch(`/tasks-ongoing/${_id}`).then((res) => {
      console.log("status ongoing", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Ongoing task`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  // handle completed
  const handleCompleted = (_id) => {
    axiosPublic.patch(`/tasks-completed/${_id}`).then((res) => {
      console.log("status completed", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Completed task`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  // handle todo
  const handleTodo = (_id) => {
    axiosPublic.patch(`/tasks-todo/${_id}`).then((res) => {
      console.log("status todo", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Add in Todo`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // handle delete request
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/tasks/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Task has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <h2 className="text-xl font-bold text-center my-20 text-red-500">
        Loading....
      </h2>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="container">
        {/* add task section */}
        <div className="max-w-lg mx-auto">
          <h2 className="text-4xl font-bold text-center mt-10">
            Add <span className="text-[#FF6251]">Task</span>
          </h2>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="title"
                placeholder="title"
                className="input input-bordered"
                required
                {...register("title", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                placeholder="description"
                className="input input-bordered"
                required
                {...register("description", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <input
                type="time"
                placeholder="deadline"
                className="input input-bordered"
                required
                {...register("deadline", { required: true })}
              />
            </div>
            {/* blood group */}
            <div>
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                className="select select-bordered w-full"
                id="priority"
                {...register("priority", { required: true })}
              >
                <option value={"low"}>Low</option>
                <option value={"moderate"}>Moderate</option>
                <option value={"high"}>High</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
        {/* all task */}
        <div>
          <div>
            <h2 className="text-center text-xl md:text-4xl font-bold my-5">
              Your All Tasks
            </h2>
            <div className="grid gap-10 grid-cols-1 md:grid-cols-3">
              <div>
                <h2 className="text-xl font-bold text-center mb-3">To-Do</h2>
                <div>
                  {tasks.map((task) => (
                    <div key={task._id}>
                      {task.status === "todo" && (
                        <div className="flex items-center justify-between capitalize p-6 rounded-lg my-4 bg-indigo-200">
                          <p>{task.title}</p>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                handleOngoing(task._id);
                              }}
                              className="px-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                            >
                              Start
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(task._id);
                              }}
                              className="px-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-center mb-3">On-Going</h2>
                <div>
                  {tasks.map((task) => (
                    <div key={task._id}>
                      {task.status === "ongoing" && (
                        <div className="flex items-center justify-between capitalize p-6 rounded-lg my-4 bg-indigo-200">
                          <p>{task.title}</p>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                handleCompleted(task._id);
                              }}
                              className="px-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(task._id);
                              }}
                              className="px-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-center mb-3">
                  Completed
                </h2>
                <div>
                  {tasks.map((task) => (
                    <div key={task._id}>
                      {task.status === "completed" && (
                        <div className="flex items-center justify-between capitalize p-6 rounded-lg my-4 bg-indigo-200">
                          <p>{task.title}</p>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                handleTodo(task._id);
                              }}
                              className="px-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                            >
                              Start Again
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(task._id);
                              }}
                              className="px-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
