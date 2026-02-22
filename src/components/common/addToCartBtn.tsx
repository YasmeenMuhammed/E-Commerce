"use client"

import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { addToCart } from '@/_actions/cart.action'
import { Spinner } from '../ui/spinner'
import { toast } from 'sonner'
import { cartContext } from '@/Services/providers/cart-provider'
import { redirect } from 'next/navigation'


export default function AddToCartBtn({ prodId }: { prodId: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const {handleCart}= useContext(cartContext)

    async function addProductToCart(prodId: string) {
        try {
            setIsLoading(true)
            const response = await addToCart(prodId);
            console.log(response);
            if(response.status =="success"){
                toast.success(response.message , {position:'top-center'} )
            }

handleCart()
        } catch (error) {
                toast.error((error as Error).message , {position:'top-center'} )
redirect('/login');
        } finally {
            setIsLoading(false)
        }


    }

    return (
        <>
            <Button disabled={isLoading} className="grow cursor-pointer" onClick={() => {
                addProductToCart(prodId)
            }}>
                {isLoading ? <> <Spinner />
                </> : <>
                    <ShoppingCart /> Add To Cart
                </>}
            </Button>
        </>
    )
}
