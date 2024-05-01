import { useCreateCheckoutSession } from "@/api/OrderApi";
import { CheckoutButton } from "@/components/CheckoutButton";
import { MenuItem } from "@/components/MenuItem";
import { OrderSummary } from "@/components/OrderSummary";
import { StoreInfo } from "@/components/StoreInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { auth } from "@/firebase";
import { MenuItem as MenuItemType, Store } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { UserProfile } from "firebase/auth";
import { User, WindIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const DetailPage = ({}) => {
  const { storeId } = useParams();
  const [store, setStore] = useState<Store>(null);
  const [isGetLoading, setisGetLoading] = useState(true);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedeCartItems = sessionStorage.getItem(`cartItems-${storeId}`);
    return storedeCartItems ? JSON.parse(storedeCartItems) : [];
  });

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

      sessionStorage.setItem(
        `cartItems-${storeId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem.id !== item.id
      );

      sessionStorage.setItem(
        `cartItems-${storeId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const fetchStore = async () => {
    setisGetLoading(true);
    await fetch(`http://localhost:3000/api/storeid/${storeId}`, {
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

  const onCheckout = async (userFormData: UserProfile) => {
    if (!store) {
      return;
    }
    // 6.93
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem.id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      storeId: storeId,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  useEffect(() => {
    fetchStore();
  }, []);
  console.log(auth);
  if (isGetLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-10">
      <h1>{storeId}</h1>
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
              <CheckoutButton
                isLoading={isCheckoutLoading}
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
