import { auth } from "@/firebase";
import { Order } from "@/types";
import { useQuery } from "react-query";

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
