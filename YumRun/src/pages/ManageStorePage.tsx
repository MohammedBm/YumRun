import { AuthContext } from '@/context/Auth';
import ManageStoreForm from '@/forms/mange-store-form/ManageStoreForm'
import React, { useContext, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { toast } from 'sonner';

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

  const onSaveStore = async (storeFormData: FormData) => {
    if ((currentUser)) {
      setIsLoading(false);
      await fetch(`http://localhost:3000/api/store/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeFormData)
      }).then(() => {
        setIsLoading(false);
        toast.success('User updated');
      }).catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
        toast.error('Error updating user');
      });
    } else {
      setIsLoading(false);
      toast.error('Error updating user');
    }

  }

  return (
    <ManageStoreForm
      onSave={onSaveStore}
      isLoading={isLoading}
    />
  )
}

export default ManageStorePage