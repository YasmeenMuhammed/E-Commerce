import * as z from 'zod'

export const registerSchema = z.object({
    name : z.string().nonempty('Name is Required').min(3, 'Name must be at least 3 characters').max(15,'Name must be maximum 3 characters '),
    email: z.email({error:'Email is Required'}),
    password: z.string().nonempty('Password is Required').regex(/^[A-Za-z0-9]{6,}$/ , "Password Must be at least 6 chars"),
    rePassword: z.string().nonempty('Repassword is Required'),
    phone: z.string().nonempty('Phone is Required').regex(/^01[0125][0-9]{8}$/ , "Phone number must be Egyption number"),
}
).refine((object)=> object.password == object.rePassword , 
    {
path:['rePassword'],
error:'Repassword and Password must match'
})

export type registerSchemaType = z.infer<typeof registerSchema>

export const LoginSchema = z.object({
    email: z.email({error:'Email is Required'}),
    password: z.string().nonempty('Password is Required').regex(/^[A-Za-z0-9]{6,}$/ , "Password Must be at least 6 chars"),
}
)

export type LoginSchemaType = z.infer<typeof LoginSchema>