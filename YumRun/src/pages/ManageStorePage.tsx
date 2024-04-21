import { AuthContext } from '@/context/Auth';
import ManageStoreForm from '@/forms/mange-store-form/ManageStoreForm'
import React, { useContext, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { toast } from 'sonner';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { connectStorageEmulator } from 'firebase/storage';

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Store = {
  _id: string;
  user: string;
  storeName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  deliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};


const ManageStorePage = () => {
  const { currentUser } = useContext(AuthContext);
  // import toast
  const [isLoading, setIsLoading] = useState(false);
  const [store, setStore] = useState(null)
  const [isGetLoading, setisGetLoading] = useState(false)
  const onSaveStore = async (storeFormData: FormData) => {
    // Query the 'stores' collection to find a store with the user's ID
    const storeRef = collection(db, 'stores');
    const q = query(storeRef, where('user', '==', currentUser.uid));

    try {
      const querySnapshot = await getDocs(q);

      // Check if a store already exists for the current user
      if (!querySnapshot.empty) {
        toast.error('Store already exists');
        return;
      }

      // If store doesn't exist, send a POST request to your API endpoint
      const response = await fetch('http://localhost:3000/api/store/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeFormData)
      });

      if (!response.ok) {
        throw new Error('Failed to save store data');
      }

      toast.success('Store data uploaded successfully');
    } catch (error) {
      console.error('Error uploading store data:', error);
      toast.error('Error uploading store data');
    }
  }

  const getStore = async () => {
    if (currentUser) {
      setisGetLoading(true)
      await fetch(`http://localhost:3000/api/store/${currentUser?.uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
        .then((data) => {
          setisGetLoading(false)
          setStore(data)

        })
        .catch((error) => {
          console.error('Error:', error)
          setisGetLoading(false)
        })
    }
  }
  useEffect(() => {
    getStore();

  }, []);

  if (isGetLoading) return <div>Loading...</div>
  return (
    <ManageStoreForm
      onSave={onSaveStore}
      store={store}
      isLoading={isLoading}
    />
  )
}

export default ManageStorePage