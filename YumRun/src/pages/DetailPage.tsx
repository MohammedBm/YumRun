import { CheckoutButton } from "@/components/CheckoutButton";
import { MenuItem } from "@/components/MenuItem";
import { OrderSummary } from "@/components/OrderSummary";
import { StoreInfo } from "@/components/StoreInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { MenuItem as MenuItemType, Store } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const DetailPage = ({}) => {
  const { id } = useParams();
  const [store, setStore] = useState<Store>(null);
  const [isGetLoading, setisGetLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItemType) => {
    console.log(menuItem);
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem.id === menuItem.id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem.id === menuItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem.id !== item.id
      );

      return updatedCartItems;
    });
  };

  const fetchStore = async () => {
    setisGetLoading(true);
    await fetch(`http://localhost:3000/api/storeid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          setStore(data);
          setisGetLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setisGetLoading(false);
      });
  };
  // Fetch store by id

  useEffect(() => {
    fetchStore();
  }, []);

  if (isGetLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-10">
      <h1>{id}</h1>
      <AspectRatio ratio={16 / 5}>
        <img
          src={store?.imageFile}
          alt=""
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <StoreInfo store={store} />
          <span className="text-2xl font-bold tracking-tightt">Menu</span>
          {store.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        {/* cart */}
        <div>
          <Card>
            <OrderSummary
              store={store}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />

            <CardFooter>
              <CheckoutButton />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
