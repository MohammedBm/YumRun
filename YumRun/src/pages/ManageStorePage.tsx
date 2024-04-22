import { AuthContext } from '@/context/Auth';
import ManageStoreForm from '@/forms/mange-store-form/ManageStoreForm'
import React, { useContext, useEffect, useState } from 'react'
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
  imageFile: string;
  lastUpdated: string;
};

type Props = {
  store: Store | null,
  onSave: (storeFormData: FormData) => void;
  isLoading: boolean,
}


const ManageStorePage = () => {
  const { currentUser } = useContext(AuthContext);
  // import toast
  const [isLoading, setIsLoading] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const [isGetLoading, setIsGetLoading] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

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
      setIsGetLoading(true)
      await fetch(`http://localhost:3000/api/store/${currentUser?.uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
        .then((data) => {
          setIsGetLoading(false)
          setIsFormFilled(true)
          setStore(data)
        })
        .catch((error) => {
          console.error('Error:', error)
          setIsGetLoading(false)

        })
    }
  }

  const updateStore = async (storeFormData: FormData) => {
    setIsLoading(true)
    await fetch(`http://localhost:3000/api/store/${currentUser?.uid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(storeFormData)
    }).then((response) => response.json())
      .then((data) => {
        setIsLoading(false)
        toast.success('Store data updated successfully')
      })
      .catch((error) => {
        console.error('Error:', error)
        setIsLoading(false)
        toast.error('Error updating store data')
      })
  }

  const handleSubmit = async (storeFormData: FormData) => {
    if (isFormFilled) {
      await updateStore(storeFormData);
    } else {
      await onSaveStore(storeFormData);
    }
  };

  useEffect(() => {
    getStore()
  }, [currentUser])
  // ...

  if (isGetLoading) {
    return <div>Loading...</div>
  }
  return (
    <ManageStoreForm
      onSave={handleSubmit}
      store={store}
      setIsFormFilled={setIsFormFilled}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
    />
  )
}

export default ManageStorePage