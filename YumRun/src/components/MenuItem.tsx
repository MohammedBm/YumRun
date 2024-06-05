import { MenuItem as mItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: mItem;
  addToCart: () => void;
};

export const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer " onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ${(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};
