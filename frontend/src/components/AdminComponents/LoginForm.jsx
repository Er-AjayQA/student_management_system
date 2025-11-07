import { useForm } from "react-hook-form";
import { FaUserAlt, FaKey } from "react-icons/fa";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-5 mt-10"
    >
      {/* User Login Details */}
      <div className="flex items-center gap-10">
        <FaUserAlt fill="white" className="w-5 h-5" />
        <input
          type="text"
          id="userData"
          placeholder="email/id"
          autoFocus
          className={`bg-gray-100 py-2 px-1 w-full border-b border-b-[#9C9C9C] placeholder:text-white focus-within:outline-none text-white bg-transparent ${
            errors.userData && "placeholder:text-red-500"
          }`}
          {...register("userData", {
            required: "This field is required",
          })}
        />
        {errors.userData && (
          <p className="text-red-500 text-sm">{errors.userData.message}</p>
        )}
      </div>

      {/* User Password */}
      <div className="flex items-center gap-10">
        <FaKey fill="white" className="w-5 h-5" />
        <input
          type="password"
          id="password"
          placeholder="password"
          autoFocus
          className={`bg-gray-100 py-2 px-1 w-full border-b border-b-[#9C9C9C] placeholder:text-white focus-within:outline-none text-white bg-transparent ${
            errors.password && "placeholder:text-red-500"
          }`}
          {...register("password", {
            required: "This field is required",
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-center mt-10">
        <button className="bg-[#F4AF26] px-10 py-2 rounded-lg">Login</button>
      </div>
    </form>
  );
};
