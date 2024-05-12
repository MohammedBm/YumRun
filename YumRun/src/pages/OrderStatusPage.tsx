import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { auth } from "@/firebase";

export const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  console.log(orders);
  if (isLoading) return <div>Loading...</div>;

  if (!orders || orders.length === 0) return <div>No orders</div>;

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
        </div>
      ))}
    </div>
  );
};
