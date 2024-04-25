import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { AspectRatioIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetailPage = ({}) => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [isGetLoading, setisGetLoading] = useState(false);

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
  console.log(store);
  if (isGetLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap10">
      <AspectRatio ratio={16 / 5}></AspectRatio>
    </div>
  );
};
