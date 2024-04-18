
import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, 'required'),
  addressLine1: z.string().min(1, 'required'),
  city: z.string().min(1, 'required'),
  country: z.string().min(1, 'required'),
})

type UserFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (userProfileData: UserFormData) => void
  isLoading: boolean,
  user: UserFormData
}

const UserProfileForm = ({ onSave, isLoading, user }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: user
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className='space-y-4 bg-gray-50 rounded-lg md:p-10'
      >
        <div>
          <h2 className="text-2xl font-bold">
            Usere Profile Form
            <FormDescription>
              View and edit your user profile
            </FormDescription>
          </h2>
        </div>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Email' className='bg-white' disabled />
            </FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Name' className='bg-white' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField control={form.control} name="addressLine1" render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Address Line</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Address' className='bg-white' />
              </FormControl>
              <FormMessage />

            </FormItem>
          )} />
          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} placeholder='City' className='bg-white' />
              </FormControl>
              <FormMessage />

            </FormItem>
          )} />
          <FormField control={form.control} name="country" render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Country' className='bg-white' />
              </FormControl>
              <FormMessage />

            </FormItem>
          )} />
        </div>

        {isLoading ?
          (<LoadingButton />)
          :
          <Button type="submit" className='bg-beep-100'>Submit</Button>
        }

      </form>
    </Form>
  )
}



export default UserProfileForm