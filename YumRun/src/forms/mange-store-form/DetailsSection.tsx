import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const DetailsSection = () => {
  const { control } = useFormContext()
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Details</h2>
        <FormDescription>
          Enter the details of your store
        </FormDescription>
      </div>

      <FormField control={control} name="storeName" render={({ field }) => (
        <FormItem>
          <FormLabel>Store Name</FormLabel>
          <FormControl>
            <Input {...field} placeholder='Store Name' className='bg-white' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <div className="flex gap-4">
        <FormField control={control} name="city" render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input {...field} placeholder='City' className='bg-white' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="country" render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Country' className='bg-white' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <FormField control={control} name="deliveryPrice" render={({ field }) => (
        <FormItem className="max-w-[25%]">
          <FormLabel>Delivery Price</FormLabel>
          <FormControl>
            <Input {...field} placeholder='30' className='bg-white' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={control} name="deliveryTime" render={({ field }) => (
        <FormItem className="max-w-[25%]">
          <FormLabel>Estimated Delivery Time</FormLabel>
          <FormControl>
            <Input {...field} placeholder='1.5' className='bg-white' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

    </div>
  )
}

export default DetailsSection