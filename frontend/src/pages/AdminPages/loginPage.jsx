import { AuthFormHeader } from "../../components/AdminComponents/AuthFormTitle";
import { LoginForm } from "../../components/AdminComponents/LoginForm";

export const LoginPage = () => {
  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/Images/login_background-3.jpg')", // Added missing single quote
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "200px", // Add some height to see the background
      }}
    >
      <div
        className="w-[35%] rounded-lg py-20 px-10"
        style={{
          backgroundImage: "url('/Images/login_background-4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "200px",
          backgroundAttachment: "fixed",
        }}
      >
        <AuthFormHeader />
        <LoginForm />
      </div>
    </div>
  );
};
