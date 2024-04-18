import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DetailsSection from './DetailsSection'
import { Separator } from '@/components/ui/separator'
import CuisinesSection from './CuisinesSection'
import MenuSection from './MenuSection'
import ImageSection from './ImageSection'
import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'

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

type FormData = z.infer<typeof formSchema>

type Props = {
  onSave: (userProfileData: FormData) => void
  isLoading: boolean,
}


function ManageStoreForm({ onSave, isLoading }: props) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }]
    }
  })

  const onsubmit = (data: FormData) => {
    //TODO: covert data to FormData
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className='space-y-8 bg-gray-50 p-10 rounded-lg'>
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
