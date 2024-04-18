import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(6),
  passwordConfirmation: z.string()
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation']
})

const SignUpPage = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const { toast } = useToast();
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
    },
  })

  const createAccount = (values: z.infer<typeof formSchema>) => {
    createUserWithEmailAndPassword(auth, values.emailAddress, values.password).then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user);
      if (user) {
        await fetch('http://localhost:3000/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email
          })

        })
      }
      toast({
        title: 'Account created',
        description: 'Your account has been created',
      })
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
  };

  return (
    <div className="flex flex-col items-center justify-between p-12">
      <h1 className='text-2xl'>Sign up</h1>
      <div className='max-w-md w-full '>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createAccount)}
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
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Password confirm</FormLabel>
                  <FormControl>
                    <Input placeholder='Password confirm' type='password' {...field} className='border-beep-100' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
            <Button type='submit' className='w-full bg-beep-200'>Sign Up</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SignUpPage
