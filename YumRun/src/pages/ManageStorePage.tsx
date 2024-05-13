import { AuthContext } from "@/context/Auth";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store } from "@/types";
import { useGetMyStoreOrders } from "@/api/MyStore";
import ManageStoreForm from "@/forms/mange-store-form/ManageStoreForm";
import { OrderItemCard } from "@/components/OrderItemCard";

const API_URL = import.meta.env.VITE_API_BASE_URL;

type Props = {
  store: Store | null;
  onSave: (storeFormData: FormData) => void;
  isLoading: boolean;
};

const ManageStorePage = ({}: Props) => {
  const { currentUser } = useContext(AuthContext);
  // import toast
  const [isLoading, setIsLoading] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const [isGetLoading, setIsGetLoading] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const onSaveStore = async (storeFormData: FormData) => {
    // Query the 'stores' collection to find a store with the user's ID
    const storeRef = collection(db, "stores");
    const q = query(storeRef, where("user", "==", currentUser.uid));
    try {
      const querySnapshot = await getDocs(q);

      // Check if a store already exists for the current user
      if (!querySnapshot.empty) {
        toast.error("Store already exists");
        return;
      }
      // If store doesn't exist, send a POST request to your API endpoint
      const response = await fetch(`${API_URL}/api/store/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storeFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to save store data");
      }

      toast.success("Store data uploaded successfully");
    } catch (error) {
      console.error("Error uploading store data:", error);
      toast.error("Error uploading store data");
    }
  };

  const getStore = async () => {
    if (currentUser) {
      setIsGetLoading(true);
      await fetch(`${API_URL}/api/store/${currentUser?.uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsGetLoading(false);
          setIsFormFilled(true);
          setStore(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsGetLoading(false);
        });
    }
  };

  const updateStore = async (storeFormData: FormData) => {
    setIsLoading(true);
    await fetch(`${API_URL}/api/store/${currentUser?.uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        toast.success("Store data updated successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
        toast.error("Error updating store data");
      });
  };

  const handleSubmit = async (storeFormData: FormData) => {
    if (isFormFilled) {
      await updateStore(storeFormData);
    } else {
      await onSaveStore(storeFormData);
    }
  };

  const { orders } = useGetMyStoreOrders();

  useEffect(() => {
    getStore();
  }, [currentUser]);
  // ...

  if (isGetLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-store">Manage Store</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent
        value="manage-store"
        className="space-y-5 bg-gray-50 pg-10 rounded-lg"
      >
        <ManageStoreForm
          onSave={handleSubmit}
          store={store}
          setIsFormFilled={setIsFormFilled}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageStorePage;
