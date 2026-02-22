
"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchemaType, LoginSchema } from '@/lib/AuthSchemas/RegisterSchema'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function Page() {

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  async function handleLogin(values: LoginSchemaType) {
    console.log(values);
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })
    if (response?.ok) {
      console.log(response);
      toast.success('Logged in Successfully')
      router.push('/')
    } else {
      console.log(response);
      
      toast.error(response?.error || 'Incorrect Email or Password');
    }


  }

  return (
    <>
      <div className="container mx-auto max-w-2xl mt-4">
        <h2 className='text-2xl font-bold'>Welcome to ShopMart ! 🛒</h2>
        <p className='text-xl font-medium'>Login to your account Now</p>
        <form onSubmit={form.handleSubmit(handleLogin)} className=' mx-auto mt-5 space-y-4'>


          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  type='email'
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Email"
                  autoComplete="off"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  type='password'
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Password"
                  autoComplete="off"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button className='w-full cursor-pointer' type='submit'>

            {form.formState.isSubmitting ? <Spinner /> : "Login"}
          </Button>
        </form>
      </div>
    </>
  )
}
