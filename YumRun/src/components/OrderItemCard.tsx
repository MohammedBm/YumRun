import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateeMyStoreOrder } from "@/api/MyStore";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

export const OrderItemCard = ({ order }: Props) => {
  const { isLoading, updateOrderStatus } = useUpdateeMyStoreOrder();

  const [status, setStatus] = useState<OrderStatus>(order.status);
  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateOrderStatus({
      orderId: order.id,
      status: newStatus,
      userId: auth.currentUser.uid,
    });

    setStatus(newStatus);
  };
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt._seconds * 1000);
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-bold">{order.deliveryDetails.name}</span>
          </div>
          <div>
            Delivery Address:
            <span className="ml-2 font-bold">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-bold">{getTime()}</span>
          </div>
          <div>
            Total:
            <span className="ml-2 font-bold">
              ${(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((item) => (
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
              <SelectContent position="popper">
                {ORDER_STATUS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectTrigger>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
