import { auth } from "@/firebase";
import { Order } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyStoreOrders = () => {
  const getMyStoreOrdersRequest = async (): Promise<Order[]> => {
    const response = await fetch(`${API_URL}/api/order/store-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: auth.currentUser?.uid }),
    });

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyStoreOrders",
    getMyStoreOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
  userId: string;
};

export const useUpdateeMyStoreOrder = () => {
  // check if user authenticated
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const updateMyStoreOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const response = await fetch(
      `${API_URL}/api/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: updateStatusOrderRequest.status,
          userId: updateStatusOrderRequest.userId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    return response;
  };

  const {
    mutateAsync: updateOrderStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyStoreOrder);

  if (isSuccess) {
    toast.success("Order status updated successfully");
  }

  if (isError) {
    toast.error("Failed to update order status");
    reset();
  }

  return { updateOrderStatus, isLoading };
};
