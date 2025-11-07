import { useForm } from "react-hook-form";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = () => {};

  return (
    <div>
      <div>
        <h1>SignUp</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            id="userData"
            placeholder="email/id"
            autoFocus
            className={`bg-gray-100 py-2 px-1 w-full border-none focus-within:outline-none rounded ${
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
      </form>
    </div>
  );
};
