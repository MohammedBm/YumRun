import { useMutation } from "react-query";
import { toast } from "sonner";

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  storeId: string;
};

export const useCreateCheckoutSession = () => {
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const response = await fetch(
      `http://localhost:3000/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
      console.log(error);
    }

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
