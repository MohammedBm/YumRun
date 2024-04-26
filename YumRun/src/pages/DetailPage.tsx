import { MenuItem } from "@/components/MenuItem";
import { StoreInfo } from "@/components/StoreInfo";
import { Store } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { AspectRatioIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetailPage = ({}) => {
  const { id } = useParams();
  const [store, setStore] = useState<Store>(null);
  const [isGetLoading, setisGetLoading] = useState(true);

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
            <MenuItem menuItem={menuItem} />
          ))}
        </div>
      </div>
    </div>
  );
};
