import { SignupForm } from "../../components/AdminComponents/SignupForm";

export const SignupPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[40%] h-[30%] border border-1 border-[#f00] rounded-lg">
        <SignupForm />
      </div>
    </div>
  );
};
