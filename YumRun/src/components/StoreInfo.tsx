import { Store } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Clock, Dot } from "lucide-react";

type Props = {
  store: Store;
};

export const StoreInfo = ({ store }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <span className="text-3xl font-bold tracking-tight">
            {store.storeName}
          </span>
          <div className="flex flex-row text-green-600 items-center">
            <Clock className="mr-1" />
            {store.deliveryTime} min
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-row justify-between">
            <div className="items-center">
              {store.city}, {store.country}
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex">
        {store.cuisines.map((cuisine, index) => (
          <div>
            <span className="flex">
              <span>{cuisine}</span>
              {index < store.cuisines.length - 1 && <Dot />}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
