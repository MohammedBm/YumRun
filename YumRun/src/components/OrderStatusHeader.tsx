import { Order } from "@/types";
import { orderBy } from "firebase/firestore";
import { Progress } from "./ui/progress";

type Props = {
  order: Order;
};

function OrderStatusHeader({ order }: Props) {
  const getExpectedDelivery = () => {
    // Assuming order.createdAt is the Firestore timestamp object
    const createdAtTimestamp = order.createdAt;

    console.log(createdAtTimestamp);
    // Create a new Date object from Firestore timestamp
    const createdAt = new Date(createdAtTimestamp._seconds * 1000);

    // Add estimated delivery time
    createdAt.setMinutes(createdAt.getMinutes() + order.store.deliveryTime);

    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>Order Status: {order.status}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress className="[&>*]:bg-beep-100 animate-pulse" value={50} />
    </>
  );
}

export default OrderStatusHeader;
