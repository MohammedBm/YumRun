import { AuthContext } from '@/context/Auth'
import UserProfileForm from '@/forms/profile-forms/UserProfileForm'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

type userType = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const UserProfilePage = () => {
  //update user using api

  const { currentUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isGetLoading, setisGetLoading] = useState(false)
  const [UserData, setUserData] = useState(null)

  const handleSave = async (UpdateMyUserRequest: userType) => {
    // console.log(UpdateMyUserRequest)
    if (currentUser) {
      setIsLoading(true)
      await fetch(`http://localhost:3000/api/user/${currentUser?.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(UpdateMyUserRequest)
      }).then(() => {
        setIsLoading(false)
        toast.success('User updated')
      }).catch((error) => {
        console.error('Error:', error)
        setIsLoading(false)
        toast.error('Error updating user')
      })
    }
  }
  //fetch user data once
  const getUserData = async () => {
    if (currentUser) {
      setisGetLoading(true)
      await fetch(`http://localhost:3000/api/user/${currentUser?.uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
        .then((data) => {
          setisGetLoading(false)
          setUserData(data)
        })
        .catch((error) => {
          console.error('Error:', error)
          setisGetLoading(false)
        })
    }
  }

  useEffect(() => {
    getUserData();

  }, []);


  if (isGetLoading) return <div>Loading...</div>
  return (
    <UserProfileForm
      onSave={handleSave}
      user={UserData}
      isLoading={isGetLoading}
    />
  )
}
