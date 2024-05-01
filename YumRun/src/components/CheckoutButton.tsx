import React, { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import LoginForm from "@/forms/LoginForm";
import UserProfileForm from "@/forms/profile-forms/UserProfileForm";
import LoadingButton from "./LoadingButton";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

export const CheckoutButton = ({ disabled, onCheckout, isLoading }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isGetLoading, setisGetLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    if (auth.currentUser) {
      setisGetLoading(true);
      await fetch(`http://localhost:3000/api/user/${auth.currentUser?.uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setisGetLoading(false);
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          setisGetLoading(false);
        });
    }
  };

  if (isGetLoading || !auth.currentUser || isLoading) return <LoadingButton />;
  return (
    <>
      {!auth.currentUser ? (
        <Dialog>
          <DialogTrigger asChild className="">
            <Button
              className="w-full bg-beep-100 text-white"
              variant="outline"
              onClick={() => setShowDialog(true)}
            >
              Log in to Checkout
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
            <LoginForm />
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={disabled}
              className="bg-beep-100 flexe-1 w-full text-white"
            >
              Go to Checkout
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
            <UserProfileForm
              user={userData}
              onSave={onCheckout}
              isLoading={isGetLoading}
              title="Confirm Delivery Details"
              buttonText="Continue to Payment"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
