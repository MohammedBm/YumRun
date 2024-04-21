import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { any, set, z } from 'zod'
import DetailsSection from './DetailsSection'
import { Separator } from '@/components/ui/separator'
import CuisinesSection from './CuisinesSection'
import MenuSection from './MenuSection'
import ImageSection from './ImageSection'
import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/Auth'
import { Store } from 'lucide-react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/firebase'
import { v4 } from 'uuid'
import { Item } from '@radix-ui/react-dropdown-menu'

const formSchema = z.object({
  storeName: z.string({
    required_error: 'Store name is required',
  }),
  city: z.string({
    required_error: 'City is required',
  }),
  country: z.string({
    required_error: 'Country is required',
  }),
  deliveryPrice: z.coerce.number({
    required_error: 'Delivery price is required',
    invalid_type_error: 'Delivery price must be a number',
  }),
  deliveryTime: z.coerce.number({
    required_error: 'Delivery time is required',
    invalid_type_error: 'Delivery time must be a number in seconds',
  }),
  cuisines: z.array(z.string()).nonempty({
    message: 'Please select at least one cuisine',
  }),
  menuItems: z.array(z.object({
    name: z.string().min(1, 'required'),
    price: z.coerce.number().min(1, 'required'),
  })),
  imageFile: z.instanceof(File, { message: 'image is required' }).optional(),
})

type StoreFormData = z.infer<typeof formSchema>

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

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

type Props = {
  store?: Store,
  onSave: (storeFormData: FormData) => void;
  isLoading: boolean,
}


function ManageStoreForm({ onSave, isLoading, store }: Props) {
  const { currentUser } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState('')
  const form = useForm<StoreFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }]
    }
  })

  useEffect(() => {
    if (!store) {
      return;
    }

    const deliveryPriceFormatted = parseInt((store.deliveryPrice / 100).toFixed(2));
    const menuItemsFormatted = store.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }))

    const updatedStore = {
      ...store,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    }


    form.reset(updatedStore)
  }, [form, store])

  const onSubmit = async (formDataJson: StoreFormData) => {
    // turn formdatajson object into FormData
    //check firebase docs if user already has a store
    const dataF = {
      storeName: '',
      city: '',
      country: '',
      deliveryPrice: '',
      deliveryTime: '',
      imageFile: '',
      user: '',
      cuisines: [],
      menuItems: [],
    };

    const imgRef = ref(storage, `/store_image/${v4()}`)
    await uploadBytes(imgRef, formDataJson.imageFile as Blob)
    const url = await getDownloadURL(imgRef)
    setImageUrl(url)

    dataF.user = currentUser.uid;
    dataF.storeName = formDataJson.storeName;
    dataF.city = formDataJson.city;
    dataF.country = formDataJson.country;
    dataF.deliveryPrice = (formDataJson.deliveryPrice * 100).toString();
    dataF.deliveryTime = formDataJson.deliveryTime.toString();
    dataF.imageFile = imageUrl ? imageUrl : ' ';
    dataF.cuisines = formDataJson.cuisines as string[];
    dataF.menuItems = formDataJson.menuItems;


    onSave(dataF)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded-lg'>
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  )
}


export default ManageStoreForm
