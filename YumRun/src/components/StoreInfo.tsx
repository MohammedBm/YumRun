import { Store } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  store: Store;
};

export const StoreInfo = ({ store }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {store.storeName}
        </CardTitle>
        <CardDescription>
          {store.city}, {store.country}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex">
        {store.cuisines.map((cuisine, index) => (
          <span className="flex">
            <span>{cuisine}</span>
            {index < store.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};
