import { useState } from "react";
import SignupForm from "@/forms/SignupForm";
import LoginForm from "@/forms/LoginForm";
import { Navigate } from "react-router-dom";

const SignUpPage = ({ user }: { user: any }) => {
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col  bg-white rounded-lg shadow-md flex flex-col">
      <div className="">
        {isSignUpActive && <SignupForm />}
        {!isSignUpActive && <LoginForm />}
        {isSignUpActive && (
          <div className="flex flex-1 justify-center gap-2 pb-8">
            <span className="">Already have an account?</span>
            <br />
            <a onClick={handleMethodChange} className="hover:text-beep-100">
              Login
            </a>
          </div>
        )}
        {!isSignUpActive && (
          //align item to center tailwindcss
          <div className="flex flex-1 justify-center gap-2">
            <span className="">Don't have an account?</span>
            <br />
            <a
              onClick={handleMethodChange}
              className="hover:text-beep-100 pb-8"
            >
              Click here to create one!
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
