"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { Spinner } from "../ui/spinner"
import { CheckOutUser } from "@/_actions/cart.action"

export function CheckOut({cartId}:{cartId:string}) {
  const form = useForm({
    defaultValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: ""
      }
    }
  });
  async function handleCheckout(values: unknown) {
    const response = await CheckOutUser(values , cartId);
    console.log(response);
    if(response.status == "success"){
      window.location.href = response.session.url
    }
    
    console.log(values);

  }

 return (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="w-full h-14 bg-black hover:bg-gray-800 rounded-full text-base group">
        Go to Checkout
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-sm">
      <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-4">

        <DialogHeader>
          <DialogTitle>Check Out</DialogTitle>
          <DialogDescription>
            Complete the following information to proceed
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>


          <Controller
            name="shippingAddress.details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Details</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  id={field.name}
                  placeholder="Enter Your Address"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />


          <Controller
            name="shippingAddress.city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <Input
                  {...field}
                  type="text"  
                  id={field.name}
                  placeholder="Enter Your City"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* الهاتف */}
          <Controller
            name="shippingAddress.phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <Input
                  {...field}
                  type="tel"
                  id={field.name}
                  placeholder="Enter Your Phone"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

        </FieldGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button type="submit">
            {form.formState.isSubmitting ? <Spinner /> : "Check Out"}
          </Button>
        </DialogFooter>

      </form>
    </DialogContent>
  </Dialog>
);
}
