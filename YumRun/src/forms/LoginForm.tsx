import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(6),
})

const LoginForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    signInWithEmailAndPassword(auth, values.emailAddress, values.password).then((userCredential) => {
      const user = userCredential.user
      toast({
        title: 'Logged in',
        description: 'You have been logged in',
      })
    }
    ).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
  };

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h1 className='text-2xl'>Log in</h1>
      <div className='max-w-md w-full '>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder='email address' {...field} className='border-beep-100' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Password' type='password' {...field} className='border-beep-100' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
            <Button type='submit' className='w-full bg-beep-200'>Log In</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
