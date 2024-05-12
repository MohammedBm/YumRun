import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { auth } from "@/firebase";

const MobileNavLinks = () => {
  return (
    <>
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-beep-100"
      >
        Order Status
      </Link>
      <Link
        to="/manage-store"
        className="flex bg-white items-center font-bold hover:text-beep-100"
      >
        Managa Store
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-beep-100"
      >
        User Profile
      </Link>
      <Button
        onClick={() => auth.signOut()}
        className="flex items-center px-3 font-bold hover:bg-beep-100"
      >
        Log out
      </Button>
    </>
  );
};

export default MobileNavLinks;
