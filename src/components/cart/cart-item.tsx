import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartProductI } from '@/interfaces/cart'
import { RemoveFromCart, UpdateCartProduct } from '@/_actions/cart.action'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { cartContext } from '@/Services/providers/cart-provider'


export default function CartItem({ product, setCartItems }: { product: CartProductI, setCartItems: (product: CartProductI[]) => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const { handleCart } = useContext(cartContext)

    async function deleteProductFromCart(id: string) {
        try {
            setIsLoading(true);
            const data = await RemoveFromCart(id);
            console.log(data);
            if (data.status == "success") {
                toast.success(data.message, { position: 'top-center' })
            }
            setCartItems(data.data.products)
        } catch (error) {
            console.log(error);
            toast.error("Error Occured", { position: 'top-center' })


        } finally {
            setIsLoading(false)
        }

    }

    async function UpdateProductCount(id: string, newCount: number) {
        try {
            setIsLoading(true);
            const response = await UpdateCartProduct(id, newCount);
            console.log(response);
            toast.success("Product Quantit Updated Successfully", { position: 'top-center' })
            setCartItems(response.data.products);
            handleCart()

        } catch (error) {
            console.log(error);
            
            toast.error("Error Occured", { position: 'top-center' })

        } finally {
            setIsLoading(false);
        }

    }





    return (
        <div>
            <div className="flex gap-4 p-4 border border-gray-200 rounded-4xl">

                {/* Image */}
                <div className="w-28 h-28 bg-gray-100 rounded-2xl overflow-hidden relative shrink-0">
                    <Image src={product.product.imageCover} alt={product.product.title} fill className="object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between mb-1">
                            <h3 className="font-bold text-lg">{product.product.title}</h3>
                            <button className="text-red-500 cursor-pointer" onClick={() => { deleteProductFromCart(product.product._id) }} >
                                {isLoading ? <Spinner className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}

                            </button>
                        </div>
                        <p className="text-sm text-gray-600">Brand: <span className="text-black">{product.product.brand.name}</span></p>
                        <p className="text-sm text-gray-600">Category: <span className="text-black">{product.product.category.name}</span></p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                        <div className="text-2xl font-bold">
                            {isLoading ? <Spinner /> : <>
                                <p className="flex flex-col">
                                    <span className='text-gray-400 text-sm'>{product.count} * {product.price}</span>
                                    <span>EGP {product.price * product.count}</span>
                                </p>

                            </>}
                        </div>


                        {/* Quantity */}
                        <div className="flex items-center gap-4 bg-gray-100 rounded-full px-5 py-2">
                            <button disabled={isLoading} onClick={() => {
                                UpdateProductCount(product.product._id, product.count - 1)
                            }} className='cursor-pointer disabled:cursor-not-allowed' >
                                <Minus className="w-4 h-4" />

                            </button>
                            <span className="font-medium w-4 text-center">
                                {isLoading ? <Spinner /> : <>
                                    {product.count}
                                </>}
                            </span>
                            <button disabled={isLoading} onClick={() => {
                                UpdateProductCount(product.product._id, product.count + 1)
                            }} className='cursor-pointer disabled:cursor-not-allowed'  >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
