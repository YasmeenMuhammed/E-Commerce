
"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, registerSchemaType } from '@/lib/AuthSchemas/RegisterSchema'
import { signUpUser } from '@/Services/auth.services'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Page() {

  const router = useRouter();

  const form = useForm({
    resolver:zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }
  });

  async function handleRegister(values:registerSchemaType){
    console.log(values);
    const response = await signUpUser(values);
    console.log(response);
    if(response.message === "success"){
      toast.success('Registered Successfully')
      router.push('/login')
    }
    else{
      toast.error(response.message);
    }
    
    
  }

  return (
    <>
      <div className="container mx-auto max-w-2xl mt-4">
        <h2 className='text-2xl font-bold'>Welcome to ShopMart ! 🛒</h2>
        <p className='text-xl font-medium'>Register your account Now</p>
        <form onSubmit={form.handleSubmit(handleRegister)} className=' mx-auto mt-5 space-y-4'>

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Name"
                  autoComplete="off"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
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
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>RePassword</FieldLabel>
                <Input
                  {...field}
                  type='password'
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="ReEnter Your Password"
                  autoComplete="off"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                <Input
                  {...field}
                  type='number'
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="ReEnter Your Phone Number"
                  autoComplete="off"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Button className='w-full cursor-pointer' type='submit'>
  
            {form.formState.isSubmitting ? <Spinner/> : "Register"}
          </Button>
        </form>



      </div>
    </>
  )
}
