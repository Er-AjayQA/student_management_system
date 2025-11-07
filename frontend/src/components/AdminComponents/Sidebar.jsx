import { NavLink } from "react-router-dom";

export const AdminSidebar = () => {
  return (
    <div className="h-screen">
      <div className="p-4 border-b">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">ToDo</h1>
          <span className="text-gray-600">Manage Your Tasks!</span>
        </div>
      </div>

      <div className="p-4">
        <div>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block w-full p-2 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/my-tasks"
            className={({ isActive }) =>
              `block w-full p-2 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            My Tasks
          </NavLink>
        </div>
      </div>
    </div>
  );
};
